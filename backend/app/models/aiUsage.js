const mongoose = require("mongoose");

const aiUsageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      index: true,
    },

    date: {
      type: String,

      required: true,
    },

    questions: {
      type: Number,

      default: 0,

      min: 0,
    },

    summaries: {
      type: Number,

      default: 0,

      min: 0,
    },

    writingAssistant: {
      type: Number,

      default: 0,

      min: 0,
    },

    blogGeneration: {
      type: Number,

      default: 0,

      min: 0,
    },
  },

  {
    timestamps: true,

    versionKey: false,
  }
);

// One usage document per user per day
aiUsageSchema.index(
  {
    user: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "AiUsage",
  aiUsageSchema
);