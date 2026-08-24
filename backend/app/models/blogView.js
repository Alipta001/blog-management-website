const mongoose = require("mongoose");

const blogViewSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Blog",

      required: true,

      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,

      index: true,
    },

    viewedAt: {
      type: Date,

      default: Date.now,

      index: true,
    },
  },
  {
    versionKey: false,
  },
);


 
// INDEX FOR ANALYTICS
 

blogViewSchema.index({
  blog: 1,
  viewedAt: -1,
});


module.exports = mongoose.model(
  "BlogView",
  blogViewSchema,
);