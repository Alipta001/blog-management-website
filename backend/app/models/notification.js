const mongoose =
  require("mongoose");


const NotificationSchema =
  new mongoose.Schema(
    {

      recipient: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },


      sender: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,
      },


      type: {
        type: String,

        enum: [
          "blog_submitted",
          "blog_published",
          "new_comment",
          "new_like",
          "author_approved",
          "author_rejected",
        ],

        required: true,

        index: true,
      },


      title: {
        type: String,

        required: true,

        trim: true,
      },


      message: {
        type: String,

        required: true,

        trim: true,
      },


      blog: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Blog",

        default: null,
      },


      comment: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Comment",

        default: null,
      },


      isRead: {
        type: Boolean,

        default: false,

        index: true,
      },


      readAt: {
        type: Date,

        default: null,
      },

    },

    {
      timestamps: true,

      versionKey: false,
    }
  );


// Useful for fetching notifications

NotificationSchema.index({
  recipient: 1,
  isRead: 1,
  createdAt: -1,
});


module.exports =
  mongoose.model(
    "Notification",
    NotificationSchema
  );