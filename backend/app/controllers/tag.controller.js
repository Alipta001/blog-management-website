const Tag = require("../models/tag");


class TagController {

  // =================================
  // CREATE TAG
  // =================================

  async createTag(req, res, next) {
    try {
      const { name } = req.body;


      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");


      const existingTag =
        await Tag.findOne({
          slug,
          isDeleted: false,
        });


      if (existingTag) {
        return res.status(409).json({
          success: false,
          message: "Tag already exists",
        });
      }


      const tag =
        await Tag.create({
          name,
          slug,
        });


      return res.status(201).json({
        success: true,
        message: "Tag created successfully",
        data: tag,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // GET ALL TAGS
  // =================================

  async getTags(req, res, next) {
    try {

      const tags =
        await Tag.find({
          isDeleted: false,
          isActive: true,
        })
          .sort({
            name: 1,
          });


      return res.status(200).json({
        success: true,
        data: tags,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // GET TAG BY ID
  // =================================

  async getTagById(req, res, next) {
    try {

      const tag =
        await Tag.findOne({
          _id: req.params.id,
          isDeleted: false,
          isActive: true,
        });


      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }


      return res.status(200).json({
        success: true,
        data: tag,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // GET ALL TAGS FOR ADMINISTRATION
  // =================================

  async getAllTagsForAdministration(
    req,
    res,
    next
  ) {
    try {

      const tags =
        await Tag.find({
          isDeleted: false,
        })
          .sort({
            name: 1,
          });


      return res.status(200).json({
        success: true,
        data: tags,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // UPDATE TAG
  // =================================

  async updateTag(req, res, next) {
    try {

      const updateData = {};


      // Only allow specific fields
      if (req.body.name !== undefined) {

        updateData.name =
          req.body.name;


        updateData.slug =
          req.body.name
            .toLowerCase()
            .trim()
            .replace(
              /[^a-z0-9\s-]/g,
              ""
            )
            .replace(
              /\s+/g,
              "-"
            )
            .replace(
              /-+/g,
              "-"
            );


        // Check whether another
        // active/non-deleted tag
        // already uses this slug

        const existingTag =
          await Tag.findOne({
            slug: updateData.slug,

            isDeleted: false,

            _id: {
              $ne: req.params.id,
            },
          });


        if (existingTag) {
          return res.status(409).json({
            success: false,
            message:
              "Tag with this name already exists",
          });
        }
      }


      const tag =
        await Tag.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },

          {
            $set: updateData,
          },

          {
            new: true,
            runValidators: true,
          }
        );


      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }


      return res.status(200).json({
        success: true,
        message:
          "Tag updated successfully",
        data: tag,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // ACTIVATE TAG
  // =================================

  async activateTag(req, res, next) {
    try {

      const tag =
        await Tag.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },

          {
            $set: {
              isActive: true,
            },
          },

          {
            new: true,
            runValidators: true,
          }
        );


      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }


      return res.status(200).json({
        success: true,
        message:
          "Tag activated successfully",
        data: tag,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // DEACTIVATE TAG
  // =================================

  async deactivateTag(req, res, next) {
    try {

      const tag =
        await Tag.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },

          {
            $set: {
              isActive: false,
            },
          },

          {
            new: true,
            runValidators: true,
          }
        );


      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }


      return res.status(200).json({
        success: true,
        message:
          "Tag deactivated successfully",
        data: tag,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // DELETE TAG
  // SOFT DELETE
  // =================================

  async deleteTag(req, res, next) {
    try {

      const tag =
        await Tag.findOneAndUpdate(
          {
            _id: req.params.id,
            isDeleted: false,
          },

          {
            $set: {
              isDeleted: true,
              isActive: false,
            },
          },

          {
            new: true,
          }
        );


      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }


      return res.status(200).json({
        success: true,
        message:
          "Tag deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  }

}


module.exports =
  new TagController();