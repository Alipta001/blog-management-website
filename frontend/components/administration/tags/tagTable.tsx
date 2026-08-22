"use client";

import { MoreHorizontal, Pencil, Tags, Trash2 } from "lucide-react";
import { useState } from "react";

import type { Tag } from "@/types/tag.types";

interface TagTableProps {
  tags: Tag[];
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TagActions({ tag, onEdit, onDelete }: { tag: Tag; onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button type="button" onClick={() => setOpen((current) => !current)} aria-label={`Actions for ${tag.name}`} className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
        <MoreHorizontal className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#1a2233] py-1 shadow-xl">
          <button type="button" onClick={() => { onEdit(); setOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5"><Pencil className="h-4 w-4" /> Edit</button>
          <button type="button" onClick={() => { onDelete(); setOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-400 hover:bg-white/5"><Trash2 className="h-4 w-4" /> Delete</button>
        </div>
      )}
    </div>
  );
}

export default function TagTable({ tags, onEdit, onDelete }: TagTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead><tr className="border-b border-white/10 bg-white/[0.02]">
          <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Tag</th>
          <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Slug</th>
          <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Created</th>
          <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Updated</th>
          <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">Actions</th>
        </tr></thead>
        <tbody>
          {tags.map((tag) => <tr key={tag._id} className="border-b border-white/[0.06] transition hover:bg-white/[0.025]">
            <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10"><Tags className="h-4 w-4 text-violet-400" /></div><p className="text-sm font-medium text-white">{tag.name}</p></div></td>
            <td className="px-6 py-4 text-sm text-slate-500">{tag.slug}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{formatDate(tag.createdAt)}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{formatDate(tag.updatedAt)}</td>
            <td className="px-6 py-4"><TagActions tag={tag} onEdit={() => onEdit(tag)} onDelete={() => onDelete(tag)} /></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
