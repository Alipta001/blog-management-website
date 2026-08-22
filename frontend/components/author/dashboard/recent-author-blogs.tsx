import Link from "next/link";

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
} from "lucide-react";

import type {
  Blog,
  BlogStatus,
} from "@/types/blog.types";


interface RecentAuthorBlogsProps {

  blogs: Blog[];

  loading?: boolean;

}


const statusStyles:
  Record<
    BlogStatus,
    string
  > = {

    draft:
      "bg-slate-500/10 text-slate-400",

    pending:
      "bg-amber-500/10 text-amber-400",

    published:
      "bg-emerald-500/10 text-emerald-400",

    unpublished:
      "bg-orange-500/10 text-orange-400",

    rejected:
      "bg-rose-500/10 text-rose-400",

  };


const formatStatus = (
  status: BlogStatus
) => {

  return status
    .replace(
      /-/g,
      " "
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );

};


const formatDate = (
  date: string
) => {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(
    new Date(date)
  );

};


export default function RecentAuthorBlogs({
  blogs,
  loading = false,
}: RecentAuthorBlogsProps) {


  const recentBlogs =
    [...blogs]
      .sort(
        (a, b) =>
          new Date(
            b.updatedAt
          ).getTime() -
          new Date(
            a.updatedAt
          ).getTime()
      )
      .slice(0, 5);


  return (

    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

        <div>

          <h2 className="font-semibold text-white">

            Recent Blogs

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Your latest writing activity

          </p>

        </div>


        <Link
          href="/dashboard/author/myBlogs"
          className="flex items-center gap-1 text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >

          View all

          <ArrowUpRight className="h-4 w-4" />

        </Link>

      </div>


      {loading ? (

        <div className="space-y-4 p-6">

          {[1, 2, 3, 4].map(
            (item) => (

              <div
                key={item}
                className="flex animate-pulse items-center gap-4"
              >

                <div className="h-11 w-11 rounded-xl bg-white/10" />

                <div className="flex-1 space-y-2">

                  <div className="h-4 w-3/4 rounded bg-white/10" />

                  <div className="h-3 w-1/3 rounded bg-white/5" />

                </div>

              </div>

            )
          )}

        </div>

      ) : recentBlogs.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">

            <BookOpen className="h-6 w-6" />

          </div>


          <h3 className="mt-4 font-semibold text-white">

            No blogs yet

          </h3>


          <p className="mt-2 max-w-sm text-sm text-slate-500">

            Start sharing your ideas and create your first blog.

          </p>


          <Link
            href="/dashboard/author/blogs/create"
            className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300"
          >

            Create your first blog

          </Link>

        </div>

      ) : (

        <div className="divide-y divide-white/5">

          {recentBlogs.map(
            (blog) => (

              <Link
                key={blog._id}
                href={`/dashboard/author/blogs/${blog._id}`}
                className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-white/[0.02]"
              >

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

                    <BookOpen className="h-5 w-5" />

                  </div>


                  <div className="min-w-0">

                    <h3 className="truncate text-sm font-semibold text-slate-200">

                      {blog.title}

                    </h3>


                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">

                      <Clock3 className="h-3.5 w-3.5" />

                      Updated{" "}

                      {formatDate(
                        blog.updatedAt
                      )}

                    </p>

                  </div>

                </div>


                <div className="flex shrink-0 items-center gap-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[
                        blog.status
                      ]
                    }`}
                  >

                    {formatStatus(
                      blog.status
                    )}

                  </span>

                </div>

              </Link>

            )
          )}

        </div>

      )}

    </section>

  );
}