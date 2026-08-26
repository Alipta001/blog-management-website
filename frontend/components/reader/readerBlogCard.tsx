import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import type { Blog } from "@/types/blog.types";

interface ReaderBlogCardProps {
  blog: Blog;
  isFavoriteAuthor?: boolean;
  onToggleFavorite?: (authorId: string) => void;
  authenticated?: boolean;
}

export default function ReaderBlogCard({
  blog,
  isFavoriteAuthor = false,
  onToggleFavorite,
  authenticated = false,
}: ReaderBlogCardProps) {
  const image = blog.featuredImage?.url;

  const author =
    typeof blog.author === "string"
      ? "Unknown author"
      : blog.author?.name || "Unknown author";

  const category =
    typeof blog.category === "string"
      ? "Blog"
      : blog.category?.name || "Blog";

  const authorId =
    typeof blog.author === "string" ? null : blog.author?._id;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition
        duration-300
        hover:-translate-y-1
        hover:border-violet-300
        hover:shadow-xl
        hover:shadow-violet-100
        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:border-violet-500/30
        dark:hover:shadow-violet-950/10
        reader-blog-card
      "
    >
      <div>
        {/* IMAGE */}
          <Link href={`/blogs/${blog._id}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
          {image ? (
            <Image
              src={image}
              alt={
                blog.featuredImage?.alt ||
                blog.title
              }
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
              className="
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                bg-slate-100
                text-sm
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              No image available
            </div>
          )}
        </Link>

        {/* CONTENT */}
        <div className="space-y-3 p-5">
          <span
            className="
              inline-flex
              rounded-full
              bg-violet-500/10
              px-2.5
              py-1
              text-xs
              font-medium
              text-violet-600
              dark:text-violet-400
            "
          >
            {category}
          </span>

          <Link href={`/blogs/${blog._id}`}>
          <h2
            className="
              line-clamp-2
              text-lg
              font-semibold
              leading-7
              text-slate-900
              dark:text-white
              transition
              group-hover:text-violet-600
              dark:group-hover:text-violet-300
            "
          >
            {blog.title}
          </h2>
          </Link>

          <p
            className="
              line-clamp-2
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-400
            "
          >
            {blog.description}
          </p>

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-200
              pt-3
              text-xs
              text-slate-500
              dark:border-slate-800
              dark:text-slate-400
            "
          >
            <span>{author}</span>

            <span>
              {new Date(
                blog.createdAt,
              ).toLocaleDateString("en-IN")}
            </span>
          </div>
          {authorId && onToggleFavorite && (
            <button type="button" onClick={() => onToggleFavorite(authorId)} title={authenticated ? "Favourite this author" : "Log in to favourite authors"} className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${isFavoriteAuthor ? "bg-rose-500/10 text-rose-400" : "text-slate-500 hover:bg-rose-500/10 hover:text-rose-400"}`}>
              <Heart className="h-4 w-4" fill={isFavoriteAuthor ? "currentColor" : "none"} />
              {isFavoriteAuthor ? "Favourite" : "Favourite author"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}