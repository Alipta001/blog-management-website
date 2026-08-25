"use client";

import Image from "next/image";
import { BookOpen, Eye, Heart, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import type { Blog } from "@/types/blog.types";

interface BlogSidebarProps { blog: Blog; }

export default function BlogSidebar({ blog }: BlogSidebarProps) {
  const author = typeof blog.author === "string" ? null : blog.author;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  useEffect(() => {
    if (!author?._id) return;

    AxiosInstance.get(endPoints.user.favoriteAuthors)
      .then((response) => {
        const authors = response.data.data.authors || [];
        setIsFavorite(authors.some((item: { _id: string }) => item._id === author._id));
      })
      .catch(() => setIsFavorite(false));
  }, [author?._id]);

  const toggleFavorite = async () => {
    if (!author?._id) return;

    setIsUpdatingFavorite(true);
    try {
      const response = await AxiosInstance.patch(
        endPoints.user.toggleFavoriteAuthor.replace(":id", author._id),
      );
      setIsFavorite(response.data.data.isFavorite);
      toast.success(response.data.message);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.info("Please login to add favourite authors.");
      } else {
        toast.error(error?.response?.data?.message || "Unable to update favourite author");
      }
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-500 dark:text-violet-300">About the author</p>
        <div className="mt-4 flex items-center gap-3">
          {author?.profileImage ? <Image src={author.profileImage} alt={author.name} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"><UserRound className="h-5 w-5" /></div>}
          <div className="min-w-0 flex-1"><p className="text-xs text-slate-500 dark:text-slate-400">Written by</p><p className="truncate font-semibold text-slate-950 dark:text-white">{author?.name || "Unknown author"}</p></div>
        </div>
        {author?.bio && <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-400">{author.bio}</p>}
        {author?._id && (
          <button
            type="button"
            onClick={toggleFavorite}
            disabled={isUpdatingFavorite}
            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${isFavorite ? "border-rose-500/30 bg-rose-500/10 text-rose-500" : "border-slate-200 text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 dark:border-slate-800 dark:text-slate-400 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"} disabled:cursor-wait disabled:opacity-60`}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            {isFavorite ? "Favourite author" : "Add to favourite authors"}
          </button>
        )}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
        <div className="flex items-center justify-between"><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Article snapshot</p><BookOpen className="h-4 w-4 text-violet-400" /></div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]"><Eye className="h-4 w-4 text-violet-400" /><p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{blog.views.toLocaleString()}</p><p className="text-xs text-slate-500">Views</p></div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]"><BookOpen className="h-4 w-4 text-violet-400" /><p className="mt-2 truncate text-sm font-semibold capitalize text-slate-950 dark:text-white">{blog.status}</p><p className="text-xs text-slate-500">Status</p></div>
        </div>
      </section>
    </aside>
  );
}
