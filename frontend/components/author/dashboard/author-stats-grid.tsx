import type {
  Blog,
} from "@/types/blog.types";

import {
  BookOpen,
  FileClock,
  FilePenLine,
  Send,
} from "lucide-react";

import AuthorStatCard from "./author-stat-card";


interface AuthorStatsGridProps {

  blogs: Blog[];

  loading?: boolean;

}


export default function AuthorStatsGrid({
  blogs,
  loading = false,
}: AuthorStatsGridProps) {


  const totalBlogs =
    blogs.length;


  const publishedBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "published"
    ).length;


  const draftBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "draft"
    ).length;


  const pendingBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "pending"
    ).length;


  return (

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

      <AuthorStatCard
        title="Total Blogs"
        value={totalBlogs}
        description="All your created content"
        loading={loading}
        icon={
          <BookOpen className="h-6 w-6" />
        }
      />


      <AuthorStatCard
        title="Published"
        value={publishedBlogs}
        description="Live and visible to readers"
        loading={loading}
        icon={
          <Send className="h-6 w-6" />
        }
      />


      <AuthorStatCard
        title="Drafts"
        value={draftBlogs}
        description="Continue writing anytime"
        loading={loading}
        icon={
          <FilePenLine className="h-6 w-6" />
        }
      />


      <AuthorStatCard
        title="Pending Review"
        value={pendingBlogs}
        description="Waiting for approval"
        loading={loading}
        icon={
          <FileClock className="h-6 w-6" />
        }
      />

    </section>

  );
}