const Joi = require("joi");

const notificationIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid notification ID",
      "string.length": "Invalid notification ID",
      "any.required": "Notification ID is required",
    }),
});


const notificationQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

  isRead: Joi.boolean()
    .optional(),
});


module.exports = {
  notificationIdSchema,
  notificationQuerySchema,
};