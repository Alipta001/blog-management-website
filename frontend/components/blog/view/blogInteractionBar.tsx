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
}

export default function BlogInteractionBar({
  totalLikes,
  isLiked,
  loading,
  onLike,
  onUnlike,
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
        items-center
        justify-between
        gap-4
        border-y
        border-white/10
        py-5
      "
    >
      <button
        type="button"
        disabled={loading}
        onClick={handleLike}
        className={`
          inline-flex
          items-center
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
              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-rose-500/30 hover:text-rose-400"
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
        onClick={handleShare}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/[0.03]
          px-4
          py-2.5
          text-sm
          font-medium
          text-slate-300
          transition
          hover:border-violet-500/30
          hover:text-white
        "
      >
        <Share2 className="h-4 w-4" />

        Share
      </button>
    </div>
  );
}