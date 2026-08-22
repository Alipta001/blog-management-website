import { CheckCircle2, Clock3, MessageSquare, XCircle } from "lucide-react";

import type { Comment } from "@/types/comment.types";

interface CommentStatsProps {
  comments: Comment[];
}

export default function CommentStats({ comments }: CommentStatsProps) {
  const stats = [
    { label: "Total", value: comments.length, icon: MessageSquare },
    { label: "Pending", value: comments.filter((comment) => comment.status === "pending").length, icon: Clock3 },
    { label: "Approved", value: comments.filter((comment) => comment.status === "approved").length, icon: CheckCircle2 },
    { label: "Rejected", value: comments.filter((comment) => comment.status === "rejected").length, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{label}</p>
            <Icon className="h-4 w-4 text-violet-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
