"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, BookOpen, Clock3, Eye, Flame, Heart, History, Search, Sparkles, Shuffle, Target, TrendingUp } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/slice/blog/blogSlice";
import { getMyReadingHistory } from "@/redux/slice/readingHistory/readingHistorySlice";
import type { Blog } from "@/types/blog.types";

import ReaderBlogGrid from "./readerBlogGrid";

export default function ReaderHomePage() {
  const searchParams = useSearchParams();
  const contrastDemo = searchParams.get("demo") === "contrast";
  const dispatch = useAppDispatch();

  const {
    blogs,
    loading,
    error,
  } = useAppSelector(
    (state) => state.blog,
  );

  const { history } = useAppSelector((state) => state.readingHistory);

  const [search, setSearch] = useState("");
  const [discoveryMode, setDiscoveryMode] = useState<"recent" | "popular">("recent");
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const [readingIntent, setReadingIntent] = useState<"all" | "short" | "popular">("all");
  const [activeTopic, setActiveTopic] = useState("all");

  const rankedBlogs = [...blogs].sort((first, second) =>
    discoveryMode === "popular"
      ? (second.views || 0) - (first.views || 0)
      : new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
  const featuredBlog = rankedBlogs[surpriseIndex % Math.max(rankedBlogs.length, 1)];
  const totalViews = blogs.reduce((total, blog) => total + (blog.views || 0), 0);
  const totalLikes = blogs.reduce((total, blog) => total + (blog.likeCount || 0), 0);

  useEffect(() => {
    dispatch(
      getBlogs({
        page: 1,
        limit: 12,
      }),
    );
    dispatch(getMyReadingHistory({ page: 1, limit: 7 }));
  }, [dispatch]);

  const continueReading = history.find((item) => item.blog && typeof item.blog !== "string");
  const continueBlog = continueReading?.blog as Blog | undefined;
  const readingDates = new Set(history.map((item) => new Date(item.viewedAt).toDateString()));
  let readingStreak = 0;
  for (let offset = 0; readingDates.has(new Date(Date.now() - offset * 86400000).toDateString()); offset += 1) {
    readingStreak += 1;
  }

  const filteredBlogs = blogs.filter(
    (blog) => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return true;
      }

      const matchesSearch = (
        blog.title
          .toLowerCase()
          .includes(query) ||
        blog.description
          .toLowerCase()
          .includes(query)
      );
      const category = typeof blog.category === "string" ? blog.category : blog.category?._id;
      const matchesTopic = activeTopic === "all" || category === activeTopic;
      const matchesIntent = readingIntent === "all"
        || (readingIntent === "short" && (blog.readingTime || 0) > 0 && (blog.readingTime || 0) <= 5)
        || (readingIntent === "popular" && (blog.views || 0) > 0);
      return matchesSearch && matchesTopic && matchesIntent;
    },
  );

  const topics = blogs.reduce<Array<{ id: string; name: string }>>((items, blog) => {
    if (typeof blog.category === "string") return items;
    const category = blog.category;
    if (!items.some((item) => item.id === category._id)) items.push({ id: category._id, name: category.name });
    return items;
  }, []);
  const todayKey = new Date().toDateString();
  const todayReads = history.filter((item) => new Date(item.viewedAt).toDateString() === todayKey).length;
  const dailyGoal = 3;

  return (
    <main
      className="space-y-8"
      data-contrast-demo={contrastDemo ? "true" : undefined}
    >
      {/* HERO */}
      <header
        className="
          rounded-2xl
          border
          border-violet-200
          bg-gradient-to-br
          from-violet-50
          via-white
          to-indigo-50
          dark:border-white/10
          dark:from-violet-500/15
          dark:via-violet-500/[0.04]
          dark:to-transparent
          reader-blog-hero
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
              text-slate-950
              dark:text-white
              reader-banner-title
              demo-banner-title
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
            text-slate-600
            dark:text-slate-300
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
              border-slate-200
              bg-white/80
              dark:border-white/10
              dark:bg-black/20
              py-3
              pl-10
              pr-4
              text-sm
              text-slate-900
              dark:text-white
              reader-search-input
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

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          [BookOpen, "Fresh stories", blogs.length.toString()],
          [Eye, "Community views", totalViews.toLocaleString()],
          [Heart, "Total reactions", totalLikes.toLocaleString()],
        ].map(([Icon, label, value]) => (
            <div key={label as string} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900">
            <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{value as string}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label as string}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        {continueBlog ? (
          <Link href={`/dashboard/reader/blogs/${continueBlog._id}`} className="group flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/80 p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 dark:border-emerald-800/50 dark:bg-emerald-950/30">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><History className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">Continue reading</p><h2 className="mt-1 truncate text-lg font-semibold text-slate-900 dark:text-emerald-100">{continueBlog.title}</h2><p className="mt-1 text-sm text-slate-600 dark:text-emerald-300/80">Pick up where you left off <ArrowUpRight className="ml-1 inline h-4 w-4 transition group-hover:translate-x-0.5" /></p></div>
          </Link>
        ) : <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60"><p className="text-sm text-slate-500">Start reading to build your personal reading trail.</p></div>}
        <div className="flex items-center gap-4 rounded-2xl border border-orange-200/60 bg-orange-50/80 p-5 dark:border-orange-800/50 dark:bg-orange-950/30"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400"><Flame className="h-5 w-5" /></span><div><p className="text-2xl font-bold text-slate-900 dark:text-orange-100">{readingStreak} day{readingStreak === 1 ? "" : "s"}</p><p className="text-sm font-semibold text-slate-900 dark:text-orange-100">Reading streak</p><p className="text-sm text-slate-600 dark:text-orange-300/80">{readingStreak ? "Keep the momentum going" : "Read one story to begin"}</p></div></div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-100 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300"><Target className="h-5 w-5" /></span><div><p className="text-sm font-semibold text-slate-900 dark:text-white">Today&apos;s reading goal</p><p className="text-xs text-slate-600 dark:text-slate-400">{todayReads >= dailyGoal ? "Goal complete. Nice work." : `${dailyGoal - todayReads} more read${dailyGoal - todayReads === 1 ? "" : "s"} to reach today&apos;s goal`}</p></div></div>
          <div className="flex items-center gap-3"><div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${Math.min((todayReads / dailyGoal) * 100, 100)}%` }} /></div><span className="text-sm font-bold text-slate-900 dark:text-white">{Math.min(todayReads, dailyGoal)}/{dailyGoal}</span></div>
        </div>
      </section>

      {featuredBlog && (
        <Link href={`/dashboard/reader/blogs/${featuredBlog._id}`} className="reader-featured-panel group relative block overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/80 to-indigo-50/80 p-6 transition hover:border-violet-300 dark:border-slate-800 dark:from-slate-900 dark:to-slate-800 dark:hover:border-violet-500/50 sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400"><Sparkles className="h-4 w-4" /> Featured for you</div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950 dark:text-white sm:text-3xl">{featuredBlog.title}</h2>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{featuredBlog.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">Start reading <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </div>
        </Link>
      )}

      <div className="reader-community-heading flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-violet-700 dark:text-violet-400"><Clock3 className="h-4 w-4" /> Your next reads</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Latest from the community</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => { setDiscoveryMode("recent"); setSurpriseIndex(0); }} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${discoveryMode === "recent" ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-violet-50 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"}`}><Clock3 className="h-3.5 w-3.5" /> Recent</button>
          <button type="button" onClick={() => { setDiscoveryMode("popular"); setSurpriseIndex(0); }} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${discoveryMode === "popular" ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-violet-50 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"}`}><TrendingUp className="h-3.5 w-3.5" /> Popular</button>
          <button type="button" onClick={() => setSurpriseIndex((value) => value + 1)} title="Choose a surprise story" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-violet-300"><Shuffle className="h-3.5 w-3.5" /> Surprise me</button>
          <Link href="/dashboard/reader/allBlogs" className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300">Browse all <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Find your kind of read</p>
        <div className="flex flex-wrap gap-2">
          {[["all", "Everything"], ["short", "Quick reads"], ["popular", "Worth the buzz"]].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setReadingIntent(value as typeof readingIntent)} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${readingIntent === value ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-cyan-50 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"}`}>{label}</button>
          ))}
          {topics.map((topic) => (
            <button key={topic.id} type="button" onClick={() => setActiveTopic((current) => current === topic.id ? "all" : topic.id)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${activeTopic === topic.id ? "border-violet-500 bg-violet-500 text-white" : "border-slate-200 text-slate-600 hover:border-violet-300 dark:border-slate-800 dark:text-slate-300"}`}>{topic.name}</button>
          ))}
        </div>
      </div>

      {/* BLOGS */}
      <section className="space-y-4">
        <ReaderBlogGrid
          blogs={filteredBlogs.slice(0, 6)}
          loading={loading}
        />
      </section>
    </main>
  );
}