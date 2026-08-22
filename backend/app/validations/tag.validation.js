const Joi = require("joi");

const createTagSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Tag name is required",
      "string.min": "Tag name must contain at least 2 characters",
      "string.max": "Tag name cannot exceed 50 characters",
      "any.required": "Tag name is required",
    }),

  isActive: Joi.boolean()
    .default(true),
});


const updateTagSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50),

  isActive: Joi.boolean(),
});


const tagIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required(),
});


module.exports = {
  createTagSchema,
  updateTagSchema,
  tagIdSchema,
};