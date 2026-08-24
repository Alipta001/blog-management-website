import type {
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/types/blogRequest.types";


 
// CREATE BLOG FORM DATA
 

export const createBlogFormData = (
  data: CreateBlogPayload,
) => {
  const formData = new FormData();

  //                             ===
  // TEXT FIELDS
  //                             ===

  formData.append(
    "title",
    data.title,
  );

  formData.append(
    "description",
    data.description,
  );

  formData.append(
    "content",
    data.content,
  );

  formData.append(
    "category",
    data.category,
  );

  //                             ===
  // TAGS
  //                             ===

  data.tags?.forEach(
    (tagId) => {
      formData.append(
        "tags",
        tagId,
      );
    },
  );

  //                             ===
  // FEATURED IMAGE
  //                             ===

  if (data.featuredImage) {
    formData.append(
      "featuredImage",
      data.featuredImage,
    );
  }

  //                             ===
  // CONTENT IMAGES
  //                             ===

  data.contentImages?.forEach(
    (image) => {
      formData.append(
        "contentImages",
        image,
      );
    },
  );

  //                             ===
  // STATUS
  //                             ===

  if (data.status) {
    formData.append(
      "status",
      data.status,
    );
  }

  return formData;
};


 
// UPDATE BLOG FORM DATA
 

export const updateBlogFormData = (
  data: UpdateBlogPayload["data"],
) => {
  const formData = new FormData();

  if (data.title !== undefined) {
    formData.append(
      "title",
      data.title,
    );
  }

  if (data.description !== undefined) {
    formData.append(
      "description",
      data.description,
    );
  }

  if (data.content !== undefined) {
    formData.append(
      "content",
      data.content,
    );
  }

  if (data.category !== undefined) {
    formData.append(
      "category",
      data.category,
    );
  }

  if (data.tags) {
    data.tags.forEach(
      (tagId) => {
        formData.append(
          "tags",
          tagId,
        );
      },
    );
  }

  if (data.featuredImage) {
    formData.append(
      "featuredImage",
      data.featuredImage,
    );
  }

  if (data.contentImages) {
    data.contentImages.forEach(
      (image) => {
        formData.append(
          "contentImages",
          image,
        );
      },
    );
  }

  return formData;
};