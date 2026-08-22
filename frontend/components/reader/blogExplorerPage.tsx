"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/slice/blog/blogSlice";
import { getCategories } from "@/redux/slice/category/categorySlice";
import { getTags } from "@/redux/slice/tag/tagSlice";

import ReaderBlogGrid from "./readerBlogGrid";

interface BlogExplorerPageProps {
  title?: string;
}

export default function BlogExplorerPage({
  title = "Explore blogs",
}: BlogExplorerPageProps) {
  const dispatch = useAppDispatch();

  const {
    blogs,
    pagination,
    loading,
    error,
  } = useAppSelector((state) => state.blog);

  const { categories } = useAppSelector(
    (state) => state.category,
  );

  const { tags } = useAppSelector(
    (state) => state.tag,
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getBlogs({
        page,
        limit: 12,
        search: search.trim() || undefined,
        category: category || undefined,
        tag: tag || undefined,
      }),
    );
  }, [category, dispatch, page, search, tag]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPage(1);
    setSearch(event.target.value);
  };

  return (
    <main className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-400">
            Browse the library
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Discover stories, ideas and knowledge from our authors.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row">
          <div className="relative w-full">
          <Search
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-slate-500
            "
          />

            <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              py-3
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-violet-500/50
              focus:bg-white/[0.05]
            "
            />
          </div>

          <select
            value={category}
            onChange={(event) => {
              setPage(1);
              setCategory(event.target.value);
            }}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-500/50"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>

          <select
            value={tag}
            onChange={(event) => {
              setPage(1);
              setTag(event.target.value);
            }}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-500/50"
          >
            <option value="">All tags</option>
            {tags.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
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

      {/* BLOGS */}
      <ReaderBlogGrid
        blogs={blogs}
        loading={loading}
      />

      {/* PAGINATION */}
      {pagination &&
        pagination.totalPages > 1 && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-white/10
              pt-5
              text-sm
              text-slate-500
            "
          >
            <span>
              Page {pagination.page} of{" "}
              {pagination.totalPages}
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((value) => value - 1)
                }
                className="
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-3
                  py-2
                  text-slate-300
                  transition
                  hover:bg-white/[0.05]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Previous
              </button>

              <button
                type="button"
                disabled={
                  page >= pagination.totalPages
                }
                onClick={() =>
                  setPage((value) => value + 1)
                }
                className="
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-3
                  py-2
                  text-slate-300
                  transition
                  hover:bg-white/[0.05]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
              </button>
            </div>
          </div>
        )}
    </main>
  );
}