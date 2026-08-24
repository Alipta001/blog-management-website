const router =
  require("express").Router();

const analyticsController =
  require(
    "../controllers/analytics.controller"
  );

const authMiddleware =
  require(
    "../middleware/auth.middleware"
  );

const authorize =
  require(
    "../middleware/authorize.middleware"
  );


 
// AUTHOR ANALYTICS
 

router.get(
  "/author",

  authMiddleware,

  authorize(
    "author"
  ),

  analyticsController
    .getAuthorAnalytics
);


module.exports =
  router;