const User = require("../models/user");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinaryUpload");


class UserController {

   
  // GET ALL USERS
  // ADMINISTRATION ONLY

  async getUsers(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        role,
        status,
      } = req.query;


      const filter = {};


      // Search by name or email
      if (search) {
        filter.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }


      // Filter by role
      if (role) {
        filter.role = role;
      }


      // Filter by status
      if (status) {
        filter.status = status;
      }


      const pageNumber =
        Math.max(
          1,
          Number(page) || 1
        );


      const limitNumber =
        Math.min(
          Math.max(
            1,
            Number(limit) || 10
          ),
          100
        );


      const skip =
        (pageNumber - 1) *
        limitNumber;


      const [users, total] =
        await Promise.all([

          User.find(filter)
            .select(
              "-password -refreshToken"
            )
            .skip(skip)
            .limit(limitNumber)
            .sort({
              createdAt: -1,
            }),

          User.countDocuments(filter),

        ]);


      return res.status(200).json({
        success: true,

        message:
          "Users fetched successfully",

        data: {
          users,

          pagination: {
            total,

            page:
              pageNumber,

            limit:
              limitNumber,

            totalPages:
              Math.ceil(
                total /
                limitNumber
              ),
          },
        },
      });

    } catch (error) {
      next(error);
    }
  }



   
  // GET USER BY ID
  // ADMINISTRATION ONLY
   

  async getUserById(req, res, next) {
    try {

      const user =
        await User.findById(
          req.params.id
        ).select(
          "-password -refreshToken"
        );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // UPDATE USER
  // ADMINISTRATION ONLY
   

  async updateUser(req, res, next) {
    try {

      const allowedFields = [
        "name",
        "email",
        "phone",
        "address",
        "department",
        "role",
        "status",
      ];


      const updateData = {};


      allowedFields.forEach(
        (field) => {

          if (
            req.body[field] !== undefined
          ) {
            updateData[field] =
              req.body[field];
          }

        }
      );


      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          updateData,

          {
            new: true,

            runValidators: true,
          }
        )
          .select(
            "-password -refreshToken"
          );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "User updated successfully",

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // ACTIVATE USER
  // ADMINISTRATION ONLY
   

  async activateUser(req, res, next) {
    try {

      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          {
            status: "active",
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .select(
            "-password -refreshToken"
          );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "User activated successfully",

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // DEACTIVATE USER
  // ADMINISTRATION ONLY
   

  async deactivateUser(req, res, next) {
    try {

      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          {
            status: "inactive",

            refreshToken: null,
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .select(
            "-password -refreshToken"
          );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "User deactivated successfully",

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // BLOCK USER
  // ADMINISTRATION ONLY
   

  async blockUser(req, res, next) {
    try {

      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          {
            status: "blocked",

            refreshToken: null,
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .select(
            "-password -refreshToken"
          );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "User blocked successfully",

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // DELETE USER
  // ADMINISTRATION ONLY
   

  async deleteUser(req, res, next) {
    try {

      const user =
        await User.findByIdAndDelete(
          req.params.id
        );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "User deleted successfully",

        data: {
          id: user._id,
        },
      });

    } catch (error) {
      next(error);
    }
  }



   
  // GET MY PROFILE
   

  async getMyProfile(req, res, next) {
    try {

      const user =
        await User.findById(
          req.user.id
        )
          .select(
            "-password -refreshToken"
          );


      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }


      return res.status(200).json({
        success: true,

        data: user,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // UPDATE MY PROFILE
   
async updateMyProfile(
  req,
  res,
  next
) {

  let uploadedImage = null;

  try {

    const userId =
      req.user.id;

    // FIND USER
    const user =
      await User.findById(
        userId
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }
    // UPDATE TEXT FIELDS
    const allowedFields = [

      "name",

      "phone",

      "address",

      "department",

    ];


    allowedFields.forEach(
      (field) => {

        if (
          req.body[field] !==
          undefined
        ) {

          user[field] =
            req.body[field];

        }

      }
    );

    // OLD IMAGE
    const oldPublicId =
      user.profileImage?.publicId;
    // NEW IMAGE
    if (req.file) {

      uploadedImage =
        await uploadToCloudinary(

          req.file.buffer,

          "blog-management/users"

        );


      user.profileImage = {

        url:
          uploadedImage.secure_url,

        publicId:
          uploadedImage.public_id,

      };

    }
    // SAVE USER
    await user.save();
    // DELETE OLD IMAGE

    if (
      req.file &&
      oldPublicId
    ) {

      try {

        await deleteFromCloudinary(
          oldPublicId
        );

      } catch (deleteError) {

        console.error(
          "Failed to delete old profile image:",
          deleteError
        );

      }

    }
    // RESPONSE
    return res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      data: {

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          phone: user.phone,

          address:
            user.address,

          department:
            user.department,

          role: user.role,

          status:
            user.status,

          profileImage:
            user.profileImage,

        },

      },

    });

  } catch (error) {

    // CLEANUP NEW IMAGE
    if (
      uploadedImage?.public_id
    ) {

      try {

        await deleteFromCloudinary(
          uploadedImage.public_id
        );

      } catch (cleanupError) {

        console.error(
          "Failed to cleanup uploaded image:",
          cleanupError
        );

      }

    }


    next(error);

  }

}

}


module.exports =
  new UserController();