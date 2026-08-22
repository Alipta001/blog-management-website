import type {
  BlogStatus,
} from "@/types/blog.types";

interface BlogStatusBadgeProps {
  status: BlogStatus;
}

const statusStyles:
  Record<
    BlogStatus,
    string
  > = {

    draft:
      "bg-slate-500/10 text-slate-400 border-slate-500/20",

    pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",

    published:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    unpublished:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",

    rejected:
      "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

const statusLabels:
  Record<
    BlogStatus,
    string
  > = {

    draft: "Draft",

    pending:
      "Pending",

    published:
      "Published",

    unpublished:
      "Unpublished",

    rejected:
      "Rejected",
  };

export default function BlogStatusBadge({
  status,
}: BlogStatusBadgeProps) {

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >

      {statusLabels[status]}

    </span>
  );
}