"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Lightbulb } from "lucide-react";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

interface DailyFact {
  category: string;
  title: string;
  excerpt: string;
  image: string | null;
  url: string;
}

export default function DailyFactsPage() {
  const [news, setNews] = useState<DailyFact[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadNews = async (nextPage: number) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(endPoints.facts.getDailyFacts, {
        params: { page: nextPage, limit: 3 },
      });
      const data = response.data.data;
      setNews((current) => nextPage === 1 ? data.facts : [...current, ...data.facts]);
      setPage(nextPage);
      setHasMore(data.pagination.hasMore);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(1).catch(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-5xl space-y-8">
      <header className="rounded-2xl border border-amber-200/60 bg-amber-50/80 p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-amber-700  "><Lightbulb className="h-4 w-4" /> A small spark for today</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Did you know?</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Interesting stories, useful ideas, and fresh discoveries to make every visit a little more rewarding.</p>
      </header>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div><p className="text-sm font-medium text-amber-600  ">Curated for curious readers</p><h2 className="mt-1 text-2xl font-bold text-slate-200 dark:text-white">Interesting today</h2></div>
          <span className="hidden text-xs text-slate-500 sm:inline">New reading sparks</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-700">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800"><img src={item.image || ""} alt="" onError={(event) => { event.currentTarget.classList.add("hidden"); event.currentTarget.nextElementSibling?.classList.remove("hidden"); }} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105${item.image ? "" : " hidden"}`} /><div className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-slate-100 text-amber-700 dark:from-slate-800 dark:via-slate-900 dark:to-orange-950 dark:text-amber-300${item.image ? " hidden" : " flex"}`}><Lightbulb className="h-12 w-12 opacity-70" /></div><span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">{item.category}</span></div>
              <div className="p-5"><h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 dark:text-white">{item.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700  ">Read story <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" /></span></div>
            </a>
          ))}
        </div>
        {hasMore && <div className="mt-6 flex justify-center"><button type="button" onClick={() => loadNews(page + 1)} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-wait disabled:opacity-60 dark:border-amber-800 dark:bg-amber-950/20 dark:hover:bg-amber-950/40">{loading ? "Loading..." : "More news"} <ArrowUpRight className="h-4 w-4" /></button></div>}
      </section>

      <Link href="/dashboard/reader" className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-500  "><ArrowLeft className="h-4 w-4" /> Back to reader overview</Link>
    </main>
  );
}
