const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema(
  {

     
    // EMAIL
     

    email: {
      type: String,

      required: true,

      trim: true,

      lowercase: true,

      index: true,
    },


     
    // OTP
    // Store HASHED OTP, never plain OTP
     

    otp: {
      type: String,

      required: true,

      select: false,
    },


     
    // OTP EXPIRATION
     

    expiresAt: {
      type: Date,

      required: true,
    },


     
    // OTP PURPOSE
    // Useful for future features
     

    purpose: {
      type: String,

      enum: [
        "registration",
        "forgot-password",
        "change-email",
      ],

      default: "registration",
    },


     
    // TEMPORARY REGISTRATION DATA
     

    name: {
      type: String,

      trim: true,
    },


    phone: {
      type: String,

      trim: true,
    },


    password: {
      type: String,

      select: false,
    },


    role: {
      type: String,

      enum: [
        "author",
        "reader",
        "user"
      ],

      default: "reader",
    },


     
    // SECURITY
    // Prevent unlimited OTP attempts
     

    attempts: {
      type: Number,

      default: 0,

      min: 0,

      max: 5,
    },

  },

  {
    timestamps: true,

    versionKey: false,
  },
);


 
// TTL INDEX
// MongoDB automatically deletes
// expired OTP documents
 

otpSchema.index(
  {
    expiresAt: 1,
  },

  {
    expireAfterSeconds: 0,
  },
);


 
// ONE OTP PER EMAIL + PURPOSE
 

otpSchema.index(
  {
    email: 1,

    purpose: 1,
  },

  {
    unique: true,
  },
);


module.exports = mongoose.model(
  "Otp",
  otpSchema,
);