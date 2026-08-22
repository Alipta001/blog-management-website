"use client";

import {
  ArrowLeft,
  Save,
  Send,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface CreateBlogHeaderProps {
  onSaveDraft: () => void;

  onSubmit: () => void;

  isSubmitting: boolean;
}

export default function CreateBlogHeader({
  onSaveDraft,
  onSubmit,
  isSubmitting,
}: CreateBlogHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#09090b] p-5 sm:flex-row sm:items-center sm:justify-between">
      
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-white">
            Create Blog
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Write and submit a new blog for review.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSaveDraft}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />

          Save Draft
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />

          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </button>
      </div>
    </div>
  );
}