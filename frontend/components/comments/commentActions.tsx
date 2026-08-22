import { Check, EyeOff, X } from "lucide-react";

import type { CommentStatus } from "@/types/comment.types";

interface CommentActionsProps {
  status: CommentStatus;
  onModerate: (status: CommentStatus) => void;
}

export default function CommentActions({ status, onModerate }: CommentActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {status !== "approved" && <button type="button" title="Approve comment" onClick={() => onModerate("approved")} className="rounded-lg p-2 text-emerald-400 hover:bg-emerald-500/10"><Check className="h-4 w-4" /></button>}
      {status !== "rejected" && <button type="button" title="Reject comment" onClick={() => onModerate("rejected")} className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10"><X className="h-4 w-4" /></button>}
      {status !== "hidden" && <button type="button" title="Hide comment" onClick={() => onModerate("hidden")} className="rounded-lg p-2 text-slate-400 hover:bg-white/10"><EyeOff className="h-4 w-4" /></button>}
    </div>
  );
}
