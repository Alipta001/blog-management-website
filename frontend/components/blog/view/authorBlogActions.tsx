import Link from "next/link";
import { FilePenLine, Send } from "lucide-react";
import type { Blog } from "@/types/blog.types";

interface AuthorBlogActionsProps { blog: Blog; onSubmit: () => void; loading: boolean; }

export default function AuthorBlogActions({ blog, onSubmit, loading }: AuthorBlogActionsProps) {
  const canSubmit = blog.status === "draft" || blog.status === "rejected";
  return <div className="flex flex-wrap gap-3">
    {canSubmit && <Link href={`/dashboard/author/my-blogs/${blog._id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"><FilePenLine className="h-4 w-4" />Edit</Link>}
    {canSubmit && <button type="button" onClick={onSubmit} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50"><Send className="h-4 w-4" />{blog.status === "rejected" ? "Resubmit" : "Submit for review"}</button>}
  </div>;
}
