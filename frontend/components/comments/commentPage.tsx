"use client";

import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCommentError,
  clearCommentSuccessMessage,
  getAllCommentsForAdministration,
  getCommentsForAuthor,
  moderateComment,
} from "@/redux/slice/comment/commentSlice";
import type { Blog } from "@/types/blog.types";
import type { CommentStatus } from "@/types/comment.types";

import CommentEmptyState from "./commentEmptyState";
import CommentFilters from "./commentFilters";
import CommentHeader from "./commentHeader";
import CommentStats from "./commentStats";
import CommentTable from "./commentTable";

interface CommentPageProps {
  mode: "author" | "administration";
}

export default function CommentPage({ mode }: CommentPageProps) {
  const dispatch = useAppDispatch();
  const { comments, pagination, loading, error } = useAppSelector((state) => state.comment);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CommentStatus | "">("");
  const [blogId, setBlogId] = useState("");

  useEffect(() => {
    const params = { page, limit: 10, ...(status ? { status } : {}) };
    if (mode === "author") {
      dispatch(getCommentsForAuthor(params));
    } else {
      dispatch(getAllCommentsForAdministration(params));
    }

    return () => {
      dispatch(clearCommentError());
      dispatch(clearCommentSuccessMessage());
    };
  }, [dispatch, mode, page, status]);

  const blogs = useMemo(() => {
    const uniqueBlogs = new Map<string, Blog>();
    comments.forEach((comment) => {
      if (typeof comment.blog !== "string" && comment.blog) uniqueBlogs.set(comment.blog._id, comment.blog);
    });
    return Array.from(uniqueBlogs.values());
  }, [comments]);

  const filteredComments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return comments.filter((comment) => {
      const userName = typeof comment.user === "string" ? "" : comment.user?.name || "";
      const blogTitle = typeof comment.blog === "string" ? "" : comment.blog?.title || "";
      return (!query || [comment.content, userName, blogTitle].some((value) => value.toLowerCase().includes(query))) &&
        (!blogId || (typeof comment.blog !== "string" && comment.blog?._id === blogId));
    });
  }, [comments, search, blogId]);

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setBlogId("");
    setPage(1);
  };

  const handleModerate = (id: string, nextStatus: CommentStatus) => {
    dispatch(moderateComment({ id, status: nextStatus }));
  };

  return (
    <div className="space-y-6">
      <CommentHeader mode={mode} total={pagination?.total || comments.length} />
      <CommentStats comments={comments} />
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">
        <CommentFilters search={search} status={status} blogId={blogId} blogs={blogs} onSearchChange={setSearch} onStatusChange={(value) => { setStatus(value); setPage(1); }} onBlogChange={setBlogId} onClear={clearFilters} />
        {error && <div className="mx-5 mt-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</div>}
        {loading ? <div className="p-10 text-center text-sm text-slate-400">Loading comments...</div> : filteredComments.length === 0 ? <CommentEmptyState filtered={Boolean(search || status || blogId)} /> : <CommentTable comments={filteredComments} administration={mode === "administration"} onModerate={handleModerate} />}
        {pagination && pagination.totalPages > 1 && <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-slate-400"><span>Page {pagination.page} of {pagination.totalPages}</span><div className="flex gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-white/10 px-3 py-2 disabled:opacity-40">Previous</button><button type="button" disabled={page >= pagination.totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-white/10 px-3 py-2 disabled:opacity-40">Next</button></div></div>}
      </section>
    </div>
  );
}
