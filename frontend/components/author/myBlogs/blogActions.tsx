"use client";

import Link from "next/link";

import {
  Eye,
  FilePenLine,
  MoreHorizontal,
  Send,
  Trash2,
} from "lucide-react";

import type {
  Blog,
} from "@/types/blog.types";

interface BlogActionsProps {
  blog: Blog;

  onSubmit: (
    id: string
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function BlogActions({
  blog,
  onSubmit,
  onDelete,
}: BlogActionsProps) {

  return (
    <div className="flex items-center justify-end gap-2">

      {/* VIEW */}

      {blog.status === "published" && (

        <Link
          href={`/blog/${blog._id}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
        >

          <Eye className="h-4 w-4" />

        </Link>

      )}


      {/* EDIT */}

      {[
        "draft",
        "rejected",
        "unpublished",
      ].includes(
        blog.status
      ) && (

        <Link
          href={`/dashboard/author/my-blogs/${blog._id}/edit`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-violet-400"
        >

          <FilePenLine className="h-4 w-4" />

        </Link>

      )}


      {/* SUBMIT */}

      {blog.status === "draft" && (

        <button
          onClick={() =>
            onSubmit(
              blog._id
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-400"
          title="Submit for review"
        >

          <Send className="h-4 w-4" />

        </button>

      )}


      {/* DELETE */}

      {[
        "draft",
        "rejected",
      ].includes(
        blog.status
      ) && (

        <button
          onClick={() =>
            onDelete(
              blog._id
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
          title="Delete blog"
        >

          <Trash2 className="h-4 w-4" />

        </button>

      )}

    </div>
  );
}