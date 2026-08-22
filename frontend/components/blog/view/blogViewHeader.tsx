import type { Blog } from "@/types/blog.types";

interface BlogViewHeaderProps {
  blog: Blog;
}

export default function BlogViewHeader({
  blog,
}: BlogViewHeaderProps) {
  const category =
    typeof blog.category === "string"
      ? "Blog"
      : blog.category?.name || "Blog";

  return (
    <header>
      <div className="mb-5 flex items-center gap-3">
        <span
          className="
            rounded-full
            border
            border-violet-500/20
            bg-violet-500/10
            px-3
            py-1.5
            text-xs
            font-medium
            text-violet-300
          "
        >
          {category}
        </span>

        {blog.status && (
          <span className="text-xs text-slate-600">
            {blog.status === "published"
              ? "Published"
              : blog.status}
          </span>
        )}
      </div>

      <h1
        className="
          max-w-5xl
          text-3xl
          font-bold
          leading-[1.12]
          tracking-tight
          text-white
          sm:text-4xl
          lg:text-5xl
        "
      >
        {blog.title}
      </h1>

      {blog.description && (
        <p
          className="
            mt-6
            max-w-4xl
            text-base
            leading-7
            text-slate-400
            sm:text-lg
            sm:leading-8
          "
        >
          {blog.description}
        </p>
      )}
    </header>
  );
}