"use client";

import {
  Search,
} from "lucide-react";


interface Blog {
  _id: string;
  title: string;
}


interface CommentsFilterProps {
  search: string;

  onSearchChange: (
    value: string
  ) => void;

  selectedBlog: string;

  onBlogChange: (
    value: string
  ) => void;

  blogs: Blog[];
}


export default function CommentsFilter({
  search,
  onSearchChange,
  selectedBlog,
  onBlogChange,
  blogs,
}: CommentsFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#09090b] p-4 lg:flex-row">

      {/* SEARCH */}

      <div className="relative flex-1">

        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value,
            )
          }
          placeholder="Search comments or users..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/50"
        />

      </div>


      {/* BLOG FILTER */}

      <select
        value={selectedBlog}
        onChange={(event) =>
          onBlogChange(
            event.target.value,
          )
        }
        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
      >

        <option
          value="all"
          className="bg-[#18181b]"
        >
          All Blogs
        </option>


        {blogs.map(
          (blog) => (

            <option
              key={blog._id}
              value={blog._id}
              className="bg-[#18181b]"
            >
              {blog.title}
            </option>

          ),
        )}

      </select>

    </div>
  );
}