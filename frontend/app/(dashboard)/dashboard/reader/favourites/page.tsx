"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import { Search, ArrowLeft } from "lucide-react";
import ReaderBlogGrid from "@/components/reader/readerBlogGrid";
import type { Blog } from "@/types/blog.types";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

interface FavoriteAuthor {
  _id: string;
  name: string;
  bio?: string | null;
}

export default function FavouriteAuthorsPage() {
  const [authors, setAuthors] = useState<FavoriteAuthor[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<FavoriteAuthor | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    AxiosInstance.get(endPoints.user.favoriteAuthors)
      .then((response) => setAuthors(response.data.data.authors || []))
      .catch(() => setAuthors([]));
  }, []);

  const removeAuthor = async (id: string) => {
    await AxiosInstance.patch(endPoints.user.toggleFavoriteAuthor.replace(":id", id));
    setAuthors((current) => current.filter((author) => author._id !== id));
  };

  useEffect(() => {
    if (!selectedAuthor) return;
    setLoadingBlogs(true);
    AxiosInstance.get(endPoints.blog.getAllBlogs, {
      params: { author: selectedAuthor._id, search: search.trim() || undefined, limit: 30 },
    })
      .then((response) => setBlogs(response.data.data.blogs || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoadingBlogs(false));
  }, [selectedAuthor, search]);

  return (
    <main className="space-y-8">
      <header>
        <p className="text-sm font-medium text-rose-400">Your personal list</p>
        <h1 className="mt-1 text-3xl font-bold text-white">Favourite authors</h1>
        <p className="mt-2 text-sm text-slate-500">Follow authors and get notified when they publish.</p>
      </header>
      {selectedAuthor ? (
        <section className="space-y-6">
          <button type="button" onClick={() => { setSelectedAuthor(null); setSearch(""); }} className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> All favourite authors</button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm text-rose-400">Author collection</p><h2 className="mt-1 text-2xl font-bold text-white">{selectedAuthor.name}&apos;s blogs</h2></div>
            <div className="relative w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this author&apos;s blogs" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-rose-500/50" /></div>
          </div>
          <ReaderBlogGrid blogs={blogs} loading={loadingBlogs} />
        </section>
      ) : authors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#111114] p-12 text-center text-sm text-slate-500">Your favourite authors will appear here.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <article key={author._id} role="button" tabIndex={0} onClick={() => setSelectedAuthor(author)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedAuthor(author); }} className="cursor-pointer rounded-2xl border border-white/10 bg-[#111114] p-5 transition hover:-translate-y-1 hover:border-rose-500/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400"><UserRound className="h-5 w-5" /></div>
                <button type="button" title="Remove favourite author" onClick={(event) => { event.stopPropagation(); removeAuthor(author._id); }} className="rounded-lg p-2 text-rose-400 transition hover:bg-rose-500/10"><Heart className="h-4 w-4" fill="currentColor" /></button>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-white">{author.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{author.bio || "Sharing stories and ideas with the community."}</p>
              <span className="mt-5 inline-block text-sm font-medium text-rose-400 hover:text-rose-300">View their blogs →</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
