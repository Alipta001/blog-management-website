import {
  CalendarDays,
  FileText,
} from "lucide-react";

import type {
  Blog,
} from "@/types/blog.types";

import BlogStatusBadge from "./blogStatusBadge";
import BlogActions from "./blogActions";

interface MyBlogsTableProps {
  blogs: Blog[];

  loading: boolean;

  error: string | null;

  onSubmit: (
    id: string
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function MyBlogsTable({
  blogs,
  loading,
  error,
  onSubmit,
  onDelete,
}: MyBlogsTableProps) {

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111114] p-10 text-center text-sm text-slate-400">

        Loading your blogs...

      </div>
    );
  }


  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-sm text-rose-400">

        {error}

      </div>
    );
  }


  if (blogs.length === 0) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111114] p-10 text-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">

          <FileText className="h-7 w-7" />

        </div>

        <h3 className="mt-5 text-lg font-semibold text-white">

          No blogs found

        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">

          You haven't created any blogs in this category yet.

        </p>

      </div>
    );
  }


  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px]">

          <thead>

            <tr className="border-b border-white/10 bg-white/[0.02]">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                Blog

              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                Category

              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                Status

              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                Created

              </th>


              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">

                Actions

              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-white/5">

            {blogs.map(
              (blog) => {

                const categoryName =
                  typeof blog.category ===
                  "string"
                    ? "Uncategorized"
                    : blog.category.name;


                return (

                  <tr
                    key={blog._id}
                    className="transition hover:bg-white/[0.02]"
                  >

                    {/* BLOG */}

                    <td className="max-w-md px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

                          <FileText className="h-5 w-5" />

                        </div>


                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-semibold text-slate-200">

                            {blog.title}

                          </h3>


                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">

                            {blog.description}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-400">

                        {categoryName}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <BlogStatusBadge
                        status={
                          blog.status
                        }
                      />

                    </td>


                    {/* CREATED */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <CalendarDays className="h-4 w-4" />

                        {new Intl.DateTimeFormat(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        ).format(
                          new Date(
                            blog.createdAt
                          )
                        )}

                      </div>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <BlogActions
                        blog={blog}
                        onSubmit={
                          onSubmit
                        }
                        onDelete={
                          onDelete
                        }
                      />

                    </td>

                  </tr>

                );
              }
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}