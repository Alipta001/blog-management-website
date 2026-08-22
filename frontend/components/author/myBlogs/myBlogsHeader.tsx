import Link from "next/link";

import {
  FileText,
  Plus,
} from "lucide-react";

export default function MyBlogsHeader() {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

            <FileText className="h-5 w-5" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">

              My Blogs

            </h1>

            <p className="mt-1 text-sm text-slate-400">

              Create, manage and track all your articles.

            </p>

          </div>

        </div>

      </div>


      <Link
        href="/dashboard/author/create-blog"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
      >

        <Plus className="h-4 w-4" />

        Create Blog

      </Link>

    </section>
  );
}