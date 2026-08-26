const mongoose = require("mongoose");

const Blog = require("../models/blog");

const Category = require("../models/category");

const Tag = require("../models/tag");

const User = require("../models/user");

const Notification = require("../models/notification");

const Like = require("../models/like");

const BlogView = require("../models/blogView");

const {
  uploadToCloudinary,

  deleteFromCloudinary,
} = require("../utils/cloudinaryUpload");

//                                    =====
// HELPER: PARSE TAGS
//                                    =====

const parseTags = (tags) => {
  if (!tags) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags;
  }

  try {
    const parsed = JSON.parse(tags);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

//                                    =====
// HELPER: GENERATE SLUG
//                                    =====

const generateSlug = (title) => {
  const baseSlug = title

    .toLowerCase()

    .trim()

    .replace(/[^a-z0-9\s-]/g, "")

    .replace(/\s+/g, "-")

    .replace(/-+/g, "-");

  return `${baseSlug}-${Date.now()}`;
};

//                                    =====
// HELPER: UPLOAD FEATURED IMAGE
//                                    =====

const uploadFeaturedImage = async (file) => {
  if (!file) {
    return null;
  }

  const result = await uploadToCloudinary(
    file.buffer,
    "blog-management/featured",
  );

  return {
    url: result.secure_url,

    publicId: result.public_id,

    alt: "",
  };
};

//                                    =====
// HELPER: UPLOAD CONTENT IMAGES
//                                    =====

const uploadContentImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const result = await uploadToCloudinary(
        file.buffer,
        "blog-management/content",
      );

      return {
        url: result.secure_url,

        publicId: result.public_id,

        alt: "",
      };
    }),
  );

  return uploadedImages;
};

//                                    =====
// HELPER: REPLACE IMAGE PLACEHOLDERS
//                                    =====

const replaceImagePlaceholders = (content, uploadedImages) => {
  let finalContent = content;

  uploadedImages.forEach((image, index) => {
    const placeholder = `[[BLOG_IMAGE_${index}]]`;

    const imageHTML = `
          <figure>
            <img
              src="${image.url}"
              alt="${image.alt || "Blog image"}"
              style="max-width: 100%; height: auto;"
            />
          </figure>
        `;

    finalContent = finalContent.replace(placeholder, imageHTML);
  });

  return finalContent;
};

//                                    =====
// BLOG CONTROLLER
//                                    =====

class BlogController {
        // CREATE BLOG
  // POST /blog/create
         async createBlog(req, res, next) {
    let uploadedFeaturedImage = null;

    let uploadedContentImages = [];

    try {
      const { title, description, content, category, status } = req.body;

      const tags = parseTags(req.body.tags);

          // BASIC VALIDATION
    
      if (
        !title?.trim() ||
        !description?.trim() ||
        !content?.trim() ||
        !category ||
        category === "undefined" ||
        category === "null"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Title, description, content and a valid category are required",
        });
      }

