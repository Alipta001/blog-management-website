const router = require("express").Router();

const likeController = require("../controllers/like.controller");

const authMiddleware = require("../middleware/auth.middleware");

 
// GET BLOG LIKE COUNT
// PUBLIC
// GET /like/:blogId/like-count
 

router.get("/:blogId/like-count", likeController.getBlogLikes);

 
// GET LIKE STATUS
// AUTHENTICATED
// GET /like/:blogId/status
 

router.get("/:blogId/status", authMiddleware, likeController.getLikeStatus);

 
// LIKE BLOG
// POST /like/:blogId/like
 

router.post("/:blogId/like", authMiddleware, likeController.likeBlog);

 
// UNLIKE BLOG
// DELETE /like/:blogId/unlike
 

router.delete("/:blogId/unlike", authMiddleware, likeController.unlikeBlog);

module.exports = router;
