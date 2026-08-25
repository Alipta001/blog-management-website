import type { Blog } from "@/types/blog.types";

import ReaderBlogCard from "./readerBlogCard";

interface ReaderBlogGridProps {
  blogs: Blog[];
  loading: boolean;
  favoriteAuthors?: string[];
  authenticated?: boolean;
  onToggleFavorite?: (authorId: string) => void;
}

export default function ReaderBlogGrid({
  blogs,
  loading,
  favoriteAuthors = [],
  authenticated = false,
  onToggleFavorite,
}: ReaderBlogGridProps) {
  if (loading) {
    return (
      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#111114]
              "
            >
              <div className="aspect-[16/9] animate-pulse bg-white/[0.05]" />

              <div className="space-y-3 p-5">
                <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />

                <div className="h-5 w-full animate-pulse rounded bg-white/[0.06]" />

                <div className="h-4 w-4/5 animate-pulse rounded bg-white/[0.06]" />

                <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
              </div>
            </div>
          ),
        )}
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-[#111114]
          p-12
          text-center
        "
      >
        <p className="text-sm text-slate-500">
          No published blogs found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {blogs.map((blog) => (
        <ReaderBlogCard
          key={blog._id}
          blog={blog}
          isFavoriteAuthor={typeof blog.author !== "string" && favoriteAuthors.includes(blog.author._id)}
          authenticated={authenticated}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}