"use client";

import { useEffect, useState } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  yupResolver,
} from "@hookform/resolvers/yup";

import * as yup from "yup";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import type {
  CreateBlogFormValues,
} from "@/types/blog.types";

import type {
  CreateBlogPayload,
} from "@/types/blogRequest.types";

import BlogBasicInfo from "./blogBasicInfo";
import BlogContentEditor from "./blogContentEditor";
import BlogPublishing from "./blogPublishing";
import BlogCategory from "./blogCategory";
import BlogTags from "./blogTags";
import BlogFeaturedImage from "./blogFeaturedImage";
import CreateBlogHeader from "./createBlogHeader";

import {
  getCategories,
} from "@/redux/slice/category/categorySlice";

import {
  getTags,
} from "@/redux/slice/tag/tagSlice";

import {
  clearBlogError,
  clearBlogSuccessMessage,
  createBlog,
  submitBlog,
} from "@/redux/slice/blog/blogSlice";


// =================================
// VALIDATION
// =================================

const createBlogSchema = yup.object({
  title: yup
    .string()
    .required("Blog title is required")
    .min(
      5,
      "Blog title must contain at least 5 characters",
    )
    .max(
      200,
      "Blog title cannot exceed 200 characters",
    ),

  description: yup
    .string()
    .required("Description is required")
    .max(
      500,
      "Description cannot exceed 500 characters",
    ),

  content: yup
    .string()
    .required("Blog content is required"),

  category: yup
    .string()
    .required("Category is required"),
});


// =================================
// COMPONENT
// =================================

export default function CreateBlogForm() {
  const dispatch = useAppDispatch();


  // =================================
  // FEATURED IMAGE
  // =================================

  const [
    featuredImage,
    setFeaturedImage,
  ] = useState<File | null>(null);


  // =================================
  // CONTENT IMAGES
  // =================================

  const [
    contentImages,
    setContentImages,
  ] = useState<File[]>([]);


  // =================================
  // TAGS
  // =================================

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<string[]>([]);


  // =================================
  // REDUX STATE
  // =================================

  const {
    loading: blogLoading,
    error: blogError,
    successMessage,
  } = useAppSelector(
    (state) => state.blog,
  );


  const {
    categories,
    loading: categoryLoading,
  } = useAppSelector(
    (state) => state.category,
  );


  const {
    tags,
    loading: tagLoading,
  } = useAppSelector(
    (state) => state.tag,
  );


  // =================================
  // FORM
  // =================================

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    },
  } = useForm<CreateBlogFormValues>({
    resolver: yupResolver(
      createBlogSchema,
    ),

    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
    },
  });


  // =================================
  // LOAD DATA
  // =================================

  useEffect(() => {
    dispatch(
      getCategories(),
    );

    dispatch(
      getTags(),
    );

    return () => {
      dispatch(
        clearBlogError(),
      );

      dispatch(
        clearBlogSuccessMessage(),
      );
    };
  }, [dispatch]);


 // =================================
// BUILD BLOG PAYLOAD
// =================================

const buildBlogPayload = (
  data: CreateBlogFormValues,
): CreateBlogPayload => {
  return {
    title: data.title.trim(),

    description: data.description.trim(),

    content: data.content,

    category: data.category,

    tags: selectedTags,

    featuredImage,

    contentImages,
  };
};


// =================================
// SAVE DRAFT
// =================================

const onSaveDraft = async (
  data: CreateBlogFormValues,
) => {
  try {

    const payload =
      buildBlogPayload(data);

    const result =
      await dispatch(
        createBlog(payload),
      ).unwrap();

    console.log(
      "Draft created:",
      result.blog,
    );

  } catch (error) {

    console.error(
      "Create draft failed:",
      error,
    );

  }
};


// =================================
// CREATE + SUBMIT BLOG
// =================================

const onSubmit = async (
  data: CreateBlogFormValues,
) => {
  try {

    const payload =
      buildBlogPayload(data);

    const result =
      await dispatch(
        createBlog(payload),
      ).unwrap();

    const createdBlog =
      result.blog;

    await dispatch(
      submitBlog(
        createdBlog._id,
      ),
    ).unwrap();

    console.log(
      "Blog submitted successfully",
    );

  } catch (error) {

    console.error(
      "Blog submission failed:",
      error,
    );

  }
};


  // =================================
  // RENDER
  // =================================

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="space-y-6"
    >
      {/* =============================
          HEADER
      ============================= */}

      <CreateBlogHeader
        onSaveDraft={() =>
          handleSubmit(
            onSaveDraft,
          )()
        }
        onSubmit={() =>
          handleSubmit(
            onSubmit,
          )()
        }
        isSubmitting={
          blogLoading
        }
      />


      {/* =============================
          ERROR
      ============================= */}

      {blogError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {blogError}
        </div>
      )}


      {/* =============================
          SUCCESS
      ============================= */}

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {successMessage}
        </div>
      )}


      {/* =============================
          MAIN CONTENT
      ============================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="space-y-6">

          <BlogBasicInfo
            register={register}
            errors={errors}
          />

          <BlogContentEditor
            register={register}
            errors={errors}
            contentImages={
              contentImages
            }
            onContentImagesChange={
              setContentImages
            }
          />

        </div>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="space-y-6">

          <BlogPublishing />

          <BlogCategory
            register={register}
            errors={errors}
            categories={
              categories
            }
            loading={
              categoryLoading
            }
          />

          <BlogTags
            tags={tags}
            selectedTags={
              selectedTags
            }
            onChange={
              setSelectedTags
            }
            loading={
              tagLoading
            }
          />

          <BlogFeaturedImage
            onChange={
              setFeaturedImage
            }
          />

        </div>

      </div>
    </form>
  );
}