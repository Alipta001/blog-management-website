import { MessageSquare } from "lucide-react";

interface CommentHeaderProps {
  mode: "author" | "administration";
  total: number;
}

export default function CommentHeader({ mode, total }: CommentHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Comments</h1>
            <p className="mt-1 text-sm text-slate-400">
              {mode === "author"
                ? "Manage comments on your blogs."
                : "Review and moderate all system comments."}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500">{total.toLocaleString()} comments</p>
    </div>
  );
}
