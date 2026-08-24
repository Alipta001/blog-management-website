const Like = require("../models/like");
const Blog = require("../models/blog");


class LikeController {

   
  // LIKE BLOG
   

  async likeBlog(req, res, next) {
    try {
      const { blogId } = req.params;

      // Check whether blog exists
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

      // Check if  user already liked the blog
      const existingLike =
        await Like.findOne({
          blog: blogId,
           user: req. user.id,
        });

      if (existingLike) {
        return res.status(409).json({
          success: false,
          message:
            "You have already liked this blog",
        });
      }

      // Create like
      await Like.create({
        blog: blogId,
         user: req. user.id,
      });

      // Count total likes
      const totalLikes =
        await Like.countDocuments({
          blog: blogId,
        });

      return res.status(201).json({
        success: true,
        message: "Blog liked successfully",
        data: {
          totalLikes,
          isLiked: true,
        },
      });

    } catch (error) {
      next(error);
    }
  }


   
  // UNLIKE BLOG
   

  async unlikeBlog(req, res, next) {
    try {
      const { blogId } = req.params;

      // Find and delete  user's like
      const like =
        await Like.findOneAndDelete({
          blog: blogId,
           user: req. user.id,
        });

      if (!like) {
        return res.status(404).json({
          success: false,
          message: "Like not found",
        });
      }

      // Count remaining likes
      const totalLikes =
        await Like.countDocuments({
          blog: blogId,
        });

      return res.status(200).json({
        success: true,
        message:
          "Blog unliked successfully",
        data: {
          totalLikes,
          isLiked: false,
        },
      });

    } catch (error) {
      next(error);
    }
  }


   
  // GET BLOG LIKE COUNT
  // PUBLIC
   

  async getBlogLikes(req, res, next) {
    try {
      const { blogId } = req.params;

      const totalLikes =
        await Like.countDocuments({
          blog: blogId,
        });

      return res.status(200).json({
        success: true,
        data: {
          totalLikes,
        },
      });

    } catch (error) {
      next(error);
    }
  }


   
  // GET LIKE STATUS
  // AUTHENTICATED  user
   

  async getLikeStatus(req, res, next) {
    try {
      const { blogId } = req.params;

      // Optional but recommended:
      // Verify that the blog exists and is published

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

      // Check whether current  user
      // has liked this blog

      const existingLike =
        await Like.exists({
          blog: blogId,
           user: req. user.id,
        });

      return res.status(200).json({
        success: true,
        data: {
          isLiked: Boolean(existingLike),
        },
      });

    } catch (error) {
      next(error);
    }
  }
}


module.exports = new LikeController();