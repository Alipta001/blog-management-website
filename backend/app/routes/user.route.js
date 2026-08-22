const router = require("express").Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const authorize = require("../middleware/authorize.middleware");

const {upload} = require('../middleware/upload.middleware')

// =================================
// MY PROFILE
// Must come before "/:id"
// =================================

router.get("/profile", authMiddleware, userController.getMyProfile);

router.patch(
  "/profile/update",

  authMiddleware,

  upload.single("profileImage"),

  userController.updateMyProfile,
);

// =================================
// ADMINISTRATION - USER MANAGEMENT
// =================================

router.get(
  "/all-user",
  authMiddleware,
  authorize("administration"),
  userController.getUsers,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("administration"),
  userController.getUserById,
);

router.patch(
  "/:id/update",
  authMiddleware,
  authorize("administration"),
  userController.updateUser,
);

router.patch(
  "/:id/activate",
  authMiddleware,
  authorize("administration"),
  userController.activateUser,
);

router.patch(
  "/:id/deactivate",
  authMiddleware,
  authorize("administration"),
  userController.deactivateUser,
);

router.patch(
  "/:id/block",
  authMiddleware,
  authorize("administration"),
  userController.blockUser,
);

router.delete(
  "/:id/delete",
  authMiddleware,
  authorize("administration"),
  userController.deleteUser,
);

module.exports = router;
