const Joi = require("joi");

const update userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),

  address: Joi.string()
    .trim()
    .max(300)
    .allow(null, ""),

  role: Joi.string()
    .valid("admin", "author", "user"),

  status: Joi.string()
    .valid("active", "inactive", "blocked"),
});


const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .allow(null, ""),

  address: Joi.string()
    .trim()
    .max(300)
    .allow(null, ""),

  bio: Joi.string()
    .trim()
    .max(500)
    .allow(null, ""),
});


const  userIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid  user ID",
      "string.length": "Invalid  user ID",
      "any.required": " user ID is required",
    }),
});


module.exports = {
  update userSchema,
  updateProfileSchema,
   userIdSchema,
};