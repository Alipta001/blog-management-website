"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearBlogError, deleteBlog, getMyBlogs, submitBlog } from "@/redux/slice/blog/blogSlice";
import type { BlogStatus } from "@/types/blog.types";
import Pagination from "@/components/common/pagination/pagination";
import MyBlogsTable from "./myBlogsTable";
import MyBlogsFilters from "./myBlogsFilters";
import MyBlogsHeader from "./myBlogsHeader";

interface MyBlogsPageContentProps {
  initialStatus?: BlogStatus | "all";
}

export default function MyBlogsPageContent({ initialStatus = "all" }: MyBlogsPageContentProps) {
  const dispatch = useAppDispatch();
  const { myBlogs, myBlogsPagination, loading, error } = useAppSelector((state) => state.blog);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<BlogStatus | "all">(initialStatus);
  const limit = 10;
  const params = { page, limit, ...(status !== "all" ? { status } : {}) };

  useEffect(() => { dispatch(getMyBlogs(params)); }, [dispatch, page, status]);

  const refresh = () => { dispatch(getMyBlogs(params)); };

  const handleSubmit = async (id: string) => {
    try { await dispatch(submitBlog(id)).unwrap(); refresh(); } catch { return; }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try { await dispatch(deleteBlog(id)).unwrap(); refresh(); } catch { return; }
  };

  useEffect(() => () => { if (error) dispatch(clearBlogError()); }, [dispatch, error]);

  return (
    <div className="space-y-6">
      <MyBlogsHeader title={initialStatus === "draft" ? "Draft Blogs" : undefined} description={initialStatus === "draft" ? "Continue editing your unfinished articles." : undefined} />
      <MyBlogsFilters status={status} onStatusChange={(value) => { setStatus(value); setPage(1); }} />
      <MyBlogsTable blogs={myBlogs} loading={loading} error={error} onSubmit={handleSubmit} onDelete={handleDelete} />
      {myBlogsPagination && <div className="flex justify-center"><Pagination pagination={myBlogsPagination} onPageChange={setPage} loading={loading} /></div>}
    </div>
  );
}
