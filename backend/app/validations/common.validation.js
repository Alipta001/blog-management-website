const Joi = require("joi");

const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});


const objectIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid ID",
      "string.length": "Invalid ID",
      "any.required": "ID is required",
    }),
});


module.exports = {
  paginationSchema,
  objectIdSchema,
};