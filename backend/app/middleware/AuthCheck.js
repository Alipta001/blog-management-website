const jwt = require("jsonwebtoken");

const AuthCheck = (roles = []) => {
  return (req, res, next) => {
    try {
      const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req. user = decoded;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          status: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    }
  };
};

module.exports = AuthCheck;