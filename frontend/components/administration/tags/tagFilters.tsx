"use client";

import { Search } from "lucide-react";

interface TagFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function TagFilters({ search, onSearchChange }: TagFiltersProps) {
  return (
    <div className="border-b border-white/10 p-5">
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search tags..." className="w-full rounded-xl border border-white/10 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/50" />
      </div>
    </div>
  );
}
