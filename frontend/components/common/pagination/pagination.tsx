"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import type { Pagination as PaginationType } from "@/types/blog.types";

interface PaginationProps {
  pagination: PaginationType | null;

  onPageChange: (page: number) => void;

  loading?: boolean;
}

export default function Pagination({
  pagination,
  onPageChange,
  loading = false,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const {
    page,
    totalPages,
    total,
    limit,
  } = pagination;

  const startItem =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const endItem =
    Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 4) {
      pages.push("ellipsis");
    }

    const start =
      Math.max(2, page - 1);

    const end =
      Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-medium text-white">
          {startItem}
        </span>
        {" - "}
        <span className="font-medium text-white">
          {endItem}
        </span>
        {" of "}
        <span className="font-medium text-white">
          {total}
        </span>
        {" results"}
      </p>


      <div className="flex items-center gap-1">

        {/* Previous */}

        <button
          type="button"
          onClick={() =>
            onPageChange(page - 1)
          }
          disabled={
            page === 1 || loading
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>


        {/* Page Numbers */}

        {pages.map(
          (pageNumber, index) => {
            if (pageNumber === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-slate-500"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            return (
              <button
                key={pageNumber}
                type="button"
                disabled={loading}
                onClick={() =>
                  onPageChange(pageNumber)
                }
                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                  page === pageNumber
                    ? "bg-violet-500 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          },
        )}


        {/* Next */}

        <button
          type="button"
          onClick={() =>
            onPageChange(page + 1)
          }
          disabled={
            page === totalPages ||
            loading
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>

    </div>
  );
}