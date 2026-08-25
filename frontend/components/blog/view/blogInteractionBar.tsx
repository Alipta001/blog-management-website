"use client";

import {
  Heart,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";

interface BlogInteractionBarProps {
  blogId: string;
  totalLikes: number;
  isLiked: boolean;
  loading: boolean;
  onLike: () => void;
  onUnlike: () => void;
  isFavoriteAuthor: boolean;
  favoriteAuthorLoading: boolean;
  onToggleFavoriteAuthor: () => void;
}

export default function BlogInteractionBar({
  totalLikes,
  isLiked,
  loading,
  onLike,
  onUnlike,
  isFavoriteAuthor,
  favoriteAuthorLoading,
  onToggleFavoriteAuthor,
}: BlogInteractionBarProps) {
  const handleLike = () => {
    if (isLiked) {
      onUnlike();
    } else {
      onLike();
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href,
      );

      toast.success(
        "Blog link copied",
      );
    } catch {
      toast.error(
        "Unable to copy blog link",
      );
    }
  };

  return (
    <div
  className="
    flex
    flex-wrap
    items-center
    gap-4
    rounded-2xl
    border
    border-slate-200
    bg-white
    blog-interaction-bar
    p-4
    shadow-sm
    dark:border-slate-800
    dark:bg-slate-900/60
    dark:shadow-none
  "
>
      <button
        type="button"
        disabled={loading}
        onClick={handleLike}
        className={`
          inline-flex
          gap-2
          rounded-full
          border
          px-4
          py-2.5
          text-sm
          font-medium
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50

          ${
            isLiked
              ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
              : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-rose-500/30 dark:hover:text-rose-400"
          }
        `}
      >
        <Heart
          className="h-4 w-4"
          fill={
            isLiked
              ? "currentColor"
              : "none"
          }
        />

        {totalLikes}

        <span>
          {isLiked
            ? "Liked"
            : "Like"}
        </span>
      </button>

      <button
        type="button"
        onClick={onToggleFavoriteAuthor}
        disabled={favoriteAuthorLoading}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition disabled:cursor-wait disabled:opacity-60 ${isFavoriteAuthor ? "border-rose-500/30 bg-rose-500/10 text-rose-500" : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-rose-500/30 dark:hover:text-rose-400"}`}
      >
        <Heart className="h-4 w-4" fill={isFavoriteAuthor ? "currentColor" : "none"} />
        {isFavoriteAuthor ? "Favourite author" : "Add author to favourites"}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-slate-700
          dark:border-slate-800
          dark:bg-slate-900/60
          dark:text-slate-300
          transition
          hover:border-violet-500/30
          hover:text-slate-950
          dark:hover:text-white
        "
      >
        <Share2 className="h-4 w-4" />

        Share
      </button>
    </div>
  );
}