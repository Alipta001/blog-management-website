const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: " user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

LikeSchema.index(
  {
    blog: 1,
     user: 1,
  },
  {
    unique: true,
  }
);

LikeSchema.index({
  blog: 1,
  createdAt: -1,
});

LikeSchema.index({
   user: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Like", LikeSchema);