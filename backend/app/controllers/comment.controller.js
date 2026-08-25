const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/user");
const Notification = require("../models/notification");
const CommentLike = require("../models/commentLike");

 
// COMMENT CONTROLLER
 

class CommentController {
   
  // CREATE COMMENT
   

  async createComment(req, res, next) {
    try {
      const { blogId } = req.params;

      const { content, parentComment } = req.body;

       
      // CHECK BLOG

      const blog = await Blog.findOne({
        _id: blogId,

        status: "published",

        isDeleted: false,
      });

      if (!blog) {
        return res.status(404).json({
          success: false,

          message: "Blog not found",
        });
      }

      if (parentComment) {
        const parent = await Comment.findOne({
          _id: parentComment,
          blog: blogId,
          status: "approved",
        });
        if (!parent) {
          return res.status(400).json({ success: false, message: "Parent comment not found" });
        }
      }

       
      // CREATE COMMENT
      

      const comment = await Comment.create({
        blog: blogId,

        user: req.user.id,

        content,

        parentComment: parentComment || null,

        status: "pending",
      });

      const administrators = await User.find({
        role: "administration",
        status: "active",
      }).select("_id").lean();

      const recipientIds = [
        blog.author,
        ...administrators.map((administrator) => administrator._id),
      ]
        .map((recipient) => recipient.toString())
        .filter((recipient, index, recipients) =>
          recipient !== req.user.id.toString() &&
          recipients.indexOf(recipient) === index,
        );

      if (recipientIds.length > 0) {
        await Notification.insertMany(
          recipientIds.map((recipient) => ({
            recipient,
            sender: req.user.id,
            type: "new_comment",
            title: "New comment on your blog",
            message: `A reader commented on "${blog.title}".`,
            blog: blog._id,
            comment: comment._id,
          })),
        );
      }

      return res.status(201).json({
        success: true,

        message:
          "Comment sent for review. It will be published after approval.",

        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }

   
  // GET APPROVED COMMENTS
  // OF A BLOG
   

  async getBlogComments(req, res, next) {
    try {
      const {
        page = 1,

        limit = 10,
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const filter = {
        blog: req.params.blogId,

        status: "approved",
      };

      const [comments, total] = await Promise.all([
        Comment.find(filter)

          .populate("user", "name profileImage")

          .sort({
            isPinned: -1,
            createdAt: -1,
          })

          .skip(skip)

          .limit(Number(limit)),

        Comment.countDocuments(filter),
      ]);

      const commentIds = comments.map((comment) => comment._id);
      const likeCounts = await CommentLike.aggregate([
        { $match: { comment: { $in: commentIds } } },
        { $group: { _id: "$comment", count: { $sum: 1 } } },
      ]);
      const likeCountByComment = new Map(
        likeCounts.map((item) => [item._id.toString(), item.count]),
      );
      const likedCommentIds = req.user
        ? await CommentLike.find({
            comment: { $in: commentIds },
            user: req.user.id,
          }).distinct("comment")
        : [];
      const likedCommentIdSet = new Set(
        likedCommentIds.map((commentId) => commentId.toString()),
      );
      const commentsWithLikes = comments.map((comment) => ({
        ...comment.toObject(),
        likeCount: likeCountByComment.get(comment._id.toString()) || 0,
        isLiked: likedCommentIdSet.has(comment._id.toString()),
      }));

      return res.status(200).json({
        success: true,

        data: {
          comments: commentsWithLikes,

          pagination: {
            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleCommentLike(req, res, next) {
    try {
      const comment = await Comment.findOne({
        _id: req.params.id,
        status: "approved",
      });

      if (!comment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }

      const existingLike = await CommentLike.findOne({
        comment: comment._id,
        user: req.user.id,
      });

      if (existingLike) {
        await existingLike.deleteOne();
      } else {
        await CommentLike.create({ comment: comment._id, user: req.user.id });
      }

      const likeCount = await CommentLike.countDocuments({ comment: comment._id });

      return res.status(200).json({
        success: true,
        message: existingLike ? "Comment unliked successfully" : "Comment liked successfully",
        data: { likeCount, isLiked: !existingLike },
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleCommentPin(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id).populate("blog", "author");

      if (!comment || comment.status !== "approved") {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }

      if (comment.blog.author.toString() !== req.user.id.toString()) {
        return res.status(403).json({ success: false, message: "Only the blog author can pin comments" });
      }

      const isPinned = !comment.isPinned;
      if (isPinned) {
        await Comment.updateMany(
          { blog: comment.blog._id, _id: { $ne: comment._id } },
          { $set: { isPinned: false } },
        );
      }
      comment.isPinned = isPinned;
      await comment.save();

      return res.status(200).json({
        success: true,
        message: isPinned ? "Comment pinned successfully" : "Comment unpinned successfully",
        data: { isPinned },
      });
    } catch (error) {
      next(error);
    }
  }

   
  // GET COMMENTS FOR
  // CURRENT AUTHOR'S BLOGS
  //
  // GET /comment/author
   

  async getCommentsForAuthor(req, res, next) {
    try {
      const {
        page = 1,

        limit = 10,

        status,
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      
      // FIND AUTHOR'S BLOGS
       

      const blogs = await Blog.find({
        author: req.user.id,

        isDeleted: false,
      }).select("_id");

      const blogIds = blogs.map((blog) => blog._id);

       
      // IF AUTHOR HAS NO BLOGS
       

      if (blogIds.length === 0) {
        return res.status(200).json({
          success: true,

          data: {
            comments: [],

            pagination: {
              total: 0,

              page: Number(page),

              limit: Number(limit),

              totalPages: 0,
            },
          },
        });
      }

       
      // BUILD FILTER
       

      const filter = {
        blog: {
          $in: blogIds,
        },
      };

      // Optional status filtering
      if (status) {
        filter.status = status;
      }

       
      // GET COMMENTS
       

      const [comments, total] = await Promise.all([
        Comment.find(filter)

          .populate("user", "name email profileImage")

          .populate("blog", "title slug")

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(Number(limit)),

        Comment.countDocuments(filter),
      ]);

      return res.status(200).json({
        success: true,

        data: {
          comments,

          pagination: {
            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

   
  // GET ALL COMMENTS
  // ADMINISTRATION ONLY
  //
  // GET /comment/administration
   

  async getAllComments(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
      } = req.query;

      const filter = status ? { status } : {};
      const skip = (Number(page) - 1) * Number(limit);

      const [comments, total] = await Promise.all([
        Comment.find(filter)
          .populate("user", "name email profileImage")
          .populate("blog", "title slug")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Comment.countDocuments(filter),
      ]);

      return res.status(200).json({
        success: true,
        data: {
          comments,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

   
  // UPDATE OWN COMMENT
   

  async updateComment(req, res, next) {
    try {
      const comment = await Comment.findOne({
        _id: req.params.id,

        user: req.user.id,
      });

      if (!comment) {
        return res.status(404).json({
          success: false,

          message: "Comment not found or unauthorized",
        });
      }

       
      // UPDATE CONTENT
  

      comment.content = req.body.content;

      // Edited comments must be
      // moderated again.

      comment.status = "pending";

      await comment.save();

      return res.status(200).json({
        success: true,

        message: "Comment updated and sent for approval",

        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }

   
  // DELETE OWN COMMENT
   

  async deleteComment(req, res, next) {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,

        user: req.user.id,
      });

      if (!comment) {
        return res.status(404).json({
          success: false,

          message: "Comment not found or unauthorized",
        });
      }

      return res.status(200).json({
        success: true,

        message: "Comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

   
  // MODERATE COMMENT
  // ADMINISTRATION ONLY
   

  async moderateComment(req, res, next) {
    try {
      const { status } = req.body;

      const comment = await Comment.findByIdAndUpdate(
        req.params.id,

        {
          status,

          moderatedBy: req.user.id,

          moderatedAt: new Date(),
        },

        {
          new: true,

          runValidators: true,
        },
      );

      if (!comment) {
        return res.status(404).json({
          success: false,

          message: "Comment not found",
        });
      }

      return res.status(200).json({
        success: true,

        message: `Comment ${status} successfully`,

        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
