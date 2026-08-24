"use client";

import {
  ImagePlus,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import type {
  CreateBlogFormValues,
} from "@/types/blog.types";

interface BlogContentEditorProps {
  register: UseFormRegister<CreateBlogFormValues>;

  errors: FieldErrors<CreateBlogFormValues>;

  contentImages: File[];

  onContentImagesChange: (
    files: File[]
  ) => void;
}

export default function BlogContentEditor({
  register,
  errors,
  contentImages,
  onContentImagesChange,
}: BlogContentEditorProps) {

  const [
    previews,
    setPreviews,
  ] = useState<string[]>([]);

   
  // HANDLE IMAGE SELECTION
   

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files =
      Array.from(
        event.target.files || [],
      );

    if (!files.length) {
      return;
    }

    onContentImagesChange([
      ...contentImages,
      ...files,
    ]);

    event.target.value = "";
  };

   
  // REMOVE IMAGE
   

  const removeImage = (
    index: number,
  ) => {
    const updatedFiles =
      contentImages.filter(
        (_, fileIndex) =>
          fileIndex !== index,
      );

    onContentImagesChange(
      updatedFiles,
    );
  };

   
  // CREATE PREVIEWS
   

  useEffect(() => {

    const urls =
      contentImages.map(
        (file) =>
          URL.createObjectURL(file),
      );

    setPreviews(urls);

    return () => {
      urls.forEach(
        (url) =>
          URL.revokeObjectURL(url),
      );
    };

  }, [contentImages]);

   
  // RENDER
   

  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-base font-semibold text-white">
          Blog Content
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Write the complete content of your blog.
        </p>

      </div>

      {/* CONTENT */}

      <textarea
        {...register("content")}
        rows={18}
        placeholder="Start writing your blog..."
        className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50 focus:bg-white/[0.05]"
      />

      {errors.content && (
        <p className="mt-2 text-xs text-red-400">
          {errors.content.message}
        </p>
      )}

      {/*                             =====
          CONTENT IMAGES
                                  ===== */}

      <div className="mt-6">

        <div className="mb-3">

          <h3 className="text-sm font-semibold text-white">
            Content Images
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Upload images that will be used inside your blog content.
          </p>

        </div>

        {/* UPLOAD */}

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center transition hover:border-violet-500/40 hover:bg-white/[0.04]">

          <ImagePlus className="mb-3 h-7 w-7 text-slate-500" />

          <span className="text-sm font-medium text-slate-300">
            Upload content images
          </span>

          <span className="mt-1 text-xs text-slate-600">
            You can select multiple PNG, JPG or WEBP images
          </span>

          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={
              handleImageChange
            }
          />

        </label>

        {/* PREVIEWS */}

        {contentImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

            {contentImages.map(
              (file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-white/10"
                >

                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>

                </div>
              ),
            )}

          </div>
        )}

      </div>

    </section>
  );
}