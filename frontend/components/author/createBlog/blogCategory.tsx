"use client";

import {
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import type {
  CreateBlogFormValues,
} from "@/types/blog.types";

interface Category {
  _id: string;

  name: string;
}

interface BlogCategoryProps {
  register: UseFormRegister<CreateBlogFormValues>;

  errors: FieldErrors<CreateBlogFormValues>;

  categories: Category[];

  loading?: boolean;
}

export default function BlogCategory({
  register,
  errors,
  categories,
  loading = false,
}: BlogCategoryProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Category
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Choose a category for your blog.
        </p>
      </div>

      <select
        {...register("category")}
        disabled={loading}
        className="h-11 w-full rounded-xl border border-white/10 bg-[#111113] px-3 text-sm text-white outline-none focus:border-violet-500/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">
          {loading
            ? "Loading categories..."
            : "Select category"}
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

      {errors.category && (
        <p className="mt-2 text-xs text-red-400">
          {errors.category.message}
        </p>
      )}
    </section>
  );
}