const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// =================================
// COOKIE OPTIONS
// =================================

const isProduction = process.env.NODE_ENV === "production";

const accessCookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: isProduction ? "none" : "lax",

  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: isProduction ? "none" : "lax",

  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// =================================
// CONTROLLER
// =================================

class AuthController {
  // =================================
  // REGISTER
  // =================================

  async register(req, res, next) {
    try {
      const { name, email, phone, password, role } = req.body;

      // Check existing user

      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,

          message: "User already exists with this email",
        });
      }

      // Hash password

      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user

      const user = await User.create({
        name,

        email,

        phone,

        password: hashedPassword,

        role,
      });

      return res.status(201).json({
        success: true,

        message: "Registration successful",

        data: {
          user: {
            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            profileImage: user.profileImage,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // =================================
  // LOGIN
  // =================================

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user

      const user = await User.findOne({
        email,
      }).select("+password +refreshToken");

      // User not found

      if (!user) {
        return res.status(401).json({
          success: false,

          message: "Invalid email or password",
        });
      }

      // Check account status

      if (user.status !== "active") {
        return res.status(403).json({
          success: false,

          message: `Your account is ${user.status}`,
        });
      }

      // Compare password

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,

          message: "Invalid email or password",
        });
      }

      // Generate access token

      const accessToken = generateAccessToken({
        userId: user._id,

        role: user.role,
      });

      // Generate refresh token

      const refreshToken = generateRefreshToken({
        userId: user._id,
      });

      // Save refresh token

      user.refreshToken = refreshToken;

      await user.save();

      // Set access token cookie

      res.cookie("accessToken", accessToken, accessCookieOptions);

      // Set refresh token cookie

      res.cookie("refreshToken", refreshToken, refreshCookieOptions);

      return res.status(200).json({
        success: true,

        message: "Login successful",

        data: {
          user: {
            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            profileImage: user.profileImage,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // =================================
  // REFRESH TOKEN
  // =================================

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      // Refresh token missing

      if (!refreshToken) {
        return res.status(401).json({
          success: false,

          message: "Refresh token missing",
        });
      }

      // Find user

      const user = await User.findOne({
        refreshToken,
      }).select("+refreshToken");

      if (!user) {
        return res.status(401).json({
          success: false,

          message: "Invalid refresh token",
        });
      }

      // Generate new access token

      const accessToken = generateAccessToken({
        userId: user._id,

        role: user.role,
      });

      // Set new access token cookie

      res.cookie("accessToken", accessToken, accessCookieOptions);

      return res.status(200).json({
        success: true,

        message: "Access token refreshed",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res){
  try {

    const user = await User.findById(
      req.user._id
    ).select("-password -refreshToken");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    return res.status(200).json({

      success: true,

      message:
        "Current user fetched successfully",

      data: {
        user,
      },

    });

  } catch (error) {

    console.error(
      "Get current user error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error",

    });

  }
};


  // =================================
  // LOGOUT
  // =================================

  async logout(req, res, next) {
    try {
      const userId = req.user.id;

      // Remove refresh token
      // from database

      await User.findByIdAndUpdate(
        userId,

        {
          refreshToken: null,
        },
      );

      // Clear access token

      res.clearCookie("accessToken", {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction ? "none" : "lax",
      });

      // Clear refresh token

      res.clearCookie("refreshToken", {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction ? "none" : "lax",
      });

      return res.status(200).json({
        success: true,

        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }

  // =================================
  // CHANGE PASSWORD
  // =================================

  async changePassword(req, res, next) {
    try {
      const userId = req.user.id;

      const { currentPassword, newPassword } = req.body;

      // Find user

      const user = await User.findById(userId).select(
        "+password +refreshToken",
      );

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User not found",
        });
      }

      // Compare current password

      const isPasswordMatched = await bcrypt.compare(
        currentPassword,

        user.password,
      );

      if (!isPasswordMatched) {
        return res.status(400).json({
          success: false,

          message: "Current password is incorrect",
        });
      }

      // Hash new password

      const hashedPassword = await bcrypt.hash(
        newPassword,

        12,
      );

      // Update password

      user.password = hashedPassword;

      // Invalidate refresh token

      user.refreshToken = null;

      await user.save();

      // Clear access token

      res.clearCookie("accessToken", {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction ? "none" : "lax",
      });

      // Clear refresh token

      res.clearCookie("refreshToken", {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction ? "none" : "lax",
      });

      return res.status(200).json({
        success: true,

        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
