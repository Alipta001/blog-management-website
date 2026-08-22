"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
} from "lucide-react";

import type { Comment } from "@/types/comment.types";

interface BlogCommentsProps {
  comments: Comment[];
  loading: boolean;
  authenticated: boolean;
  onSubmit: (
    content: string,
  ) => void;
}

export default function BlogComments({
  comments,
  loading,
  authenticated,
  onSubmit,
}: BlogCommentsProps) {
  const [content, setContent] =
    useState("");

  const submit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    const value =
      content.trim();

    if (!value) return;

    onSubmit(value);
    setContent("");
  };

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-violet-400" />

          <h2 className="text-xl font-bold text-white">
            Discussion
          </h2>

          <span className="text-sm text-slate-500">
            ({comments.length})
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Share your thoughts about this article.
        </p>
      </div>

      {authenticated ? (
        <form
          onSubmit={submit}
          className="
            rounded-2xl
            border
            border-white/10
            bg-[#111114]
            p-4
          "
        >
          <textarea
            value={content}
            onChange={(event) =>
              setContent(
                event.target.value,
              )
            }
            rows={3}
            maxLength={1000}
            placeholder="Share your thoughts..."
            className="
              w-full
              resize-none
              bg-transparent
              text-sm
              leading-6
              text-white
              outline-none
              placeholder:text-slate-600
            "
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={
                loading ||
                !content.trim()
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-violet-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-violet-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Send className="h-4 w-4" />
              Post comment
            </button>
          </div>
        </form>
      ) : (
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-[#111114]
            p-5
            text-sm
            text-slate-500
          "
        >
          Login to join the discussion.
        </div>
      )}

      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-slate-700" />

          <p className="mt-3 text-sm text-slate-500">
            No comments yet.
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Be the first to share your thoughts.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map(
            (comment) => {
              const name =
                typeof comment.user ===
                "string"
                  ? "Reader"
                  : comment.user?.name ||
                    "Reader";

              const initial =
                name
                  .charAt(0)
                  .toUpperCase();

              return (
                <article
                  key={comment._id}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111114]
                    p-5
                  "
                >
                  <div className="flex gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-violet-500/10
                        text-xs
                        font-semibold
                        text-violet-400
                      "
                    >
                      {initial}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200">
                        {name}
                      </p>

                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}