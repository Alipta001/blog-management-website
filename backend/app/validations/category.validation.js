const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category name must contain at least 2 characters",
      "string.max": "Category name cannot exceed 100 characters",
      "any.required": "Category name is required",
    }),

  description: Joi.string()
    .trim()
    .max(300)
    .allow(null, ""),

  image: Joi.string()
    .uri()
    .allow(null, ""),
});


const updateCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  description: Joi.string()
    .trim()
    .max(300)
    .allow(null, ""),

  image: Joi.string()
    .uri()
    .allow(null, ""),

  isActive: Joi.boolean(),
});


const categoryIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required(),
});


module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
};