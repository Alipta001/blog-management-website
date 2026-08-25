const router = require("express").Router();
const commentController = require(
  "../controllers/comment.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const authorize = require(
  "../middleware/authorize.middleware"
);


 
// GET COMMENTS FOR CURRENT AUTHOR
 

router.get(
  "/author",

  authMiddleware,

  authorize("author"),

  commentController.getCommentsForAuthor
);

// GET ALL COMMENTS FOR ADMINISTRATION

router.get(
  "/administration",

  authMiddleware,

  authorize("administration"),

  commentController.getAllComments
);


 
// GET APPROVED COMMENTS OF A BLOG
 

router.get(
  "/blog/:blogId",

  authMiddleware.optionalAuthMiddleware,

  commentController.getBlogComments
);


 
// CREATE COMMENT
 

router.post(
  "/blog/:blogId/create",

  authMiddleware,

  commentController.createComment
);


 
// UPDATE OWN COMMENT
 

router.patch(
  "/:id/update",

  authMiddleware,

  commentController.updateComment
);


 
// DELETE OWN COMMENT
 

router.delete(
  "/:id/delete",

  authMiddleware,

  commentController.deleteComment
);

router.patch(
  "/:id/like",

  authMiddleware,

  commentController.toggleCommentLike,
);

router.patch(
  "/:id/pin",

  authMiddleware,

  authorize("author"),

  commentController.toggleCommentPin,
);


 
// MODERATE COMMENT
// ADMINISTRATION ONLY
 

router.patch(
  "/:id/moderate",

  authMiddleware,

  authorize("administration"),

  commentController.moderateComment,
);


module.exports = router;

