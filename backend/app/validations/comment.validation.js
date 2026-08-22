const Joi = require("joi");

const createCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Comment cannot be empty",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 1000 characters",
      "any.required": "Comment content is required",
    }),
});


const updateCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Comment cannot be empty",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 1000 characters",
      "any.required": "Comment content is required",
    }),
});


const moderateCommentSchema = Joi.object({
  status: Joi.string()
    .valid("approved", "rejected", "hidden")
    .required()
    .messages({
      "any.only":
        "Status must be approved, rejected, or hidden",
      "any.required": "Moderation status is required",
    }),
});


const commentIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required(),
});


const blogCommentsParamsSchema = Joi.object({
  blogId: Joi.string()
    .hex()
    .length(24)
    .required(),
});


module.exports = {
  createCommentSchema,
  updateCommentSchema,
  moderateCommentSchema,
  commentIdSchema,
  blogCommentsParamsSchema,
};