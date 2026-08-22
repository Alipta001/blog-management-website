
import {
  Eye,
  Heart,
  MessageSquare,
} from "lucide-react";


export interface TopBlog {
  _id: string;

  title: string;

  views: number;

  likes: number;

  comments: number;

  status: string;
}


interface TopBlogsTableProps {
  blogs: TopBlog[];
}


export default function TopBlogsTable({
  blogs,
}: TopBlogsTableProps) {

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#09090b]
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b border-white/10
          px-6 py-5
        "
      >

        <div>

          <h2 className="text-base font-semibold text-white">
            Top Performing Blogs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your content with the highest engagement.
          </p>

        </div>

      </div>


      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b border-white/10">

              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Blog
              </th>

              <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Views
              </th>

              <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Likes
              </th>

              <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Comments
              </th>

              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {blogs.map(
              (
                blog,
                index,
              ) => (

                <tr
                  key={blog._id}
                  className="
                    border-b border-white/[0.06]
                    transition
                    last:border-0
                    hover:bg-white/[0.02]
                  "
                >

                  {/* Blog */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <span
                        className="
                          flex h-8 w-8
                          items-center justify-center
                          rounded-lg
                          bg-violet-500/10
                          text-xs
                          font-semibold
                          text-violet-400
                        "
                      >
                        {index + 1}
                      </span>

                      <p className="max-w-[280px] truncate text-sm font-medium text-white">
                        {blog.title}
                      </p>

                    </div>

                  </td>


                  {/* Views */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-2 text-slate-400">

                      <Eye className="h-4 w-4" />

                      <span className="text-sm">
                        {blog.views.toLocaleString()}
                      </span>

                    </div>

                  </td>


                  {/* Likes */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-2 text-slate-400">

                      <Heart className="h-4 w-4" />

                      <span className="text-sm">
                        {blog.likes.toLocaleString()}
                      </span>

                    </div>

                  </td>


                  {/* Comments */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-2 text-slate-400">

                      <MessageSquare className="h-4 w-4" />

                      <span className="text-sm">
                        {blog.comments.toLocaleString()}
                      </span>

                    </div>

                  </td>


                  {/* Status */}

                  <td className="px-6 py-4 text-right">

                    <span
                      className="
                        inline-flex
                        rounded-full
                        border border-emerald-500/20
                        bg-emerald-500/10
                        px-3 py-1
                        text-xs
                        font-medium
                        capitalize
                        text-emerald-400
                      "
                    >
                      {blog.status}
                    </span>

                  </td>

                </tr>

              ),
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}
