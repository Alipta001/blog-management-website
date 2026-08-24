const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/user");
const Otp = require("../models/otp");

const sendRegistrationOtpEmail = require(
  "../utils/sendRegistrationOtpEmail",
);

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");


 
// COOKIE OPTIONS
 

const accessCookieOptions = {

  httpOnly: true,
  secure: true,
  sameSite: "none",
  partitioned: true,
  path: "/",
  maxAge:
    15 * 60 * 1000,

};


const refreshCookieOptions = {

  httpOnly: true,

  secure: true,

  sameSite: "none",
  partitioned: true,
path: "/",
  maxAge:
    7 *
    24 *
    60 *
    60 *
    1000,

};


 
// CONTROLLER
 

class AuthController {


  // RESEND REGISTRATION OTP
  //
  // POST /auth/resend-registration-otp

  async resendRegistrationOtp(
    req,
    res,
    next,
  ) {

    try {

      const {
        email,
      } = req.body;

      const normalizedEmail =
        email.toLowerCase().trim();

      const otpRecord =
        await Otp.findOne({
          email:
            normalizedEmail,
          purpose:
            "registration",
        });

      if (
        !otpRecord ||
        otpRecord.expiresAt < new Date()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "OTP not found or expired",
        });
      }

      const otp =
        crypto
          .randomInt(
            100000,
            1000000,
          )
          .toString();

      const hashedOtp =
        await bcrypt.hash(
          otp,
          10,
        );

      const expiresAt =
        new Date(
          Date.now() +
          10 *
          60 *
          1000,
        );

      otpRecord.otp = hashedOtp;
      otpRecord.expiresAt = expiresAt;
      otpRecord.attempts = 0;

      await otpRecord.save();

      await sendRegistrationOtpEmail({
        email: normalizedEmail,
        name: otpRecord.name,
        otp,
      });