          // VALIDATE CATEGORY OBJECT ID
    
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({
          success: false,

          message: "Invalid category ID",
        });
      }

          // CATEGORY VALIDATION
    
      const existingCategory = await Category.findOne({
        _id: category,

        isActive: true,

        isDeleted: false,
      });

      if (!existingCategory) {
        return res.status(400).json({
          success: false,

          message: "Selected category does not exist or is inactive",
        });
      }

          // VALIDATE TAG IDS
    
      if (tags.length > 0) {
        const invalidTag = tags.find(
          (tagId) => !mongoose.Types.ObjectId.isValid(tagId),
        );

        if (invalidTag) {
          return res.status(400).json({
            success: false,

            message: "One or more tag IDs are invalid",
          });
        }

        const validTags = await Tag.countDocuments({
          _id: {
            $in: tags,
          },

          isActive: true,

          isDeleted: false,
        });

        if (validTags !== tags.length) {
          return res.status(400).json({
            success: false,

            message: "One or more tags are invalid or inactive",
          });
        }
      }

          // FEATURED IMAGE
    
      const featuredFile = req.files?.featuredImage?.[0];

      if (featuredFile) {
        uploadedFeaturedImage = await uploadFeaturedImage(featuredFile);
      }

          // CONTENT IMAGES
    
      const contentFiles = req.files?.contentImages || [];

      uploadedContentImages = await uploadContentImages(contentFiles);

          // REPLACE IMAGE PLACEHOLDERS
    
      const finalContent = replaceImagePlaceholders(
        content,
        uploadedContentImages,
      );

          // GENERATE SLUG
    
      const slug = generateSlug(title);

          // CREATE BLOG
    
      const blog = await Blog.create({
        title: title.trim(),

        description: description.trim(),

        content: finalContent,

        featuredImage: uploadedFeaturedImage,

        contentImages: uploadedContentImages,

        category,

        tags,

        status: status === "submitted" ? "pending" : "draft",

        slug,

        author: req.user.id,
      });

      return res.status(201).json({
        success: true,

        message: "Blog created successfully",

        data: blog,
      });
    } catch (error) {
      try {
        if (uploadedFeaturedImage?.publicId) {
          await deleteFromCloudinary(uploadedFeaturedImage.publicId);
        }

        for (const image of uploadedContentImages) {
          if (image.publicId) {
            await deleteFromCloudinary(image.publicId);
          }
        }
      } catch (cleanupError) {
        console.error("Cloudinary cleanup error:", cleanupError);
      }

      next(error);
    }
  }

        // GET ALL PUBLISHED BLOGS
  // GET /blog
         async getBlogs(req, res, next) {
    try {
      const {
        search,

        category,

        author,

        tag,

        sort = "latest",

        page = 1,

        limit = 10,
      } = req.query;

      const filter = {
        status: "published",

        isDeleted: false,
      };

          // CATEGORY
    
      if (category) {
        filter.category = category;
      }

          // AUTHOR
    
      if (author) {
        filter.author = author.includes(",")
          ? { $in: author.split(",").filter(Boolean) }
          : author;
      }

          // TAG
    
      if (tag) {
        filter.tags = tag;
      }

          // SEARCH
    
      if (search) {
        filter.$text = {
          $search: search,
        };
      }

          // SORT
    
      let sortOption = {
        createdAt: -1,
      };

      if (sort === "oldest") {
        sortOption = {
          createdAt: 1,
        };
      }

      if (sort === "mostViewed") {
        sortOption = {
          views: -1,
        };
      }

      if (sort === "mostLiked") {
        sortOption = {
          likeCount: -1,
          createdAt: -1,
        };
      }

      const pageNumber = Math.max(Number(page) || 1, 1);
      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);
      const skip = (pageNumber - 1) * limitNumber;

      const blogQuery = sort === "mostLiked"
        ? Blog.aggregate([
            { $match: filter },
            { $lookup: { from: "likes", localField: "_id", foreignField: "blog", as: "blogLikes" } },
            { $addFields: { likeCount: { $size: "$blogLikes" } } },
            { $sort: { likeCount: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limitNumber },
            { $project: { blogLikes: 0 } },
          ])
            .then((items) => Blog.populate(items, [
              { path: "author", select: "name email profileImage" },
              { path: "category", select: "name slug" },
              { path: "tags", select: "name slug" },
            ]))
        : Blog.find(filter)
          .populate("author", "name email profileImage")
          .populate("category", "name slug")
          .populate("tags", "name slug")
          .sort(sortOption)
          .skip(skip)
          .limit(limitNumber);

      const [blogs, total] = await Promise.all([
        blogQuery,
        Blog.countDocuments(filter),
      ]);

      return res.status(200).json({
        success: true,

        data: {
          blogs,

          pagination: {
            total,

            page: pageNumber,

            limit: limitNumber,

            totalPages: Math.ceil(total / limitNumber),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

        // GET ALL BLOGS FOR ADMINISTRATION
  // GET /blog/admin/all
         async getAdminBlogs(req, res, next) {
    try {
      const {
        search,

        status,

        category,

        page = 1,

        limit = 10,
      } = req.query;

          // BASE FILTER
    
      const filter = {
        isDeleted: false,
      };

          // STATUS FILTER
    
      if (status) {
        filter.status = status;
      }

          // CATEGORY FILTER
    
      if (category) {
        filter.category = category;
      }

          // SEARCH
    
      if (search) {
        filter.$text = {
          $search: search,
        };
      }

          // PAGINATION
    
      const pageNumber = Math.max(Number(page) || 1, 1);

      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

      const skip = (pageNumber - 1) * limitNumber;

          // GET BLOGS + COUNT + STATS
    
      const [blogs, total, stats] = await Promise.all([
        Blog.find(filter)

          .populate("author", "name email profileImage")

          .populate("category", "name slug")

          .populate("tags", "name slug")

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(limitNumber),

        Blog.countDocuments(filter),

        Blog.aggregate([
          {
            $match: {
              isDeleted: false,
            },
          },

          {
            $group: {
              _id: "$status",

              count: {
                $sum: 1,
              },
            },
          },
        ]),
      ]);

          // FORMAT STATISTICS
    
      const blogStats = {
        total: 0,

        published: 0,

        pending: 0,

        draft: 0,

        rejected: 0,

        unpublished: 0,
      };

      stats.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(blogStats, item._id)) {
          blogStats[item._id] = item.count;
        }

        blogStats.total += item.count;
      });

          // RESPONSE
    
      return res.status(200).json({
        success: true,

        data: {
          blogs,

          stats: blogStats,

          pagination: {
            total,

            page: pageNumber,

            limit: limitNumber,

            totalPages: Math.ceil(total / limitNumber),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

        // GET BLOG BY ID
  // GET /blog/:id
         async getBlogById(req, res, next) {
    try {
      const canReviewUnpublished =
        req.user &&
        (req.user.role === "administration" ||
          req.user.role === "administrator");

      const blog = await Blog.findOne({
        _id: req.params.id,
        isDeleted: false,

        ...(canReviewUnpublished
          ? {}
          : {
              $or: [
                { status: "published" },
                ...(req.user?.role === "author"
                  ? [{ author: req.user.id }]
                  : []),
              ],
            }),
      })

        .populate("author", "name profileImage bio")

        .populate("category", "name slug")

        .populate("tags", "name slug");

      if (!blog) {
        return res.status(404).json({
          success: false,

          message: "Blog not found",
        });
      }

      const likeCount = await Like.countDocuments({
        blog: blog._id,
      });

      const isLiked = req.user
        ? Boolean(
            await Like.exists({
              user: req.user._id,
              blog: blog._id,
            }),
          )
        : false;

      const blogData = blog.toObject();

      blogData.likeCount = likeCount;

      blogData.isLiked = isLiked;

      return res.status(200).json({
        success: true,

        data: blogData,
      });
    } catch (error) {
      next(error);
    }
  }

        // GET MY BLOGS
  // GET /blog/my-blogs
         async getMyBlogs(req, res, next) {
    try {
      const {
        status,

        page = 1,

        limit = 10,
      } = req.query;

      const filter = {
        author: req.user.id,

        isDeleted: false,
      };

      if (status) {
        filter.status = status;
      }

      const pageNumber = Math.max(Number(page) || 1, 1);

      const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

      const skip = (pageNumber - 1) * limitNumber;

      const [blogs, total] = await Promise.all([
        Blog.find(filter)

          .populate("category", "name slug")

          .populate("tags", "name slug")

          .sort({
            createdAt: -1,
          })

          .skip(skip)

          .limit(limitNumber),

        Blog.countDocuments(filter),
      ]);

      return res.status(200).json({
        success: true,

        data: {
          blogs,

          pagination: {
            total,

            page: pageNumber,

            limit: limitNumber,

            totalPages: Math.ceil(total / limitNumber),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

        // UPDATE BLOG
  // PATCH /blog/:id/update
         async updateBlog(req, res, next) {
    try {
      const blog = await Blog.findOne({
        _id: req.params.id,

        author: req.user.id,

        isDeleted: false,
      });

      if (!blog) {
        return res.status(404).json({
          success: false,

          message: "Blog not found or you do not have permission",
        });
      }

      const {
        title,

        description,

        content,

        category,
      } = req.body;

      const tags = parseTags(req.body.tags);

          // CATEGORY VALIDATION
    
      if (category) {
        const existingCategory = await Category.findOne({
          _id: category,

          isActive: true,

          isDeleted: false,
        });

        if (!existingCategory) {
          return res.status(400).json({
            success: false,

            message: "Invalid or inactive category",
          });
        }
      }

          // TAG VALIDATION
    
      if (tags.length > 0) {
        const validTags = await Tag.countDocuments({
          _id: {
            $in: tags,
          },

          isActive: true,

          isDeleted: false,
        });

        if (validTags !== tags.length) {
          return res.status(400).json({
            success: false,

            message: "One or more tags are invalid or inactive",
          });
        }
      }

          // UPDATE BASIC FIELDS
    
      if (title) {
        blog.title = title;

        blog.slug = generateSlug(title);
      }

      if (description !== undefined) {
        blog.description = description;
      }

      if (category !== undefined) {
        blog.category = category;
      }

      if (req.body.tags !== undefined) {
        blog.tags = tags;
      }

          // FEATURED IMAGE
    
      const featuredFile = req.files?.featuredImage?.[0];

      if (featuredFile) {
        const newImage = await uploadFeaturedImage(featuredFile);

        if (blog.featuredImage?.publicId) {
          await deleteFromCloudinary(blog.featuredImage.publicId);
        }

        blog.featuredImage = newImage;
      }

          // CONTENT IMAGES
    
      const contentFiles = req.files?.contentImages || [];

      if (contentFiles.length > 0) {
        const newContentImages = await uploadContentImages(contentFiles);

        const updatedContent = replaceImagePlaceholders(
          content || blog.content,

          newContentImages,
        );

        blog.content = updatedContent;

        blog.contentImages.push(...newContentImages);
      } else if (content !== undefined) {
        blog.content = content;
      }

      if (blog.status === "published") {
        blog.status = "pending";
        blog.publishedAt = null;
      }

      await blog.save();

      return res.status(200).json({
        success: true,

        message: blog.status === "pending"
          ? "Blog updated and submitted for approval"
          : "Blog updated successfully",

        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

        // SUBMIT BLOG
  // PATCH /blog/:id/submit
         async submitBlog(req, res, next) {
    try {
      const blog = await Blog.findOne({
        _id: req.params.id,

        author: req.user.id,

        status: "draft",

        isDeleted: false,
      });

      if (!blog) {
        return res.status(400).json({
          success: false,

          message: "Only draft blogs can be submitted",
        });
      }

      blog.status = "pending";

      await blog.save();

      const administrators = await User.find({
        role: "administration",

        status: "active",
      }).select("_id");

      if (administrators.length > 0) {
        await Notification.insertMany(
          administrators.map((administrator) => ({
            recipient: administrator._id,

            sender: req.user.id,

            type: "blog_submitted",

            title: "Blog submitted for approval",

            message: `${blog.title} has been submitted for approval.`,

            blog: blog._id,
          })),
        );
      }

      return res.status(200).json({
        success: true,

        message: "Blog submitted for approval",

        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  // RECORD BLOG VIEW
  // POST /blog/:id/view

  async recordBlogView(req, res, next) {
    try {
      const { id } = req.params;

       
      // VALIDATE BLOG ID
       

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,

          message: "Invalid blog ID",
        });
      }

       
      // FIND BLOG
       

      const blog = await Blog.findOne({
        _id: id,

        isDeleted: false,

        status: "published",
      });

      if (!blog) {
        return res.status(404).json({
          success: false,

          message: "Blog not found",
        });
      }

       
      // OPTIONAL:
      // DON'T COUNT AUTHOR'S OWN VIEW
       

      if (req.user && blog.author.toString() === req.user._id.toString()) {
        return res.status(200).json({
          success: true,

          message: "Author view not counted",

          data: {
            views: blog.views,
          },
        });
      }

       
      // CREATE VIEW RECORD
       

      await BlogView.create({
        blog: blog._id,

        user: req.user?._id || null,

        viewedAt: new Date(),
      });

       
      // INCREMENT TOTAL VIEWS
       

      blog.views = (blog.views || 0) + 1;

      await blog.save();

      return res.status(200).json({
        success: true,

        message: "Blog view recorded",

        data: {
          views: blog.views,
        },
      });
    } catch (error) {
      next(error);
    }
  }

        // PUBLISH BLOG
  // ADMINISTRATION ONLY
         async publishBlog(req, res, next) {
    try {
      const blog = await Blog.findOneAndUpdate(
        {
          _id: req.params.id,

          status: {
            $in: ["pending", "unpublished"],
          },

          isDeleted: false,
        },

        {
          status: "published",

          publishedAt: new Date(),
        },

        {
          new: true,
        },
      )

        .populate("author", "name email profileImage")

        .populate("category", "name slug")

        .populate("tags", "name slug");

      if (!blog) {
        return res.status(400).json({
          success: false,

          message: "Blog cannot be published",
        });
      }

      const followers = await User.find({
        favoriteAuthors: blog.author,
        status: "active",
      }).select("_id");

      if (followers.length > 0) {
        await Notification.insertMany(
          followers.map((follower) => ({
            recipient: follower._id,
            sender: blog.author,
            type: "blog_published",
            title: "A favourite author published",
            message: `${blog.title} is now available to read.`,
            blog: blog._id,
          })),
        );
      }

      return res.status(200).json({
        success: true,

        message: "Blog published successfully",

        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

        // REJECT BLOG
  // ADMINISTRATION ONLY
         async rejectBlog(req, res, next) {
    try {
      const blog = await Blog.findOneAndUpdate(
        {
          _id: req.params.id,

          status: "pending",

          isDeleted: false,
        },

        {
          status: "rejected",

          rejectionReason: req.body.rejectionReason || null,
        },

        {
          new: true,
        },
      )

        .populate("author", "name email profileImage")

        .populate("category", "name slug")

        .populate("tags", "name slug");

      if (!blog) {
        return res.status(400).json({
          success: false,

          message: "Blog cannot be rejected",
        });
      }

      return res.status(200).json({
        success: true,

        message: "Blog rejected successfully",

        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

        // UNPUBLISH BLOG
  // ADMINISTRATION ONLY
         async unpublishBlog(req, res, next) {
    try {
      const blog = await Blog.findOneAndUpdate(
        {
          _id: req.params.id,

          status: "published",

          isDeleted: false,
        },

        {
          status: "unpublished",
        },

        {
          new: true,
        },
      )

        .populate("author", "name email profileImage")

        .populate("category", "name slug")

        .populate("tags", "name slug");

      if (!blog) {
        return res.status(400).json({
          success: false,

          message: "Blog cannot be unpublished",
        });
      }

      return res.status(200).json({
        success: true,

        message: "Blog unpublished successfully",

        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

        // DELETE BLOG
  // AUTHOR:
  // DELETE OWN BLOG ONLY
  //
  // ADMINISTRATOR:
  // DELETE ANY BLOG
         async deleteBlog(req, res, next) {
    try {
      const filter = {
        _id: req.params.id,

        isDeleted: false,
      };

          // AUTHOR PERMISSION
    
      if (req.user.role === "author") {
        filter.author = req.user.id;
      }

      const blog = await Blog.findOneAndUpdate(
        filter,

        {
          isDeleted: true,

          deletedAt: new Date(),

          deletedBy: req.user.id,
        },

        {
          new: true,
        },
      );

      if (!blog) {
        return res.status(404).json({
          success: false,

          message: "Blog not found or unauthorized",
        });
      }

      return res.status(200).json({
        success: true,

        message: "Blog deleted successfully",

        data: {
          id: blog._id,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BlogController();
