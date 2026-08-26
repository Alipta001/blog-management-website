"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MessageSquare,
  Pin,
  Send,
} from "lucide-react";

import type { Comment } from "@/types/comment.types";

interface BlogCommentsProps {
  comments: Comment[];
  loading: boolean;
  authenticated: boolean;
  isAuthor: boolean;
  onLike: (commentId: string) => void;
  onPin: (commentId: string) => void;
  onSubmit: (
    content: string,
    parentComment?: string,
  ) => void;
}

export default function BlogComments({
  comments,
  loading,
  authenticated,
  isAuthor,
  onLike,
  onPin,
  onSubmit,
}: BlogCommentsProps) {
  const [content, setContent] =
    useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

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

  const getParentId = (comment: Comment) =>
    !comment.parentComment
      ? null
      : typeof comment.parentComment === "string"
        ? comment.parentComment
        : comment.parentComment._id;

  const getDepth = (comment: Comment): number => {
    let depth = 0;
    let parentId = getParentId(comment);
    while (parentId && depth < comments.length) {
      const parent = comments.find((item) => item._id === parentId);
      parentId = parent ? getParentId(parent) : null;
      depth += 1;
    }
    return depth;
  };

  const submitReply = (event: React.FormEvent, parentId: string) => {
    event.preventDefault();
    const value = replyContent.trim();
    if (!value) return;
    onSubmit(value, parentId);
    setReplyContent("");
    setReplyTo(null);
  };

  return (
    <section className="space-y-8 blog-comments">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:bg-violet-500/15 dark:text-violet-300">
              <MessageSquare className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Discussion
              </h2>
              <p className="text-sm text-slate-500">
                {comments.length} {comments.length === 1 ? "comment" : "comments"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {authenticated ? (
        <form
          onSubmit={submit}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-gradient-to-br from-white to-violet-50/60
            p-5
            shadow-sm
            dark:border-slate-800
            dark:from-slate-900
            dark:to-violet-950/20
            dark:shadow-none
          "
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Add to the conversation
          </div>
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
              text-slate-900
              dark:text-white
              outline-none
              placeholder:text-slate-400
              dark:placeholder:text-slate-600
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
                dark:text-white
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
            border-slate-200
            bg-white
            p-5
            text-sm
            text-slate-600
            dark:border-slate-800
            dark:bg-slate-900/60
            dark:text-slate-400
          "
        >
          <span>Sign in to join the discussion.</span>
          <Link href="/login" className="ml-2 font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
            Sign in
          </Link>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <MessageSquare className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-700" />

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-500">
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
              const depth = getDepth(comment);
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
                  className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/60 dark:shadow-none ${comment.isPinned ? "border-violet-300 dark:border-violet-500/50" : "border-slate-200 dark:border-slate-800"}`}
                  style={{ marginLeft: `${Math.min(depth, 5) * 24}px` }}
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
                        bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10
                        text-xs
                        font-semibold
                        text-violet-600
                        ring-4
                        ring-violet-500/5
                        dark:text-violet-300
                      "
                    >
                      {initial}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                          {name}
                        </p>
                        <span className="text-xs text-slate-400">
                          {new Date(comment.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                        {comment.isPinned && (
                          <span className="inline-flex items-center gap-1 text-xs text-violet-500">
                            <Pin className="h-3 w-3" /> Pinned
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {comment.content}
                      </p>

                      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => onLike(comment._id)}
                          disabled={!authenticated}
                          title={authenticated ? "Like comment" : "Log in to like comments"}
                          className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${comment.isLiked ? "bg-rose-50 text-rose-500 dark:bg-rose-500/10" : "text-slate-500 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          <Heart className="h-4 w-4" fill={comment.isLiked ? "currentColor" : "none"} />
                          <span>{comment.isLiked ? "Liked" : "Like"}</span>
                          <span className="tabular-nums">{comment.likeCount || 0}</span>
                        </button>
                        {authenticated && (
                          <button type="button" onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-violet-50 hover:text-violet-500 dark:hover:bg-violet-500/10">
                            {replyTo === comment._id ? "Cancel reply" : "Reply"}
                          </button>
                        )}
                        {isAuthor && (
                          <button
                            type="button"
                            onClick={() => onPin(comment._id)}
                            title={comment.isPinned ? "Unpin comment" : "Pin comment"}
                            className={`ml-auto inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${comment.isPinned ? "bg-violet-50 text-violet-500 dark:bg-violet-500/10" : "text-slate-500 hover:bg-violet-50 hover:text-violet-500 dark:hover:bg-violet-500/10"}`}
                          >
                            <Pin className="h-4 w-4" fill={comment.isPinned ? "currentColor" : "none"} />
                            {comment.isPinned ? "Unpin" : "Pin"}
                          </button>
                        )}
                      </div>
                      {replyTo === comment._id && (
                        <form onSubmit={(event) => submitReply(event, comment._id)} className="mt-3 flex gap-2">
                          <input value={replyContent} onChange={(event) => setReplyContent(event.target.value)} maxLength={1000} placeholder="Write a reply..." className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-violet-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
                          <button type="submit" disabled={!replyContent.trim()} className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Send</button>
                        </form>
                      )}
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