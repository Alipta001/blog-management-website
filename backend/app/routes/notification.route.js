const router =
  require("express").Router();


const notificationController =
  require(
    "../controllers/notification.controller"
  );


const authMiddleware =
  require(
    "../middleware/auth.middleware"
  );


// =================================
// ALL NOTIFICATION ROUTES
// REQUIRE AUTHENTICATION
// =================================


// GET MY NOTIFICATIONS

router.get(
  "/",
  authMiddleware,
  notificationController.getMyNotifications
);


// MARK ALL AS READ

router.patch(
  "/read-all",
  authMiddleware,
  notificationController.markAllAsRead
);


// MARK SINGLE NOTIFICATION AS READ

router.patch(
  "/:id/read",
  authMiddleware,
  notificationController.markAsRead
);


// DELETE NOTIFICATION

router.delete(
  "/:id/delete",
  authMiddleware,
  notificationController.deleteNotification
);


module.exports = router;