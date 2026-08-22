import { Tags } from "lucide-react";

interface TagStatsProps {
  total: number;
}

export default function TagStats({ total }: TagStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Tags</p>
            <h2 className="mt-3 text-2xl font-bold text-white">{total.toLocaleString()}</h2>
            <p className="mt-2 text-xs text-slate-600">Available for blog content</p>
          </div>
          <div className="rounded-xl bg-violet-500/10 p-2.5"><Tags className="h-5 w-5 text-violet-400" /></div>
        </div>
      </div>
    </div>
  );
}
