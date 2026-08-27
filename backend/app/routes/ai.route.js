const router = require("express").Router();

const aiController =
  require("../controllers/ai.controller");

const authMiddleware =
  require("../middleware/auth.middleware");


// =========================================
// READER AI
// =========================================

// Ask question about a published blog

router.post(
  "/ask-blog",

  authMiddleware,

  aiController.askAboutBlog
);


// Summarize a published blog

router.post(
  "/summarize-blog",

  authMiddleware,

  aiController.summarizeBlog
);


// =========================================
// AUTHOR AI
// =========================================

// Generate blog using AI

router.post(
  "/generate-blog",

  authMiddleware,

  aiController.generateBlog
);


module.exports = router;