const router = require("express").Router();

const blogController = require("../controllers/blog.controller");

const authMiddleware = require("../middleware/auth.middleware");

const authorize = require("../middleware/authorize.middleware");

const { blogImageUpload } = require("../middleware/upload.middleware");

// ========================================
// PUBLIC ROUTES
// ========================================

// GET ALL PUBLISHED BLOGS

router.get(
  "/",

  blogController.getBlogs,
);

// ========================================
// AUTHOR / ADMINISTRATION
// ========================================

// GET MY BLOGS

router.get(
  "/my-blogs",

  authMiddleware,

  authorize(
    "author",

    "administration",
  ),

  blogController.getMyBlogs,
);

// CREATE BLOG

router.post(
  "/create",

  authMiddleware,

  authorize(
    "author",

    "administration",
  ),

  blogImageUpload,

  blogController.createBlog,
);

// blog view count
router.post(
  "/:id/view",
  authMiddleware.optionalAuthMiddleware,
  blogController.recordBlogView,
);

// UPDATE BLOG

router.patch(
  "/:id/update",

  authMiddleware,

  authorize(
    "author",

    "administration",
  ),

  blogImageUpload,

  blogController.updateBlog,
);

// SUBMIT BLOG

router.patch(
  "/:id/submit",

  authMiddleware,

  authorize(
    "author",

    "administration",
  ),

  blogController.submitBlog,
);

// ========================================
// ADMINISTRATION ONLY
// ========================================

// GET ALL BLOGS FOR ADMINISTRATION
//
// Supports:
// ?search=react
// ?status=pending
// ?category=categoryId
// ?page=1
// ?limit=10

router.get(
  "/administration/all",

  authMiddleware,

  authorize("administration"),

  blogController.getAdminBlogs,
);

// PUBLISH BLOG

router.patch(
  "/:id/publish",

  authMiddleware,

  authorize("administration"),

  blogController.publishBlog,
);

// REJECT BLOG

router.patch(
  "/:id/reject",

  authMiddleware,

  authorize("administration"),

  blogController.rejectBlog,
);

// UNPUBLISH BLOG

router.patch(
  "/:id/unpublish",

  authMiddleware,

  authorize("administration"),

  blogController.unpublishBlog,
);

// ========================================
// AUTHOR / ADMINISTRATION
// ========================================

// DELETE BLOG

router.delete(
  "/:id/delete",

  authMiddleware,

  authorize(
    "author",

    "administration",
  ),

  blogController.deleteBlog,
);

// ========================================
// PUBLIC DYNAMIC ROUTE
//
// MUST ALWAYS BE LAST
// ========================================

router.get(
  "/:id",

  authMiddleware.optionalAuthMiddleware,

  blogController.getBlogById,
);

module.exports = router;
