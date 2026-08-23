"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  clearReadingHistory,
  getMyReadingHistory,
} from "@/redux/slice/readingHistory/readingHistorySlice";

import type { Blog } from "@/types/blog.types";

export default function ReaderHistoryPage() {
  const dispatch = useAppDispatch();

  const {
    history,
    loading,
    error,
  } = useAppSelector(
    (state) => state.readingHistory,
  );

  useEffect(() => {
    dispatch(
      getMyReadingHistory({
        page: 1,
        limit: 30,
      }),
    );
  }, [dispatch]);

  const handleClearHistory = async () => {
    try {
      await dispatch(
        clearReadingHistory(),
      ).unwrap();

      toast.success(
        "Reading history cleared",
      );
    } catch (reason) {
      toast.error(
        typeof reason === "string"
          ? reason
          : "Unable to clear history",
      );
    }
  };

  return (
    <main className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-violet-400">
            Your reading journey
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Reading history
          </h1>
        </div>

        <button
          type="button"
          onClick={handleClearHistory}
          disabled={
            loading || !history.length
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-rose-500/30
            bg-rose-500/[0.03]
            px-4
            py-2.5
            text-sm
            text-rose-400
            transition
            hover:bg-rose-500/10
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Trash2 className="h-4 w-4" />

          Clear history
        </button>
      </header>

      {/* ERROR */}
      {error && (
        <div
          className="
            rounded-xl
            border
            border-rose-500/20
            bg-rose-500/10
            px-4
            py-3
            text-sm
            text-rose-400
          "
        >
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && !history.length && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  h-24
                  animate-pulse
                  rounded-2xl
                  bg-white/[0.05]
                "
              />
            ),
          )}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !history.length && (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-[#111114]
            p-12
            text-center
          "
        >
          <p className="text-sm text-slate-500">
            Your read blogs will appear
            here.
          </p>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="space-y-3">
          {history.map((item) => {
            const blog =
              typeof item.blog === "string"
                ? null
                : (item.blog as Blog);

            return (
              <Link
                key={item._id}
                href={
                  blog
                    ? `/dashboard/reader/blogs/${blog._id}`
                    : "/blogs"
                }
                className="
                  group
                  flex
                  flex-col
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111114]
                  p-5
                  transition
                  hover:border-violet-500/30
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h2
                    className="
                      font-medium
                      text-white
                      transition
                      group-hover:text-violet-300
                    "
                  >
                    {blog?.title ||
                      "Unavailable blog"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Viewed{" "}
                    {new Date(
                      item.viewedAt,
                    ).toLocaleDateString(
                      "en-IN",
                    )}
                  </p>
                </div>

                <span className="text-sm text-violet-400">
                  Read again →
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}