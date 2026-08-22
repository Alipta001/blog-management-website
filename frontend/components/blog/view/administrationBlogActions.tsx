import { Check, EyeOff, Trash2, X } from "lucide-react";
import type { Blog } from "@/types/blog.types";

interface AdministrationBlogActionsProps {
  blog: Blog;
  loading: boolean;
  onPublish: () => void;
  onReject: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
}

export default function AdministrationBlogActions({ blog, loading, onPublish, onReject, onUnpublish, onDelete }: AdministrationBlogActionsProps) {
  return <div className="flex flex-wrap gap-3">
    {(blog.status === "pending" || blog.status === "unpublished") && <><button type="button" disabled={loading} onClick={onPublish} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"><Check className="h-4 w-4" />Publish</button>{blog.status === "pending" && <button type="button" disabled={loading} onClick={onReject} className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 disabled:opacity-50"><X className="h-4 w-4" />Reject</button>}</>}
    {blog.status === "published" && <button type="button" disabled={loading} onClick={onUnpublish} className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 px-4 py-2.5 text-sm text-amber-400 hover:bg-amber-500/10 disabled:opacity-50"><EyeOff className="h-4 w-4" />Unpublish</button>}
    <button type="button" disabled={loading} onClick={onDelete} className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 disabled:opacity-50"><Trash2 className="h-4 w-4" />Delete</button>
  </div>;
}
