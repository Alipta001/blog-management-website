import { Search, X } from "lucide-react";

import type { Blog } from "@/types/blog.types";
import type { CommentStatus } from "@/types/comment.types";

interface CommentFiltersProps {
  search: string;
  status: CommentStatus | "";
  blogId: string;
  blogs: Blog[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CommentStatus | "") => void;
  onBlogChange: (value: string) => void;
  onClear: () => void;
}

export default function CommentFilters({
  search,
  status,
  blogId,
  blogs,
  onSearchChange,
  onStatusChange,
  onBlogChange,
  onClear,
}: CommentFiltersProps) {
  const active = Boolean(search || status || blogId);

  return (
    <div className="flex flex-col gap-3 border-b border-white/10 p-5 xl:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search comments, users, or blogs..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/50"
        />
      </div>
      <select value={status} onChange={(event) => onStatusChange(event.target.value as CommentStatus | "")} className="rounded-xl border border-white/10 bg-[#111114] px-4 py-2.5 text-sm text-slate-300 outline-none">
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="hidden">Hidden</option>
      </select>
      <select value={blogId} onChange={(event) => onBlogChange(event.target.value)} className="rounded-xl border border-white/10 bg-[#111114] px-4 py-2.5 text-sm text-slate-300 outline-none">
        <option value="">All Blogs</option>
        {blogs.map((blog) => <option key={blog._id} value={blog._id}>{blog.title}</option>)}
      </select>
      {active && (
        <button type="button" onClick={onClear} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 hover:text-white">
          <X className="h-4 w-4" /> Clear
        </button>
      )}
    </div>
  );
}
