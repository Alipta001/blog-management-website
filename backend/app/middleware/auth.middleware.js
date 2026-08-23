const User = require("../models/user");
const { verifyAccessToken } = require("../utils/token");

const getRequestUser = (user) => ({
  id: user._id.toString(),
  _id: user._id,
  role: user.role,
});

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

    const decoded = verifyAccessToken(token);

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

    req.user = getRequestUser(user);

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
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId).select("-password -refreshToken");

    if (user) {
      req.user = getRequestUser(user);
    }
  } catch (error) {
    // Public blog reads remain available when an optional session is stale.
  }

  next();
};

module.exports =
  authMiddleware;

module.exports.optionalAuthMiddleware = optionalAuthMiddleware;