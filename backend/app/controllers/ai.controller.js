const mongoose = require("mongoose");

const Blog = require("../models/blog");
const AiUsage = require("../models/aiUsage");
const ai = require("../utils/aiClient");

// ======================================================
// DAILY AI LIMITS
// ======================================================

const AI_LIMITS = {
  questions: 100,
  summaries: 30,
  generations: 30,
};

// ======================================================
// GET TODAY
// ======================================================

const getToday = () => {
  return new Date().toISOString().slice(0, 10);
};

// ======================================================
// CLEAN BLOG HTML
// ======================================================

const cleanBlogContent = (content = "") => {
  return content
    // Remove script and style blocks
    .replace(
      /<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,
      " "
    )

    // Add spacing around block elements
    .replace(
      /<\/?(p|div|h1|h2|h3|h4|h5|h6|li|blockquote|pre|br)[^>]*>/gi,
      " "
    )

    // Remove remaining HTML tags
    .replace(/<[^>]*>/g, " ")

    // Decode common HTML entities
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")

    // Remove excessive whitespace
    .replace(/\s+/g, " ")
    .trim();
};

// ======================================================
// CHECK IF RESPONSE ENDS PROPERLY
// ======================================================

const hasCompleteEnding = (text = "") => {
  const cleaned = text.trim();

  if (!cleaned) {
    return false;
  }

  /*
   * Accept:
   * .
   * !
   * ?
   * "
   * '
   * )
   * ]
   * }
   *
   * This is intentionally not overly strict because
   * Markdown summaries can end with bullets/headings.
   */

  return /[.!?)"'\]}]$/.test(cleaned);
};

// ======================================================
// CHECK GEMINI FINISH REASON
// ======================================================

const getFinishReason = (response) => {
  return response?.candidates?.[0]?.finishReason || null;
};

// ======================================================
// GET TODAY'S USAGE
// ======================================================

const getTodayUsage = async (userId) => {
  const today = getToday();

  let usage = await AiUsage.findOne({
    user: userId,
    date: today,
  });

  if (usage) {
    return usage;
  }

  try {
    usage = await AiUsage.create({
      user: userId,
      date: today,
      questions: 0,
      summaries: 0,
      generations: 0,
    });

    return usage;
  } catch (error) {
    // Handle concurrent creation
    if (error.code === 11000) {
      return AiUsage.findOne({
        user: userId,
        date: today,
      });
    }

    throw error;
  }
};

// ======================================================
// ATOMICALLY RESERVE AI USAGE
// ======================================================

const incrementUsage = async (userId, type) => {
  const today = getToday();
  const limit = AI_LIMITS[type];

  // Try to increment an existing document
  const updatedUsage = await AiUsage.findOneAndUpdate(
    {
      user: userId,
      date: today,
      [type]: {
        $lt: limit,
      },
    },
    {
      $inc: {
        [type]: 1,
      },
    },
    {
      new: true,
    }
  );

  if (updatedUsage) {
    return updatedUsage;
  }

  // Document may not exist yet
  try {
    const createdUsage = await AiUsage.create({
      user: userId,
      date: today,

      questions:
        type === "questions" ? 1 : 0,

      summaries:
        type === "summaries" ? 1 : 0,

      generations:
        type === "generations" ? 1 : 0,
    });

    return createdUsage;
  } catch (error) {
    // Another request created today's document
    if (error.code === 11000) {
      return AiUsage.findOneAndUpdate(
        {
          user: userId,
          date: today,
          [type]: {
            $lt: limit,
          },
        },
        {
          $inc: {
            [type]: 1,
          },
        },
        {
          new: true,
        }
      );
    }

    throw error;
  }
};

// ======================================================
// RELEASE RESERVED USAGE
// ======================================================

const decrementUsage = async (userId, type) => {
  const today = getToday();

  return AiUsage.findOneAndUpdate(
    {
      user: userId,
      date: today,
      [type]: {
        $gt: 0,
      },
    },
    {
      $inc: {
        [type]: -1,
      },
    },
    {
      new: true,
    }
  );
};

