const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
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
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [1, "Comment cannot be empty"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "hidden"],
        message: "Invalid comment status",
      },
      default: "pending",
      index: true,
    },

    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    moderatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CommentSchema.index({
  blog: 1,
  status: 1,
  createdAt: -1,
});

CommentSchema.index({
   user: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Comment", CommentSchema);