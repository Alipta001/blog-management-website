const Joi = require("joi");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required()
    .messages({
      "string.empty": "Blog title is required",
      "string.min": "Title must contain at least 5 characters",
      "string.max": "Title cannot exceed 200 characters",
      "any.required": "Blog title is required",
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.empty": "Blog description is required",
      "string.min": "Description must contain at least 10 characters",
      "string.max": "Description cannot exceed 500 characters",
      "any.required": "Blog description is required",
    }),

  content: Joi.string()
    .trim()
    .min(20)
    .required()
    .messages({
      "string.empty": "Blog content is required",
      "string.min": "Blog content must contain at least 20 characters",
      "any.required": "Blog content is required",
    }),

  category: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid category ID",
      "string.length": "Invalid category ID",
      "any.required": "Category is required",
    }),

  tags: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .messages({
          "string.hex": "Invalid tag ID",
          "string.length": "Invalid tag ID",
        })
    )
    .unique()
    .max(10)
    .default([]),

  status: Joi.string()
    .valid("draft", "pending")
    .default("draft"),
});


const updateBlogSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(200),

  description: Joi.string()
    .trim()
    .min(10)
    .max(500),

  content: Joi.string()
    .trim()
    .min(20),

  category: Joi.string()
    .hex()
    .length(24),

  tags: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
    )
    .unique()
    .max(10),

  status: Joi.string()
    .valid("draft", "pending"),
});


const blogIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid blog ID",
      "string.length": "Invalid blog ID",
      "any.required": "Blog ID is required",
    }),
});


module.exports = {
  createBlogSchema,
  updateBlogSchema,
  blogIdSchema,
};