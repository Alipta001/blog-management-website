"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Pagination } from "@/types/blog.types";

interface BlogsPaginationProps {
  pagination: Pagination | null;

  onPageChange: (page: number) => void;
}

export default function BlogsPagination({
  pagination,
  onPageChange,
}: BlogsPaginationProps) {
  if (!pagination) {
    return null;
  }

  const { page, limit, total, totalPages } = pagination;

  const start = total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  const pages = Array.from(
    {
      length: Math.min(totalPages, 5),
    },
    (_, index) => {
      if (totalPages <= 5) {
        return index + 1;
      }

      if (page <= 3) {
        return index + 1;
      }

      if (page >= totalPages - 2) {
        return totalPages - 4 + index;
      }

      return page - 2 + index;
    },
  );

  return (
    <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-300">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-300">
          {total.toLocaleString()}
        </span>{" "}
        blogs
      </p>

      <div className="flex items-center gap-2">
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-white/10
        text-slate-500
        transition
        hover:bg-white/5
        hover:text-white
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* PAGE NUMBERS */}

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-sm
            font-medium
            transition
            ${
              page === pageNumber
                ? "bg-violet-600 text-white"
                : "text-slate-500 hover:bg-white/5 hover:text-white"
            }
          `}
          >
            {pageNumber}
          </button>
        ))}

        {/* NEXT */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-white/10
        text-slate-400
        transition
        hover:bg-white/5
        hover:text-white
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
