const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

CommentLikeSchema.index({ comment: 1, user: 1 }, { unique: true });
CommentLikeSchema.index({ comment: 1, createdAt: -1 });

module.exports = mongoose.model("CommentLike", CommentLikeSchema);