// ======================================================
// AI CONTROLLER
// ======================================================

class AIController {

  // ====================================================
  // ASK QUESTION ABOUT BLOG
  // ====================================================

  async askAboutBlog(req, res, next) {
    let usageReserved = false;

    try {
      const {
        blogId,
        question,
      } = req.body;

      // ----------------------------------------------
      // AUTHENTICATION
      // ----------------------------------------------

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Please login to use AI",
        });
      }

      // ----------------------------------------------
      // VALIDATE BLOG ID
      // ----------------------------------------------

      if (
        !blogId ||
        !mongoose.Types.ObjectId.isValid(blogId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Valid blog ID is required",
        });
      }

      // ----------------------------------------------
      // VALIDATE QUESTION
      // ----------------------------------------------

      if (
        typeof question !== "string" ||
        !question.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Question is required",
        });
      }

      const cleanQuestion = question.trim();

      if (cleanQuestion.length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Question cannot exceed 500 characters",
        });
      }

      // ----------------------------------------------
      // GET BLOG
      // ----------------------------------------------

      const blog = await Blog.findOne({
        _id: blogId,
        status: "published",
        isDeleted: false,
      }).select(
        "title description content"
      );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      // ----------------------------------------------
      // RESERVE AI REQUEST
      // ----------------------------------------------

      const usage = await incrementUsage(
        req.user._id,
        "questions"
      );

      if (!usage) {
        const currentUsage =
          await getTodayUsage(req.user._id);

        return res.status(429).json({
          success: false,
          message:
            `Daily AI question limit reached. You can ask up to ${AI_LIMITS.questions} questions per day.`,

          data: {
            used: currentUsage.questions,
            limit: AI_LIMITS.questions,
            remaining: 0,
          },
        });
      }

      usageReserved = true;

      // ----------------------------------------------
      // CLEAN BLOG
      // ----------------------------------------------

      const cleanContent =
        cleanBlogContent(blog.content);

      // ----------------------------------------------
      // GEMINI
      // ----------------------------------------------

      const response =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",

          contents: `
BLOG TITLE:

${blog.title}

BLOG DESCRIPTION:

${blog.description}

BLOG CONTENT:

${cleanContent}

USER QUESTION:

${cleanQuestion}
          `,

          config: {
            systemInstruction: `
You are an AI assistant for a blog website.

Your job is to answer questions about the
provided blog article.

STRICT RULES:

1. Use ONLY the provided blog content.
2. Do not use outside knowledge.
3. Do not invent information.
4. If the answer is not available in the article,
   say exactly:

"This information is not mentioned in the article."

5. Keep answers clear and easy to understand.
6. Answer directly.
7. Do not discuss unrelated information.
8. Give a complete answer.
9. Always finish the answer with a complete sentence.
10. Never stop in the middle of a sentence.
            `,

            temperature: 0.3,

            maxOutputTokens: 1000,
          },
        });

      const answer =
        response.text?.trim();

      if (!answer) {
        throw new Error(
          "AI could not generate a response"
        );
      }

      // ----------------------------------------------
      // SUCCESS
      // ----------------------------------------------

      usageReserved = false;

      return res.status(200).json({
        success: true,

        message:
          "AI response generated successfully",

        data: {
          answer,

          usage: {
            used: usage.questions,

            limit:
              AI_LIMITS.questions,

            remaining:
              Math.max(
                0,
                AI_LIMITS.questions -
                  usage.questions
              ),
          },
        },
      });

    } catch (error) {

      // ----------------------------------------------
      // ROLLBACK USAGE
      // ----------------------------------------------

      if (
        usageReserved &&
        req.user?._id
      ) {
        try {
          await decrementUsage(
            req.user._id,
            "questions"
          );
        } catch (usageError) {
          console.error(
            "Failed to rollback question usage:",
            usageError
          );
        }
      }

      console.error(
        "Gemini Ask Blog Error:",
        error
      );

      next(error);
    }
  }

  // ====================================================
  // SUMMARIZE BLOG
  // ====================================================

  async summarizeBlog(req, res, next) {
    let usageReserved = false;

    try {
      const {
        blogId,
      } = req.body;

      // ----------------------------------------------
      // AUTHENTICATION
      // ----------------------------------------------

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Please login to use AI",
        });
      }

      // ----------------------------------------------
      // VALIDATE BLOG ID
      // ----------------------------------------------

      if (
        !blogId ||
        !mongoose.Types.ObjectId.isValid(blogId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Valid blog ID is required",
        });
      }

      // ----------------------------------------------
      // GET BLOG
      // ----------------------------------------------

      const blog = await Blog.findOne({
        _id: blogId,
        status: "published",
        isDeleted: false,
      }).select(
        "title description content aiSummary aiSummaryGeneratedAt"
      );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      // =================================================
      // RETURN CACHED SUMMARY
      // =================================================

      /*
       * IMPORTANT:
       *
       * If a summary already exists,
       * Gemini is NOT called again.
       *
       * Therefore this request does NOT consume
       * the user's daily summary limit.
       */

      if (
        blog.aiSummary &&
        blog.aiSummary.trim()
      ) {
        return res.status(200).json({
          success: true,

          message:
            "Blog summary retrieved successfully",

          data: {
            summary: blog.aiSummary,

            cached: true,

            generatedAt:
              blog.aiSummaryGeneratedAt,
          },
        });
      }

      // ----------------------------------------------
      // RESERVE SUMMARY REQUEST
      // ----------------------------------------------

      const usage = await incrementUsage(
        req.user._id,
        "summaries"
      );

      if (!usage) {
        const currentUsage =
          await getTodayUsage(req.user._id);

        return res.status(429).json({
          success: false,

          message:
            `Daily AI summary limit reached. You can summarize up to ${AI_LIMITS.summaries} blogs per day.`,

          data: {
            used:
              currentUsage.summaries,

            limit:
              AI_LIMITS.summaries,

            remaining: 0,
          },
        });
      }

      usageReserved = true;

      // ----------------------------------------------
      // CLEAN CONTENT
      // ----------------------------------------------

      const cleanContent =
        cleanBlogContent(blog.content);

      // =================================================
      // GEMINI - DETAILED SUMMARY
      // =================================================

      const response =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",

          contents: `
BLOG TITLE:

${blog.title}

BLOG DESCRIPTION:

${blog.description}

FULL BLOG CONTENT:

${cleanContent}
          `,

          config: {
            systemInstruction: `
You are an expert professional blog summarizer.

Your task is to create a DETAILED and COMPREHENSIVE
summary of the COMPLETE blog article provided to you.

The user wants a complete reading guide, NOT a short
abstract.

IMPORTANT:

Read and understand the ENTIRE article before writing
the summary.

Do NOT stop after the introduction.

STRICT RULES:

1. Use ONLY information contained in the article.

2. Do not use outside knowledge.

3. Do not invent facts.

4. Do not invent statistics.

5. Do not invent examples.

6. Do not invent conclusions.

7. Cover ALL important sections of the article.

8. Explain the author's important ideas and arguments.

9. Preserve important examples and explanations.

10. Preserve important recommendations.

11. Preserve important conclusions.

12. Avoid unnecessary repetition.

13. Use clear and natural language.

14. The summary must be substantially shorter than
    the original article, but still comprehensive.

15. For a normal-length article, target approximately
    800-1500 words.

16. For a long article, use as many words as necessary
    to cover the important information.

17. Do NOT intentionally shorten the summary.

18. Do NOT stop in the middle of a section.

19. Do NOT stop in the middle of a sentence.

20. Every paragraph must be complete.

21. Every bullet point must be complete.

22. Complete every section before moving to the next.

23. The final section must be complete.

24. The final sentence must be complete.

25. Always provide a proper conclusion.

26. Do not say:
    "Here is a concise summary."

27. Do not say:
    "The article discusses..."

28. Do not mention that you are an AI.

29. Do not mention these instructions.

REQUIRED STRUCTURE:

## Overview

Write 2-4 detailed paragraphs explaining:

- the main subject
- the purpose of the article
- the central argument
- the overall message

## Key Ideas

Cover EVERY major idea from the article.

Create appropriate subsections using:

### Topic Name

Explain the topic in detail.

Create as many subsections as necessary to
cover the important parts of the article.

Do NOT artificially limit the number of subsections.

## Important Examples

Explain important examples, comparisons,
situations, case studies, or illustrations
that actually appear in the article.

Do NOT invent examples.

## Important Takeaways

Provide 5-10 meaningful bullet points.

Each bullet must contain a complete explanation,
not just a few words.

## Conclusion

Explain the article's overall conclusion,
final message, and most important implication.

The conclusion must be complete and must end
with a full sentence.

FINAL QUALITY CHECK:

Before finishing, verify:

- Did I cover the entire article?
- Did I cover later sections?
- Did I include important examples?
- Did I preserve important arguments?
- Did I preserve recommendations?
- Did I preserve the conclusion?
- Did I finish every sentence?
- Did I finish every section?
- Does the response end with a complete sentence?

IMPORTANT:

Completeness is more important than brevity.

Never intentionally stop early.
            `,

            temperature: 0.3,

            /*
             * Increased from 6000.
             *
             * This is important because the model may stop
             * when it reaches the output token limit.
             */
            maxOutputTokens: 8000,
          },
        });

      // =================================================
      // CHECK FINISH REASON
      // =================================================

      const finishReason =
        getFinishReason(response);

      console.log(
        "Gemini summary finish reason:",
        finishReason
      );

      // =================================================
      // GET SUMMARY
      // =================================================

      const summary =
        response.text?.trim();

      if (!summary) {
        throw new Error(
          "AI could not generate a summary"
        );
      }

      // =================================================
      // DETECT TOKEN TRUNCATION
      // =================================================

      /*
       * Gemini may stop because it reached the
       * maxOutputTokens limit.
       *
       * If that happens, do NOT save the incomplete
       * summary to MongoDB.
       */

      if (
        finishReason === "MAX_TOKENS" ||
        finishReason === "LENGTH"
      ) {
        throw new Error(
          "AI summary was truncated because the output token limit was reached"
        );
      }

      // =================================================
      // CHECK COMPLETE ENDING
      // =================================================

      if (!hasCompleteEnding(summary)) {
        throw new Error(
          "AI summary appears to be incomplete"
        );
      }

      // =================================================
      // SAVE SUMMARY
      // =================================================

      const updatedBlog =
        await Blog.findByIdAndUpdate(
          blog._id,

          {
            $set: {
              aiSummary: summary,

              aiSummaryGeneratedAt:
                new Date(),
            },
          },

          {
            new: true,
          }
        ).select(
          "aiSummary aiSummaryGeneratedAt"
        );

      if (!updatedBlog) {
        throw new Error(
          "Failed to save AI summary"
        );
      }

      // ----------------------------------------------
      // SUCCESS
      // ----------------------------------------------

      usageReserved = false;

      return res.status(200).json({
        success: true,

        message:
          "Blog summarized successfully",

        data: {
          summary:
            updatedBlog.aiSummary,

          cached: false,

          generatedAt:
            updatedBlog.aiSummaryGeneratedAt,

          usage: {
            used:
              usage.summaries,

            limit:
              AI_LIMITS.summaries,

            remaining:
              Math.max(
                0,
                AI_LIMITS.summaries -
                  usage.summaries
              ),
          },
        },
      });

    } catch (error) {

      // ----------------------------------------------
      // ROLLBACK SUMMARY USAGE
      // ----------------------------------------------

      if (
        usageReserved &&
        req.user?._id
      ) {
        try {
          await decrementUsage(
            req.user._id,
            "summaries"
          );
        } catch (usageError) {
          console.error(
            "Failed to rollback summary usage:",
            usageError
          );
        }
      }

      console.error(
        "Gemini Summarize Error:",
        error
      );

      next(error);
    }
  }

  // ====================================================
  // GENERATE BLOG FOR AUTHOR
  // ====================================================

  async generateBlog(req, res, next) {
    let usageReserved = false;

    try {
      const {
        topic,
        instructions,
      } = req.body;

      // ----------------------------------------------
      // AUTHENTICATION
      // ----------------------------------------------

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Please login to use AI",
        });
      }

      // ----------------------------------------------
      // AUTHOR / ADMIN ONLY
      // ----------------------------------------------

      if (
        req.user.role !== "author" &&
        req.user.role !== "administration"
      ) {
        return res.status(403).json({
          success: false,

          message:
            "Only authors can use AI blog generation",
        });
      }

      // ----------------------------------------------
      // VALIDATE TOPIC
      // ----------------------------------------------

      if (
        typeof topic !== "string" ||
        !topic.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Blog topic is required",
        });
      }

      const cleanTopic =
        topic.trim();

      if (cleanTopic.length > 300) {
        return res.status(400).json({
          success: false,

          message:
            "Blog topic cannot exceed 300 characters",
        });
      }

      // ----------------------------------------------
      // VALIDATE INSTRUCTIONS
      // ----------------------------------------------

      const cleanInstructions =
        typeof instructions === "string"
          ? instructions.trim()
          : "";

      if (cleanInstructions.length > 1000) {
        return res.status(400).json({
          success: false,

          message:
            "Instructions cannot exceed 1000 characters",
        });
      }

      // ----------------------------------------------
      // RESERVE GENERATION
      // ----------------------------------------------

      /*
       * IMPORTANT:
       *
       * Blog generation uses "generations".
       *
       * It does NOT consume the user's
       * "summaries" limit.
       */

      const usage =
        await incrementUsage(
          req.user._id,
          "generations"
        );

      if (!usage) {
        const currentUsage =
          await getTodayUsage(req.user._id);

        return res.status(429).json({
          success: false,

          message:
            `Daily AI generation limit reached. You can generate up to ${AI_LIMITS.generations} blogs per day.`,

          data: {
            used:
              currentUsage.generations,

            limit:
              AI_LIMITS.generations,

            remaining: 0,
          },
        });
      }

      usageReserved = true;

      // =================================================
      // GEMINI BLOG GENERATION
      // =================================================

      const response =
        await ai.models.generateContent({
          model: "gemini-3.6-flash",

          contents: `
BLOG TOPIC:

${cleanTopic}

AUTHOR INSTRUCTIONS:

${
  cleanInstructions ||
  "No additional instructions."
}
          `,

          config: {
            systemInstruction: `
You are an AI writing assistant for a professional
blog management platform.

Help the author create a high-quality original
blog article.

Generate:

1. A compelling and relevant title.
2. A short description.
3. A complete blog article.

The generated article must be complete and
publication-ready after author review.

CONTENT RULES:

- Write original content.
- Keep the article informative and engaging.
- Use clear paragraphs.
- Use <h2> for major sections.
- Use <h3> for subsections.
- Use <p> for paragraphs.
- Use <ul> or <ol> when appropriate.
- Use <strong> when useful.
- Use <blockquote> when appropriate.
- Do NOT use Markdown.
- Do NOT use CSS.
- Do NOT use JavaScript.
- Do NOT include <html>.
- Do NOT include <head>.
- Do NOT include <body>.
- Do NOT include images.
- Do NOT invent statistics.
- Do NOT create fake sources.
- Do NOT invent citations.
- Do NOT mention that AI generated the content.
- Follow the author's instructions.
- Make the article logically structured.
- Include an introduction.
- Include multiple useful sections.
- Include a conclusion.
- Do not stop in the middle of a paragraph.
- Do not leave unfinished sentences.
- The final paragraph must end with a complete sentence.

DESCRIPTION RULES:

- Maximum 500 characters.
- Clearly describe the article.
- Do not use unnecessary filler.

IMPORTANT:

The output must contain ONLY the requested
structured fields.

            `,

            temperature: 0.7,

            maxOutputTokens: 5000,

            // ----------------------------------------
            // STRUCTURED OUTPUT
            // ----------------------------------------

            responseMimeType:
              "application/json",

            responseSchema: {
              type: "object",

              properties: {
                title: {
                  type: "string",
                },

                description: {
                  type: "string",
                },

                content: {
                  type: "string",
                },
              },

              required: [
                "title",
                "description",
                "content",
              ],
            },
          },
        });

      // =================================================
      // CHECK FINISH REASON
      // =================================================

      const finishReason =
        getFinishReason(response);

      console.log(
        "Gemini generation finish reason:",
        finishReason
      );

      if (
        finishReason === "MAX_TOKENS" ||
        finishReason === "LENGTH"
      ) {
        throw new Error(
          "AI blog generation was truncated because the output token limit was reached"
        );
      }

      // =================================================
      // PARSE STRUCTURED RESPONSE
      // =================================================

      let generatedBlog;

      try {
        generatedBlog =
          JSON.parse(response.text);
      } catch (parseError) {
        console.error(
          "AI blog JSON parsing error:",
          parseError
        );

        throw new Error(
          "AI returned an invalid blog format"
        );
      }

      // =================================================
      // EXTRACT GENERATED DATA
      // =================================================

      const generatedTitle =
        generatedBlog?.title?.trim();

      const generatedDescription =
        generatedBlog?.description?.trim();

      const generatedContent =
        generatedBlog?.content?.trim();

      // ----------------------------------------------
      // VALIDATE AI OUTPUT
      // ----------------------------------------------

      if (
        !generatedTitle ||
        !generatedDescription ||
        !generatedContent
      ) {
        throw new Error(
          "AI returned incomplete blog content"
        );
      }

      // ----------------------------------------------
      // DESCRIPTION LENGTH
      // ----------------------------------------------

      if (
        generatedDescription.length > 500
      ) {
        throw new Error(
          "AI generated description exceeds 500 characters"
        );
      }

      // ----------------------------------------------
      // CONTENT COMPLETENESS
      // ----------------------------------------------

      if (
        !hasCompleteEnding(
          cleanBlogContent(
            generatedContent
          )
        )
      ) {
        throw new Error(
          "AI generated blog appears to be incomplete"
        );
      }

      // ----------------------------------------------
      // SUCCESS
      // ----------------------------------------------

      usageReserved = false;

      return res.status(200).json({
        success: true,

        message:
          "Blog generated successfully",

        data: {
          title:
            generatedTitle,

          description:
            generatedDescription,

          content:
            generatedContent,

          usage: {
            used:
              usage.generations,

            limit:
              AI_LIMITS.generations,

            remaining:
              Math.max(
                0,
                AI_LIMITS.generations -
                  usage.generations
              ),
          },
        },
      });

    } catch (error) {

      // ----------------------------------------------
      // ROLLBACK GENERATION USAGE
      // ----------------------------------------------

      if (
        usageReserved &&
        req.user?._id
      ) {
        try {
          await decrementUsage(
            req.user._id,
            "generations"
          );
        } catch (usageError) {
          console.error(
            "Failed to rollback generation usage:",
            usageError
          );
        }
      }

      console.error(
        "Gemini Generate Blog Error:",
        error
      );

      next(error);
    }
  }
}

// ======================================================
// EXPORT CONTROLLER
// ======================================================

module.exports =
  new AIController();