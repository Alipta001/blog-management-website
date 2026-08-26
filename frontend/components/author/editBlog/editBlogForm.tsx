"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogById, updateBlog } from "@/redux/slice/blog/blogSlice";
import { getCategories } from "@/redux/slice/category/categorySlice";
import { getTags } from "@/redux/slice/tag/tagSlice";
import type { CreateBlogFormValues } from "@/types/blog.types";
import type { UpdateBlogPayload } from "@/types/blogRequest.types";

import BlogBasicInfo from "@/components/author/createBlog/blogBasicInfo";
import BlogCategory from "@/components/author/createBlog/blogCategory";
import BlogContentEditor from "@/components/author/createBlog/blogContentEditor";
import BlogFeaturedImage from "@/components/author/createBlog/blogFeaturedImage";
import BlogTags from "@/components/author/createBlog/blogTags";
import CreateBlogHeader from "@/components/author/createBlog/createBlogHeader";

const editBlogSchema: yup.ObjectSchema<CreateBlogFormValues> = yup.object({
  title: yup.string().required("Blog title is required").min(5, "Blog title must contain at least 5 characters").max(200, "Blog title cannot exceed 200 characters"),
  description: yup.string().required("Description is required").max(500, "Description cannot exceed 500 characters"),
  content: yup.string().required("Blog content is required"),
  category: yup.string().required("Category is required"),
});

export default function EditBlogForm({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { selectedBlog, loading: blogLoading, error: blogError, successMessage } = useAppSelector((state) => state.blog);
  const { categories, loading: categoryLoading } = useAppSelector((state) => state.category);
  const { tags, loading: tagLoading } = useAppSelector((state) => state.tag);
  const [selectedTagsOverride, setSelectedTagsOverride] = useState<string[] | null>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [contentImages, setContentImages] = useState<File[]>([]);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<CreateBlogFormValues>({ resolver: yupResolver(editBlogSchema), defaultValues: { title: "", description: "", content: "", category: "" } });

  useEffect(() => {
    dispatch(getBlogById(id));
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedBlog || selectedBlog._id !== id) return;
    reset({ title: selectedBlog.title, description: selectedBlog.description, content: selectedBlog.content, category: typeof selectedBlog.category === "string" ? selectedBlog.category : selectedBlog.category._id });
  }, [id, reset, selectedBlog]);

  const selectedTags = selectedTagsOverride || (selectedBlog?.tags || []).map((tag) => typeof tag === "string" ? tag : tag._id);
  const setSelectedTags = setSelectedTagsOverride;

  const submitEdit = async (data: CreateBlogFormValues) => {
    const payload: UpdateBlogPayload = { id, data: { title: data.title.trim(), description: data.description.trim(), content: data.content, category: data.category, tags: selectedTags, featuredImage, contentImages } };
    await dispatch(updateBlog(payload)).unwrap();
    await dispatch(getBlogById(id));
  };

  if (blogLoading && !selectedBlog) return <div className="rounded-2xl border border-white/10 bg-[#09090b] p-10 text-center text-sm text-slate-400">Loading blog editor...</div>;
  if (!selectedBlog) return <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-sm text-rose-400">{blogError || "Blog not found."}</div>;

  return <form onSubmit={handleSubmit(submitEdit)} className="space-y-6"><CreateBlogHeader title="Edit Blog" description="Update your story and submit it for administration review." onSaveDraft={() => handleSubmit(submitEdit)()} onSubmit={() => handleSubmit(submitEdit)()} isSubmitting={blogLoading} />{blogError && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{blogError}</div>}{successMessage && <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{successMessage}</div>}<div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"><div className="space-y-6"><BlogBasicInfo register={register} errors={errors} /><BlogContentEditor register={register} setValue={setValue} errors={errors} contentImages={contentImages} onContentImagesChange={setContentImages} initialContent={selectedBlog.content} /></div><div className="space-y-6"><BlogCategory register={register} errors={errors} categories={categories} loading={categoryLoading} /><BlogTags tags={tags} selectedTags={selectedTags} onChange={setSelectedTags} loading={tagLoading} /><BlogFeaturedImage onChange={setFeaturedImage} initialPreview={selectedBlog.featuredImage?.url || null} /></div></div></form>;
}
