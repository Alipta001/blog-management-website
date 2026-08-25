"use client";

import { useEffect, useState } from "react";
import { Heart, Search, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/slice/blog/blogSlice";
import { getCategories } from "@/redux/slice/category/categorySlice";
import { getTags } from "@/redux/slice/tag/tagSlice";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

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
  const [sort, setSort] = useState<"latest" | "mostViewed" | "mostLiked">("latest");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [favoriteAuthors, setFavoriteAuthors] = useState<string[]>([]);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    AxiosInstance.get(endPoints.user.favoriteAuthors)
      .then((response) => setFavoriteAuthors((response.data.data.authors || []).map((author: { _id: string }) => author._id)))
      .catch(() => setFavoriteAuthors([]));
  }, [auth.isAuthenticated]);

  useEffect(() => {
    dispatch(
      getBlogs({
        page,
        limit: 12,
        search: search.trim() || undefined,
        category: category || undefined,
        tag: tag || undefined,
        sort,
        author: favoriteOnly && favoriteAuthors.length ? favoriteAuthors.join(",") : undefined,
      }),
    );
  }, [category, dispatch, page, search, tag, sort, favoriteOnly, favoriteAuthors]);

  const toggleFavoriteAuthor = async (authorId: string) => {
    if (!auth.isAuthenticated) {
      toast.info("Please login to add favourite authors.");
      return;
    }
    try {
      const response = await AxiosInstance.patch(endPoints.user.toggleFavoriteAuthor.replace(":id", authorId));
      setFavoriteAuthors((current) => response.data.data.isFavorite ? [...new Set([...current, authorId])] : current.filter((id) => id !== authorId));
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to update favourite author");
    }
  };

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

      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-5">
        {[[Sparkles, "latest", "Most recent"], [TrendingUp, "mostViewed", "Most viewed"], [Heart, "mostLiked", "Most liked"]].map(([Icon, value, label]) => (
          <button key={value as string} type="button" onClick={() => { setSort(value as typeof sort); setPage(1); }} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${sort === value ? "bg-violet-500 text-white" : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"}`}>
            <Icon className="h-4 w-4" /> {label as string}
          </button>
        ))}
        {auth.isAuthenticated && favoriteAuthors.length > 0 && (
          <button type="button" onClick={() => { setFavoriteOnly((value) => !value); setPage(1); }} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${favoriteOnly ? "bg-rose-500 text-white" : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"}`}>
            <Heart className="h-4 w-4" /> Favourite authors
          </button>
        )}
      </div>

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
        favoriteAuthors={favoriteAuthors}
        authenticated={auth.isAuthenticated}
        onToggleFavorite={toggleFavoriteAuthor}
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