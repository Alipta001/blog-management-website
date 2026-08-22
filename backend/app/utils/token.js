const jwt = require("jsonwebtoken");


 // GENERATE ACCESS TOKEN
 const generateAccessToken = (payload) => {
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:
          process.env.ACCESS_TOKEN_EXPIRES_IN ||
          "30s",
      }
    );

    return accessToken;
  } catch (error) {
    throw error;
  }
};


 // GENERATE REFRESH TOKEN
 const generateRefreshToken = (payload) => {
  try {
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:
          process.env.REFRESH_TOKEN_EXPIRES_IN ||
          "7d",
      }
    );

    return refreshToken;
  } catch (error) {
    throw error;
  }
};


 // VERIFY ACCESS TOKEN
 const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    return decoded;
  } catch (error) {
    throw error;
  }
};


 // VERIFY REFRESH TOKEN
 const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    return decoded;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};