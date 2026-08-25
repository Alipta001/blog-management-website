import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";

import type { Blog } from "@/types/blog.types";

interface BlogAuthorCardProps {
  blog: Blog;
}

export default function BlogAuthorCard({
  blog,
}: BlogAuthorCardProps) {
  const author =
    typeof blog.author === "string"
      ? null
      : blog.author;

  if (!author) {
    return null;
  }

  const initials =
    author.name
      ?.split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900/60
        dark:shadow-none
        sm:p-8
      "
    >
      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute
          hidden
          blog-author-decoration
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-violet-500/[0.08]
          blur-3xl
          dark:block
        "
      />

      <div className="relative">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-violet-400
          "
        >
          About the author
        </p>

        <div
          className="
            mt-5
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
          "
        >
          {/* Profile image */}

          {author.profileImage ? (
            <Image
              src={author.profileImage}
              alt={author.name}
              width={80}
              height={80}
              className="
                h-20
                w-20
                shrink-0
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-800
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-violet-200
                bg-violet-50
                text-lg
                font-bold
                text-violet-700
                dark:border-violet-500/20
                dark:bg-violet-500/10
                dark:text-violet-300
              "
            >
              {initials}
            </div>
          )}

          {/* Author information */}

          <div className="min-w-0 flex-1">
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
              "
            >
              <div>
                <h3
                  className="
                    text-xl
                    font-semibold
                    text-slate-950
                    dark:text-white
                  "
                >
                  {author.name}
                </h3>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-500">
                  Author
                </p>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  text-violet-400
                  dark:border-slate-800
                  dark:bg-slate-900/60
                "
              >
                <UserRound className="h-4 w-4" />
              </div>
            </div>

            {author.bio && (
              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {author.bio}
              </p>
            )}

            <button
              type="button"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-violet-700
                transition
                hover:text-violet-800
                dark:text-violet-400
                dark:hover:text-violet-300
              "
            >
              More from this author

              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}