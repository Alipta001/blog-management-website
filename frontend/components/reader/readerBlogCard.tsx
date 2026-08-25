import Image from "next/image";
import Link from "next/link";

import type { Blog } from "@/types/blog.types";

interface ReaderBlogCardProps {
  blog: Blog;
}

export default function ReaderBlogCard({
  blog,
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

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#111114]
        transition
        duration-300
        hover:-translate-y-1
        hover:border-violet-500/30
        hover:shadow-xl
        hover:shadow-violet-950/10
        reader-blog-card
      "
    >
      <Link href={`/dashboard/reader/blogs/${blog._id}`}>
        {/* IMAGE */}
        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
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
                bg-white/[0.02]
                text-sm
                text-slate-600
              "
            >
              No image available
            </div>
          )}
        </div>

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
              text-violet-400
            "
          >
            {category}
          </span>

          <h2
            className="
              line-clamp-2
              text-lg
              font-semibold
              leading-7
              text-white
              transition
              group-hover:text-violet-300
            "
          >
            {blog.title}
          </h2>

          <p
            className="
              line-clamp-2
              text-sm
              leading-6
              text-slate-400
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
              border-white/[0.06]
              pt-3
              text-xs
              text-slate-500
            "
          >
            <span>{author}</span>

            <span>
              {new Date(
                blog.createdAt,
              ).toLocaleDateString("en-IN")}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}