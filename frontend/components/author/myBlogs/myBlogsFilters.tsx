"use client";

import {
  Filter,
} from "lucide-react";

import type {
  BlogStatus,
} from "@/types/blog.types";

interface MyBlogsFiltersProps {
  status:
    | BlogStatus
    | "all";

  onStatusChange: (
    value:
      | BlogStatus
      | "all"
  ) => void;
}

export default function MyBlogsFilters({
  status,
  onStatusChange,
}: MyBlogsFiltersProps) {

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111114] p-4">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">

          <Filter className="h-4 w-4 text-violet-400" />

          Filter by status

        </div>


        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value as
                | BlogStatus
                | "all"
            )
          }
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
        >

          <option value="all">
            All Blogs
          </option>

          <option value="draft">
            Draft
          </option>

          <option value="pending">
            Pending Review
          </option>

          <option value="published">
            Published
          </option>

          <option value="unpublished">
            Unpublished
          </option>

          <option value="rejected">
            Rejected
          </option>

        </select>

      </div>

    </section>
  );
}