import { useState } from "react";
import type { Blog } from "@/types/blog.types";
import AuthorBlogActions from "./authorBlogActions";
import AdministrationBlogActions from "./administrationBlogActions";

interface BlogRoleActionsProps {
  blog: Blog;
  role: "author" | "administration" | "user" | "reader";
  isOwner: boolean;
  loading: boolean;
  onSubmit: () => void;
  onPublish: () => void;
  onReject: (reason: string) => void;
  onUnpublish: () => void;
  onDelete: () => void;
}

export default function BlogRoleActions({ blog, role, isOwner, loading, onSubmit, onPublish, onReject, onUnpublish, onDelete }: BlogRoleActionsProps) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  if (role === "author" && isOwner) return <AuthorBlogActions blog={blog} onSubmit={onSubmit} loading={loading} />;
  if (role !== "administration") return null;
  return <>
    <AdministrationBlogActions blog={blog} loading={loading} onPublish={onPublish} onReject={() => setRejecting(true)} onUnpublish={onUnpublish} onDelete={onDelete} />
    {rejecting && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"><form onSubmit={(event) => { event.preventDefault(); onReject(reason.trim()); setRejecting(false); }} className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6"><h2 className="text-lg font-semibold text-white">Reject blog</h2><textarea required value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Reason for rejection" rows={4} className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white outline-none" /><div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setRejecting(false)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300">Cancel</button><button type="submit" disabled={loading} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">Reject</button></div></form></div>}
  </>;
}
