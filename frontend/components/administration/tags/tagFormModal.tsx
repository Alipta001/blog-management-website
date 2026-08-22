"use client";

import { Loader2, Pencil, Tags, X } from "lucide-react";
import { useState } from "react";

import type { Tag } from "@/types/tag.types";

export interface TagFormData {
  name: string;
}

interface TagFormModalProps {
  open: boolean;
  tag?: Tag | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: TagFormData) => Promise<void>;
}

export default function TagFormModal({ open, tag = null, loading = false, onClose, onSubmit }: TagFormModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const editMode = Boolean(tag);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = name.trim();
    if (!value) return setError("Tag name is required");
    if (value.length < 2) return setError("Tag name must contain at least 2 characters");
    setError(null);
    try {
      await onSubmit({ name: value });
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">{editMode ? <Pencil className="h-5 w-5" /> : <Tags className="h-5 w-5" />}</div><div><h2 className="text-lg font-semibold text-white">{editMode ? "Edit Tag" : "Create Tag"}</h2><p className="mt-1 text-sm text-slate-500">{editMode ? "Update tag information." : "Add a tag for blog content."}</p></div></div>
          <button type="button" onClick={onClose} disabled={loading} aria-label="Close modal" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-5 p-6">
          {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
          <div><label htmlFor="tag-name" className="mb-2 block text-sm font-medium text-slate-300">Tag Name <span className="text-red-400">*</span></label><input id="tag-name" value={name} onChange={(event) => setName(event.target.value)} disabled={loading} maxLength={100} placeholder="e.g. JavaScript" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60 disabled:opacity-60" /></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={onClose} disabled={loading} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5">Cancel</button><button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60">{loading && <Loader2 className="h-4 w-4 animate-spin" />}{editMode ? "Update Tag" : "Create Tag"}</button></div>
        </form>
      </div>
    </div>
  );
}
