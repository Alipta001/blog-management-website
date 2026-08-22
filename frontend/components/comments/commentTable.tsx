import Link from "next/link";
import { CalendarDays, MessageSquare, User } from "lucide-react";

import type { Comment } from "@/types/comment.types";
import CommentActions from "./commentActions";

interface CommentTableProps {
  comments: Comment[];
  administration: boolean;
  onModerate: (id: string, status: Comment["status"]) => void;
}

const getName = (value: Comment["user"] | Comment["blog"], fallback: string) =>
  typeof value === "string" ? fallback : value?.name || value?.title || fallback;

export default function CommentTable({ comments, administration, onModerate }: CommentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead className="border-b border-white/10 bg-white/[0.02]">
          <tr>
            {(["Comment", "Author", "Blog", "Status", "Date", "Actions"] as const).map((heading) => (
              <th key={heading} className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {comments.map((comment) => (
            <tr key={comment._id} className="transition hover:bg-white/[0.02]">
              <td className="max-w-[280px] px-5 py-4 align-top">
                <div className="flex gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <p className="line-clamp-2 text-sm leading-6 text-slate-300">{comment.content}</p>
                </div>
              </td>
              <td className="px-5 py-4 align-top">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{getName(comment.user, "Unknown user")}</span>
                </div>
              </td>
              <td className="max-w-[190px] px-5 py-4 align-top">
                {typeof comment.blog === "string" ? <span className="text-sm text-slate-500">Unknown blog</span> : comment.blog ? <Link href={`/blog/${comment.blog.slug}`} className="line-clamp-2 text-sm text-violet-400 hover:text-violet-300">{comment.blog.title}</Link> : <span className="text-sm text-slate-500">Deleted blog</span>}
              </td>
              <td className="px-5 py-4 align-top"><span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs capitalize text-slate-300">{comment.status}</span></td>
              <td className="px-5 py-4 align-top"><div className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="h-3.5 w-3.5" />{new Date(comment.createdAt).toLocaleDateString()}</div></td>
              <td className="px-5 py-4 align-top">{administration && <CommentActions status={comment.status} onModerate={(status) => onModerate(comment._id, status)} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
