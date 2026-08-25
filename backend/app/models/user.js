// const mongoose = require("mongoose");

// const  userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//       minlength: [2, "Name must contain at least 2 characters"],
//       maxlength: [100, "Name cannot exceed 100 characters"],
//     },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     phone: {
//       type: String,
//       trim: true,
//       default: null,
//     },

//     address: {
//       type: String,
//       trim: true,
//       default: null,
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       select: false,
//     },

//     role: {
//       type: String,
//       enum: {
//         values: ["administration", "author", "user"],
//         message: "Invalid  user role",
//       },
//       default: "user",
//       index: true,
//     },

//     profileImage: {
//       type: String,
//       default: null,
//     },

//     bio: {
//       type: String,
//       trim: true,
//       maxlength: [500, "Bio cannot exceed 500 characters"],
//       default: null,
//     },

//     status: {
//       type: String,
//       enum: {
//         values: ["active", "inactive", "blocked"],
//         message: "Invalid  user status",
//       },
//       default: "active",
//       index: true,
//     },

//     refreshToken: {
//       type: String,
//       default: null,
//       select: false,
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// module.exports = mongoose.model(" user",  userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
      default: null,
    },

    address: {
      type: String,
      trim: true,
      default: null,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: [
          "administration",
          "author",
          "user",
        ],
        message: "Invalid user role",
      },
      default: "user",
      index: true,
    },

    profileImage: {
  url: {
    type: String,
    default: null,
  },

  publicId: {
    type: String,
    default: null,
  },
},

    bio: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Bio cannot exceed 500 characters",
      ],
      default: null,
    },

    favoriteAuthors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

    status: {
      type: String,
      enum: {
        values: [
          "active",
          "inactive",
          "blocked",
        ],
        message: "Invalid user status",
      },
      default: "active",
      index: true,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);