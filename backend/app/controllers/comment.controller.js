const Comment = require("../models/comment");
const Blog = require("../models/blog");

 
// COMMENT CONTROLLER
 

class CommentController {
   
  // CREATE COMMENT
   

  async createComment(req, res, next) {
    try {
      const { blogId } = req.params;

      const { content } = req.body;

       
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

       
      // CREATE COMMENT
      

      const comment = await Comment.create({
        blog: blogId,

        user: req.user.id,

        content,

        status: "pending",
      });

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
