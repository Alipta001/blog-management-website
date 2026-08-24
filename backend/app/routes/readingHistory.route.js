const router = require("express").Router();

const readingHistoryController = require("../controllers/readingHistory.controller");

const authMiddleware = require("../middleware/auth.middleware");

 
// ADD / UPDATE READING HISTORY
// POST /reading-history/:blogId
 

router.post(
  "/:blogId",

  authMiddleware,

  readingHistoryController.addReadingHistory,
);

 
// GET MY READING HISTORY
// GET /reading-history
 

router.get(
  "/",

  authMiddleware,

  readingHistoryController.getMyReadingHistory,
);

 
// CLEAR MY READING HISTORY
// DELETE /reading-history
 

router.delete(
  "/",

  authMiddleware,

  readingHistoryController.clearReadingHistory,
);

module.exports = router;
