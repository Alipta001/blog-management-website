const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must contain at least 2 characters",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .allow(null, "")
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      "string.min": "Password must contain at least 8 characters",
      "string.max": "Password cannot exceed 128 characters",
      "any.required": "Password is required",
    }),

  role: Joi.string()
    .valid("author", "user")
    .default("user")
    .messages({
      "any.only": "Role must be either author or user",
    }),
});


const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});


const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      "any.required": "Current password is required",
    }),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      "string.min": "New password must contain at least 8 characters",
      "string.max": "New password cannot exceed 128 characters",
      "any.required": "New password is required",
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
});


const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
});


const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Reset token is required",
    }),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .required(),

  confirmPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
});


module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};