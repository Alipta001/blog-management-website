import type { Blog } from "@/types/blog.types";

interface BlogMetaProps {
  blog: Blog;
}

export default function BlogMeta({
  blog,
}: BlogMetaProps) {
  const author =
    typeof blog.author === "string"
      ? null
      : blog.author;

  const date = blog.createdAt
    ? new Date(
        blog.createdAt,
      ).toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
    : null;

  const initials =
    author?.name
      ?.split(" ")
      .map((part) =>
        part.charAt(0),
      )
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-x-6
        gap-y-4
        border-b
        border-slate-200
        dark:border-slate-800
        pb-7
      "
    >
      {author && (
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-violet-200
              bg-violet-50
              text-xs
              font-semibold
              text-violet-700
              dark:border-violet-500/20
              dark:bg-violet-500/10
              dark:text-violet-300
            "
          >
            {initials}
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Written by
            </p>

            <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
              {author.name}
            </p>
          </div>
        </div>
      )}

      {date && (
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Published
          </p>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            {date}
          </p>
        </div>
      )}

      {blog.readingTime && (
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Reading time
          </p>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            {blog.readingTime} min read
          </p>
        </div>
      )}

      {blog.tags &&
        blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => {
              const name =
                typeof tag === "string"
                  ? tag
                  : tag.name;

              return (
                <span
                  key={name}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-slate-50
                    px-2.5
                    py-1
                    text-xs
                    text-slate-600
                    dark:border-slate-800
                    dark:bg-slate-900/60
                    dark:text-slate-400
                  "
                >
                  #{name}
                </span>
              );
            })}
          </div>
        )}
    </div>
  );
}