const { Readable } = require("stream");

const cloudinary = require("../config/cloudinary");


        
// UPLOAD BUFFER TO CLOUDINARY       

const uploadToCloudinary = (
  buffer,
  folder = "blog-management"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,

          resource_type: "image",
        },

        (error, result) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(result);
        }
      );

    Readable.from(buffer).pipe(uploadStream);
  });
};


        
// DELETE IMAGE FROM CLOUDINARY        

const deleteFromCloudinary = (
  publicId
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,

      {
        resource_type: "image",
      },

      (error, result) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(result);
      }
    );
  });
};


module.exports = {
  uploadToCloudinary,

  deleteFromCloudinary,
};