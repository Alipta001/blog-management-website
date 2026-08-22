const mongoose = require("mongoose");


const ReadingHistorySchema = new mongoose.Schema(
  {
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// =================================
// GET  user'S RECENTLY VIEWED BLOGS
// =================================
ReadingHistorySchema.index({
   user: 1,
  viewedAt: -1,
});


// =================================
// PREVENT DUPLICATE  user + BLOG
// =================================
ReadingHistorySchema.index(
  {
     user: 1,
    blog: 1,
  },
  {
    unique: true,
  }
);


module.exports = mongoose.model(
  "ReadingHistory",
  ReadingHistorySchema
);