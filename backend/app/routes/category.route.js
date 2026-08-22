const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

const authMiddleware = require("../middleware/auth.middleware");

const authorize = require("../middleware/authorize.middleware");

// Public
router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

// Administration only
router.post(
  "/create",
  authMiddleware,
  authorize("administration"),
  categoryController.createCategory,
);

router.patch(
  "/:id/update",
  authMiddleware,
  authorize("administration"),
  categoryController.updateCategory,
);

router.patch(
  "/:id/activate",
  authMiddleware,
  authorize("administration"),
  categoryController.activateCategory,
);

router.patch(
  "/:id/deactivate",
  authMiddleware,
  authorize("administration"),
  categoryController.deactivateCategory,
);

router.delete(
  "/:id/delete",
  authMiddleware,
  authorize("administration"),
  categoryController.deleteCategory,
);

module.exports = router;
