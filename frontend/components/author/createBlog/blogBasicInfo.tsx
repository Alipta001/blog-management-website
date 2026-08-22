"use client";

import {
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import type {
  CreateBlogFormValues,
} from "@/types/blog.types";

interface BlogBasicInfoProps {
  register: UseFormRegister<CreateBlogFormValues>;

  errors: FieldErrors<CreateBlogFormValues>;
}

export default function BlogBasicInfo({
  register,
  errors,
}: BlogBasicInfoProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add the basic information about your blog.
        </p>
      </div>

      <div className="space-y-5">
        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Blog Title
          </label>

          <input
            {...register("title")}
            placeholder="Enter your blog title"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50 focus:bg-white/[0.05]"
          />

          {errors.title && (
            <p className="mt-2 text-xs text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            placeholder="Write a short description..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50 focus:bg-white/[0.05]"
          />

          {errors.description && (
            <p className="mt-2 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}