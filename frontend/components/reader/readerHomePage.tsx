"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/slice/blog/blogSlice";

import ReaderBlogGrid from "./readerBlogGrid";

export default function ReaderHomePage() {
  const dispatch = useAppDispatch();

  const {
    blogs,
    loading,
    error,
  } = useAppSelector(
    (state) => state.blog,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getBlogs({
        page: 1,
        limit: 12,
      }),
    );
  }, [dispatch]);

  const filteredBlogs = blogs.filter(
    (blog) => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return true;
      }

      return (
        blog.title
          .toLowerCase()
          .includes(query) ||
        blog.description
          .toLowerCase()
          .includes(query)
      );
    },
  );

  return (
    <main className="space-y-8">
      {/* HERO */}
      <header
        className="
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-br
          from-violet-500/15
          via-violet-500/[0.04]
          to-transparent
          p-6
          sm:p-8
        "
      >
        <p className="text-sm font-medium text-violet-300">
          Reader space
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-bold
            text-white
            sm:text-4xl
          "
        >
          Find your next good read.
        </h1>

        <p
          className="
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-slate-400
          "
        >
          Explore the latest published
          stories, ideas and perspectives
          from the GolpoKotha community.
        </p>

        {/* SEARCH */}
        <div className="relative mt-6 max-w-xl">
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
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search published blogs..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-black/20
              py-3
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-slate-500
              focus:border-violet-500/50
            "
          />
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
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Latest blogs
          </h2>

          <Link
            href="/dashboard/reader/allBlogs"
            className="
              text-sm
              text-violet-400
              transition
              hover:text-violet-300
            "
          >
            Explore all
          </Link>
        </div>

        <ReaderBlogGrid
          blogs={filteredBlogs}
          loading={loading}
        />
      </section>
    </main>
  );
}