const router =
  require("express").Router();

const tagController =
  require("../controllers/tag.controller");

const authMiddleware =
  require("../middleware/auth.middleware");

const authorize =
  require("../middleware/authorize.middleware");


// =================================
// PUBLIC ROUTES
// =================================

router.get(
  "/",
  tagController.getTags
);


// =================================
// ADMINISTRATION ROUTES
// Must come before "/:id"
// =================================

router.get(
  "/admin/all",
  authMiddleware,
  authorize("administration"),
  tagController.getAllTagsForAdministration
);

router.post(
  "/",
  authMiddleware,
  authorize("administration"),
  tagController.createTag
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("administration"),
  tagController.updateTag
);

router.patch(
  "/:id/activate",
  authMiddleware,
  authorize("administration"),
  tagController.activateTag
);

router.patch(
  "/:id/deactivate",
  authMiddleware,
  authorize("administration"),
  tagController.deactivateTag
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("administration"),
  tagController.deleteTag
);


// =================================
// PUBLIC PARAMETERIZED ROUTE
// Must come last
// =================================

router.get(
  "/:id",
  tagController.getTagById
);


module.exports = router;