      return res.status(200).json({
        success: true,
        message:
          "OTP resent successfully",
        data: {
          email:
            normalizedEmail,
          expiresIn:
            600,
        },
      });

    } catch (error) {
      next(error);
    }

  }


   
  // SEND REGISTRATION OTP
  //
  // POST /auth/send-registration-otp
   

  async sendRegistrationOtp(
    req,
    res,
    next,
  ) {

    try {

      const {
        name,
        email,
        phone,
        password,
        role,
      } = req.body;


      //                             =
      // NORMALIZE EMAIL
      //                             =

      const normalizedEmail =
        email.toLowerCase().trim();


      //                             =
      // CHECK EXISTING USER
      //                             =

      const existingUser =
        await User.findOne({
          email:
            normalizedEmail,
        });


      if (existingUser) {

        return res.status(409).json({

          success: false,

          message:
            "User already exists with this email",

        });

      }


      //                             =
      // ALLOW ONLY PUBLIC ROLES
      // Never allow administration
      // registration from frontend
      //                             =

      const allowedRoles = [
        "author",
        "user",
        "reader"
      ];


      const userRole =
        allowedRoles.includes(role)
          ? role
          : "reader";


      //                             =
      // HASH PASSWORD
      //                             =

      const hashedPassword =
        await bcrypt.hash(
          password,
          12,
        );


      //                             =
      // GENERATE 6 DIGIT OTP
      //                             =

      const otp =
        crypto
          .randomInt(
            100000,
            1000000,
          )
          .toString();


      //                             =
      // HASH OTP
      //                             =

      const hashedOtp =
        await bcrypt.hash(
          otp,
          10,
        );


      //                             =
      // SET EXPIRY
      // 10 MINUTES
      //                             =

      const expiresAt =
        new Date(
          Date.now() +
          10 *
          60 *
          1000,
        );


      //                             =
      // REMOVE EXISTING
      // REGISTRATION OTP
      //                             =

      await Otp.deleteOne({

        email:
          normalizedEmail,

        purpose:
          "registration",

      });


      //                             =
      // CREATE OTP RECORD
      //                             =

      await Otp.create({

        name,

        email:
          normalizedEmail,

        phone,

        password:
          hashedPassword,

        role:
          userRole,

        otp:
          hashedOtp,

        expiresAt,

        purpose:
          "registration",

        attempts: 0,

      });


      //                             =
      // SEND OTP EMAIL
      //                             =

      await sendRegistrationOtpEmail({
  email: normalizedEmail,

  name,

  otp,
});


      return res.status(200).json({

        success: true,

        message:
          "OTP sent successfully",

        data: {

          email:
            normalizedEmail,

          expiresIn:
            600,

        },

      });

    } catch (error) {

      next(error);

    }

  }


   
  // VERIFY REGISTRATION OTP
  //
  // POST /auth/verify-registration-otp
   

  async verifyRegistrationOtp(
    req,
    res,
    next,
  ) {

    try {

      const {
        email,
        otp,
      } = req.body;


      //                             =
      // NORMALIZE EMAIL
      //                             =

      const normalizedEmail =
        email.toLowerCase().trim();


      //                             =
      // FIND OTP RECORD
      //                             =

      const otpRecord =
        await Otp.findOne({

          email:
            normalizedEmail,

          purpose:
            "registration",

        })
          .select(
            "+otp +password",
          );


      //                             =
      // OTP NOT FOUND
      //                             =

      if (!otpRecord) {

        return res.status(400).json({

          success: false,

          message:
            "OTP not found or expired",

        });

      }


      //                             =
      // CHECK OTP EXPIRY
      //                             =

      if (
        otpRecord.expiresAt <
        new Date()
      ) {

        await Otp.deleteOne({

          _id:
            otpRecord._id,

        });


        return res.status(400).json({

          success: false,

          message:
            "OTP has expired",

        });

      }


      //                             =
      // CHECK MAX ATTEMPTS
      //                             =

      if (
        otpRecord.attempts >=
        5
      ) {

        await Otp.deleteOne({

          _id:
            otpRecord._id,

        });


        return res.status(429).json({

          success: false,

          message:
            "Too many invalid attempts. Please request a new OTP.",

        });

      }


      //                             =
      // VERIFY OTP
      //                             =

      const isOtpValid =
        await bcrypt.compare(
          otp,
          otpRecord.otp,
        );


      //                             =
      // INVALID OTP
      //                             =

      if (!isOtpValid) {

        otpRecord.attempts += 1;

        await otpRecord.save();


        return res.status(400).json({

          success: false,

          message:
            "Invalid OTP",

        });

      }


      //                             =
      // DOUBLE CHECK
      // USER DOESN'T EXIST
      //                             =

      const existingUser =
        await User.findOne({

          email:
            normalizedEmail,

        });


      if (existingUser) {

        await Otp.deleteOne({

          _id:
            otpRecord._id,

        });


        return res.status(409).json({

          success: false,

          message:
            "User already exists with this email",

        });

      }


      //                             =
      // CREATE USER
      //                             =

      const user =
        await User.create({

          name:
            otpRecord.name,

          email:
            otpRecord.email,

          phone:
            otpRecord.phone,

          password:
            otpRecord.password,

          role:
            otpRecord.role,

          isVerified:
            true,

        });


      //                             =
      // DELETE USED OTP
      //                             =

      await Otp.deleteOne({

        _id:
          otpRecord._id,

      });


      return res.status(201).json({

        success: true,

        message:
          "Email verified and registration successful",

        data: {

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            role:
              user.role,

            profileImage:
              user.profileImage,

          },

        },

      });

    } catch (error) {

      next(error);

    }

  }


   
  // LOGIN
  //
  // POST /auth/login
   

  async login(
    req,
    res,
    next,
  ) {

    try {

      const {
        email,
        password,
      } = req.body;


      //                             =
      // NORMALIZE EMAIL
      //                             =

      const normalizedEmail =
        email.toLowerCase().trim();


      //                             =
      // FIND USER
      //                             =

      const user =
        await User.findOne({

          email:
            normalizedEmail,

        })
          .select(
            "+password +refreshToken",
          );


      //                             =
      // USER NOT FOUND
      //                             =

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password",

        });

      }


      //                             =
      // CHECK ACCOUNT STATUS
      //                             =

      if (
        user.status !==
        "active"
      ) {

        return res.status(403).json({

          success: false,

          message:
            `Your account is ${user.status}`,

        });

      }


      //                             =
      // CHECK EMAIL VERIFICATION
      //                             =

      if (!user.isVerified) {

        return res.status(403).json({

          success: false,

          message:
            "Please verify your email before logging in",

        });

      }


      //                             =
      // COMPARE PASSWORD
      //                             =

      const isPasswordMatched =
        await bcrypt.compare(

          password,

          user.password,

        );


      if (!isPasswordMatched) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password",

        });

      }


      //                             =
      // GENERATE ACCESS TOKEN
      //                             =

      const accessToken =
        generateAccessToken({

          userId:
            user._id,

          role:
            user.role,

        });


      //                             =
      // GENERATE REFRESH TOKEN
      //                             =

      const refreshToken =
        generateRefreshToken({

          userId:
            user._id,

        });


      //                             =
      // SAVE REFRESH TOKEN
      //                             =

      user.refreshToken =
        refreshToken;


      await user.save();


      //                             =
      // SET ACCESS COOKIE
      //                             =

      res.cookie(

        "accessToken",

        accessToken,

        accessCookieOptions,

      );


      //                             =
      // SET REFRESH COOKIE
      //                             =

      res.cookie(

        "refreshToken",

        refreshToken,

        refreshCookieOptions,

      );


      return res.status(200).json({

        success: true,

        message:
          "Login successful",

        data: {

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            role:
              user.role,

            profileImage:
              user.profileImage,

          },

        },

      });

    } catch (error) {

      next(error);

    }

  }


   
  // REFRESH TOKEN
  //
  // POST /auth/refresh-token
   

  async refreshToken(
    req,
    res,
    next,
  ) {

    try {

      const refreshToken =
        req.cookies.refreshToken;


      //                             =
      // REFRESH TOKEN MISSING
      //                             =

      if (!refreshToken) {

        return res.status(401).json({

          success: false,

          message:
            "Refresh token missing",

        });

      }

      try {
        verifyRefreshToken(refreshToken);
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
        });
      }


      //                             =
      // FIND USER
      //                             =

      const user =
        await User.findOne({

          refreshToken,

        })
          .select(
            "+refreshToken",
          );


      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid refresh token",

        });

      }


      //                             =
      // CHECK STATUS
      //                             =

      if (
        user.status !==
        "active"
      ) {

        return res.status(403).json({

          success: false,

          message:
            `Your account is ${user.status}`,

        });

      }


      //                             =
      // GENERATE NEW ACCESS TOKEN
      //                             =

      const accessToken =
        generateAccessToken({

          userId:
            user._id,

          role:
            user.role,

        });


      //                             =
      // SET ACCESS TOKEN COOKIE
      //                             =

      res.cookie(

        "accessToken",

        accessToken,

        accessCookieOptions,

      );


      return res.status(200).json({

        success: true,

        message:
          "Access token refreshed",

      });

    } catch (error) {

      next(error);

    }

  }


   
  // GET CURRENT USER
  //
  // GET /auth/me
   

  async getCurrentUser(
    req,
    res,
    next,
  ) {

    try {

      const userId =
        req.user.id ||
        req.user._id || req.user.userId;


      const user =
        await User.findById(
          userId,
        )
          .select(
            "-password -refreshToken",
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
          "Current user fetched successfully",

        data: {

          user,

        },

      });

    } catch (error) {

      next(error);

    }

  }


   
  // LOGOUT
  //
  // POST /auth/logout
   

  async logout(
    req,
    res,
    next,
  ) {

    try {

      const userId =
        req.user.id ||
        req.user._id;


      //                             =
      // REMOVE REFRESH TOKEN
      //                             =

      await User.findByIdAndUpdate(

        userId,

        {
          refreshToken:
            null,
        },

      );


      //                             =
      // CLEAR ACCESS TOKEN
      //                             =

      res.clearCookie(

        "accessToken",

        {

          httpOnly: true,

          secure: true,

          sameSite: "none",

        },

      );


      //                             =
      // CLEAR REFRESH TOKEN
      //                             =

      res.clearCookie(

        "refreshToken",

        {

          httpOnly: true,

          secure: true,

          sameSite: "none",

        },

      );


      return res.status(200).json({

        success: true,

        message:
          "Logout successful",

      });

    } catch (error) {

      next(error);

    }

  }


   
  // CHANGE PASSWORD
  //
  // PATCH /auth/change-password
   

  async changePassword(
    req,
    res,
    next,
  ) {

    try {

      const userId =
        req.user.id ||
        req.user._id;


      const {
        currentPassword,
        newPassword,
      } = req.body;


      //                             =
      // FIND USER
      //                             =

      const user =
        await User.findById(
          userId,
        )
          .select(
            "+password +refreshToken",
          );


      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }


      //                             =
      // COMPARE CURRENT PASSWORD
      //                             =

      const isPasswordMatched =
        await bcrypt.compare(

          currentPassword,

          user.password,

        );


      if (!isPasswordMatched) {

        return res.status(400).json({

          success: false,

          message:
            "Current password is incorrect",

        });

      }


      //                             =
      // HASH NEW PASSWORD
      //                             =

      const hashedPassword =
        await bcrypt.hash(

          newPassword,

          12,

        );


      //                             =
      // UPDATE PASSWORD
      //                             =

      user.password =
        hashedPassword;


      //                             =
      // INVALIDATE REFRESH TOKEN
      //                             =

      user.refreshToken =
        null;


      await user.save();


      //                             =
      // CLEAR ACCESS TOKEN
      //                             =

      res.clearCookie(

        "accessToken",

        {

          httpOnly: true,

          secure: true,

          sameSite: "none",
path: "/",
        },

      );


      //                             =
      // CLEAR REFRESH TOKEN
      //                             =

      res.clearCookie(

        "refreshToken",

        {

          httpOnly: true,

          secure: true,

          sameSite: "none",
path: "/",
        },

      );


      return res.status(200).json({

        success: true,

        message:
          "Password changed successfully. Please login again.",

      });

    } catch (error) {

      next(error);

    }

  }

}

module.exports =
  new AuthController();