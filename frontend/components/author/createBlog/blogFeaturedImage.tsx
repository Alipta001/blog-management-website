"use client";

import {
  ImagePlus,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

interface BlogFeaturedImageProps {
  onChange: (
    file: File | null
  ) => void;
}

export default function BlogFeaturedImage({
  onChange,
}: BlogFeaturedImageProps) {
  const [preview, setPreview] =
    useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    onChange(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreview(objectUrl);
  };

  const removeImage = () => {
    onChange(null);

    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-5">

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Featured Image
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Add one featured image for your blog.
        </p>
      </div>

      {!preview ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center transition hover:border-violet-500/40 hover:bg-white/[0.04]">

          <ImagePlus className="mb-3 h-8 w-8 text-slate-500" />

          <span className="text-sm font-medium text-slate-300">
            Upload featured image
          </span>

          <span className="mt-1 text-xs text-slate-600">
            PNG, JPG or WEBP
          </span>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleChange}
          />

        </label>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-white/10">

          <img
            src={preview}
            alt="Featured image preview"
            className="h-52 w-full object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-500"
          >
            <X className="h-4 w-4" />
          </button>

        </div>
      )}

    </section>
  );
}