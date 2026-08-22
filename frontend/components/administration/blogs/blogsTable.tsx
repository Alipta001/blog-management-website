"use client";

import {
Eye,
Loader2,
} from "lucide-react";

import type {
Blog,
} from "@/types/blog.types";

import BlogStatusBadge from "./blogStatusBadge";

import BlogActions from "./blogActions";

interface BlogsTableProps {

blogs:
Blog[];

loading:
boolean;

onPublish:
(
id: string,
) => void;

onReject:
(
id: string,
rejectionReason: string,
) => void;

onUnpublish:
(
id: string,
) => void;

onDelete:
(
id: string,
) => void;

onView:
(
id: string,
) => void;

}

export default function BlogsTable({
blogs,
loading,
onPublish,
onReject,
onUnpublish,
onDelete,
onView,
}: BlogsTableProps) {

if (loading) {

return (

  <div className="flex min-h-[400px] items-center justify-center">

    <Loader2 className="h-7 w-7 animate-spin text-violet-400" />

  </div>

);

}

if (!blogs.length) {

return (

  <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

    <div className="rounded-2xl bg-white/[0.03] p-4">

      <Eye className="h-7 w-7 text-slate-500" />

    </div>

    <h3 className="mt-4 text-base font-semibold text-white">
      No blogs found
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Try changing your search or filter criteria.
    </p>

  </div>

);

}

return (

<div className="overflow-x-auto">

  <table className="w-full min-w-[1000px]">

    {/* TABLE HEADER */}

    <thead>

      <tr className="border-b border-white/10 bg-white/[0.02]">

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Blog
        </th>

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Author
        </th>

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Category
        </th>

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Views
        </th>

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Status
        </th>

        <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Created
        </th>

        <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Actions
        </th>

      </tr>

    </thead>


    {/* TABLE BODY */}

    <tbody>

      {blogs.map((blog) => {

        const author =
          typeof blog.author === "object"
            ? blog.author
            : null;


        const category =
          typeof blog.category === "object"
            ? blog.category
            : null;


        const authorName =
          author?.name ||
          "Unknown Author";


        const categoryName =
          category?.name ||
          "Uncategorized";


        return (

          <tr
            key={blog._id}
            className="
              border-b
              border-white/[0.06]
              transition
              hover:bg-white/[0.025]
            "
          >

            {/* BLOG */}

            <td className="px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-semibold text-violet-400">

                  {blog.title.charAt(0).toUpperCase()}

                </div>


                <div className="max-w-[280px]">

                  <p className="truncate text-sm font-medium text-white">

                    {blog.title}

                  </p>

                  <p className="mt-1 text-xs text-slate-500">

                    Blog article

                  </p>

                </div>

              </div>

            </td>


            {/* AUTHOR */}

            <td className="px-6 py-4">

              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-slate-400">

                  {authorName
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <span className="text-sm text-slate-300">

                  {authorName}

                </span>

              </div>

            </td>


            {/* CATEGORY */}

            <td className="px-6 py-4">

              <span className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400">

                {categoryName}

              </span>

            </td>


            {/* VIEWS */}

            <td className="px-6 py-4">

              <div className="flex items-center gap-2 text-sm text-slate-400">

                <Eye className="h-4 w-4 text-slate-600" />

                {(blog.views || 0).toLocaleString()}

              </div>

            </td>


            {/* STATUS */}

            <td className="px-6 py-4">

              <BlogStatusBadge
                status={blog.status}
              />

            </td>


            {/* CREATED DATE */}

            <td className="px-6 py-4">

              <span className="text-sm text-slate-500">

                {new Date(
                  blog.createdAt,
                ).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )}

              </span>

            </td>


            {/* ACTIONS */}

            <td className="px-6 py-4">

              <BlogActions

                status={blog.status}

                loading={loading}

                onView={() =>
                  onView(
                    blog._id,
                  )
                }

                onPublish={() =>
                  onPublish(
                    blog._id,
                  )
                }

                onReject={(
                  rejectionReason,
                ) =>
                  onReject(
                    blog._id,
                    rejectionReason,
                  )
                }

                onUnpublish={() =>
                  onUnpublish(
                    blog._id,
                  )
                }

                onDelete={() =>
                  onDelete(
                    blog._id,
                  )
                }

              />

            </td>

          </tr>

        );

      })}

    </tbody>

  </table>

</div>


);

}
