const Category = require("../models/category");


class CategoryController {

     // CREATE CATEGORY
     async createCategory(req, res, next) {
    try {
      const {
        name,
        description, 
        image,
      } = req.body;

      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const existingCategory =
        await Category.findOne({
          slug,
        });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category =
        await Category.create({
          name,
          description,
          image,
          slug,
        });

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });

    } catch (error) {
      next(error);
    }
  }


     // GET ALL CATEGORIES
     async getCategories(req, res, next) {
    try {
      const categories =
        await Category.find({
          isDeleted: false,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        data: categories,
      });

    } catch (error) {
      next(error);
    }
  }


     // GET CATEGORY BY ID
     async getCategoryById(req, res, next) {
    try {
      const category =
        await Category.findOne({
          _id: req.params.id,
          isDeleted: false,
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });

    } catch (error) {
      next(error);
    }
  }


     // UPDATE CATEGORY
 async updateCategory(req, res, next) {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.body.name) {
      const slug = req.body.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const existingCategory =
        await Category.findOne({
          slug,
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category name already exists",
        });
      }

      updateData.slug = slug;
    }

    const category =
      await Category.findOneAndUpdate(
        {
          _id: req.params.id,
          isDeleted: false,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });

  } catch (error) {
    next(error);
  }
}


     // ACTIVATE CATEGORY
     async activateCategory(req, res, next) {
    try {
      const category =
        await Category.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },
          {
            isActive: true,
          },
          {
            new: true,
          }
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category activated successfully",
        data: category,
      });

    } catch (error) {
      next(error);
    }
  }


     // DEACTIVATE CATEGORY
     async deactivateCategory(req, res, next) {
    try {
      const category =
        await Category.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },
          {
            isActive: false,
          },
          {
            new: true,
          }
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deactivated successfully",
        data: category,
      });

    } catch (error) {
      next(error);
    }
  }


     // DELETE CATEGORY
  // SOFT DELETE
     async deleteCategory(req, res, next) {
    try {
      const category =
        await Category.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },
          {
            isDeleted: true,
          },
          {
            new: true,
          }
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  }
}


module.exports = new CategoryController();