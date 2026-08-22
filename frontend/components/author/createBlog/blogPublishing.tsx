"use client";

import {
  FileText,
  Send,
} from "lucide-react";

export default function BlogPublishing() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">
            Publishing
          </h2>

          <p className="text-xs text-slate-500">
            Review workflow
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-start gap-3">
          <Send className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Submit for review
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              Your blog will be reviewed by the administration before it is published.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}