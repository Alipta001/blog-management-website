const mongoose = require("mongoose");

const blogImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: [true, "Blog title is required"],

      trim: true,

      minlength: [
        5,
        "Title must contain at least 5 characters",
      ],

      maxlength: [
        200,
        "Title cannot exceed 200 characters",
      ],
    },

    slug: {
      type: String,

      required: [true, "Slug is required"],

      unique: true,

      lowercase: true,

      trim: true,

      index: true,
    },

    description: {
      type: String,

      required: [true, "Blog description is required"],

      trim: true,

      maxlength: [
        500,
        "Description cannot exceed 500 characters",
      ],
    },

    /*
     * Blog content is stored as HTML.
     *
     * Example:
     *
     * <p>This is my introduction.</p>
     *
     * <img src="https://res.cloudinary.com/..." />
     *
     * <p>More content...</p>
     */
    content: {
      type: String,

      required: [true, "Blog content is required"],
    },

    /*
     * ONE featured image
     */
    featuredImage: {
      type: blogImageSchema,

      default: null,
    },

    /*
     * MULTIPLE images used inside blog content
     */
    contentImages: {
      type: [blogImageSchema],

      default: [],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: [true, "Author is required"],

      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",

      required: [true, "Category is required"],

      index: true,
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Tag",
      },
    ],

    status: {
      type: String,

      enum: {
        values: [
          "draft",
          "pending",
          "published",
          "rejected",
          "unpublished",
        ],

        message: "Invalid blog status",
      },

      default: "draft",

      index: true,
    },

    rejectionReason: {
      type: String,

      trim: true,

      maxlength: [
        500,
        "Rejection reason cannot exceed 500 characters",
      ],

      default: null,
    },

    views: {
      type: Number,

      default: 0,

      min: 0,
    },

    publishedAt: {
      type: Date,

      default: null,
    },

    isDeleted: {
      type: Boolean,

      default: false,

      index: true,
    },

    deletedAt: {
      type: Date,

      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,
    },
  },

  {
    timestamps: true,

    versionKey: false,
  }
);

blogSchema.index({
  title: "text",
  description: "text",
  content: "text",
});

module.exports = mongoose.model(
  "Blog",
  blogSchema
);