const Joi = require("joi");

const blogQuerySchema = Joi.object({
  search: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  category: Joi.string()
    .hex()
    .length(24),

  author: Joi.string()
    .hex()
    .length(24),

  tag: Joi.string()
    .hex()
    .length(24),

  status: Joi.string()
    .valid(
      "draft",
      "pending",
      "published",
      "unpublished",
      "rejected"
    ),

  fromDate: Joi.date(),

  toDate: Joi.date()
    .min(Joi.ref("fromDate")),

  sort: Joi.string()
    .valid(
      "latest",
      "oldest",
      "mostViewed",
      "mostLiked",
      "mostCommented"
    )
    .default("latest"),

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


module.exports = {
  blogQuerySchema,
};