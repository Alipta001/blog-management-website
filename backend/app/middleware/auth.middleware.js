const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    const token =
      req.cookies?.accessToken;

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });

    }

    const decoded =
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

    const user =
      await User.findById(
        decoded.userId
      ).select(
        "-password -refreshToken"
      );

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    }

    req.user =
      user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });

  }

};

const optionalAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password -refreshToken");

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Public blog reads remain available when an optional session is stale.
  }

  next();
};

module.exports =
  authMiddleware;

module.exports.optionalAuthMiddleware = optionalAuthMiddleware;