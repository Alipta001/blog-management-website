"use client";

import Link from "next/link";

import {
  FileText,
  MoreHorizontal,
  Trash2,
  User,
} from "lucide-react";

import {
  useState,
} from "react";


interface CommentCardProps {
  comment: any;
}


export default function CommentCard({
  comment,
}: CommentCardProps) {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);


  return (
    <article className="rounded-2xl border border-white/10 bg-[#09090b] p-5 transition hover:border-white/15">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          {/* AVATAR */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">

            <User className="h-5 w-5 text-violet-400" />

          </div>


          {/* USER */}

          <div>

            <h3 className="text-sm font-semibold text-white">
              {comment.user?.name ||
                "Unknown User"}
            </h3>


            <p className="mt-1 text-xs text-slate-500">
              {comment.user?.email ||
                "Anonymous"}
            </p>

          </div>

        </div>


        {/* ACTION MENU */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                !menuOpen,
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
          >

            <MoreHorizontal className="h-5 w-5" />

          </button>


          {menuOpen && (

            <div className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-white/10 bg-[#18181b] p-1 shadow-xl">

              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >

                <Trash2 className="h-4 w-4" />

                Delete Comment

              </button>

            </div>

          )}

        </div>

      </div>


      {/* COMMENT */}

      <div className="mt-5">

        <p className="text-sm leading-7 text-slate-300">
          {comment.content}
        </p>

      </div>


      {/* FOOTER */}

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">

        {/* RELATED BLOG */}

        {comment.blog && (

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <FileText className="h-4 w-4 text-violet-400" />

            <span className="max-w-[280px] truncate">

              {comment.blog.title}

            </span>

          </div>

        )}


        {/* VIEW BLOG */}

        {comment.blog && (

          <Link
            href={`/blog/${comment.blog.slug}`}
            className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
          >
            View Blog →
          </Link>

        )}

      </div>

    </article>
  );
}