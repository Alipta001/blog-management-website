const multer = require("multer");

// ========================================
// MEMORY STORAGE
// ========================================

const storage = multer.memoryStorage();

// ========================================
// FILE FILTER
// ========================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);

    return;
  }

  cb(new Error("Only image files are allowed"));
};

// ========================================
// MULTER
// ========================================

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,

    files: 11,
  },
});

// ========================================
// BLOG IMAGE UPLOAD
// ========================================

const blogImageUpload = upload.fields([
  {
    name: "featuredImage",

    maxCount: 1,
  },

  {
    name: "contentImages",

    maxCount: 10,
  },
]);

module.exports = {
  upload,

  blogImageUpload,
};
