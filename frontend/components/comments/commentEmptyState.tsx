import { MessageSquare } from "lucide-react";

interface CommentEmptyStateProps {
  filtered: boolean;
}

export default function CommentEmptyState({ filtered }: CommentEmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400"><MessageSquare className="h-7 w-7" /></div>
      <h2 className="mt-5 text-lg font-semibold text-white">{filtered ? "No matching comments" : "No comments yet"}</h2>
      <p className="mt-2 text-sm text-slate-500">{filtered ? "Try changing your search or filters." : "Comments will appear here when they are created."}</p>
    </div>
  );
}
