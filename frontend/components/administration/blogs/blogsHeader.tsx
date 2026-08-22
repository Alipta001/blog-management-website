"use client";

import {
BookOpen,
RefreshCw,
} from "lucide-react";

interface BlogsHeaderProps {
onRefresh: () => void;
isRefreshing?: boolean;
}

export default function BlogsHeader({
onRefresh,
isRefreshing = false,
}: BlogsHeaderProps) {
return ( <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

  <div>

    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

        <BookOpen className="h-5 w-5 text-violet-400" />

      </div>

      <div>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Blogs Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage, review and moderate content across your platform.
        </p>

      </div>

    </div>

  </div>


  <button
    type="button"
    onClick={onRefresh}
    disabled={isRefreshing}
    className="
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      px-4
      py-2.5
      text-sm
      font-medium
      text-slate-300
      transition
      hover:bg-white/[0.06]
      hover:text-white
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >

    <RefreshCw
      className={`
        h-4
        w-4
        ${isRefreshing ? "animate-spin" : ""}
      `}
    />

    {isRefreshing
      ? "Refreshing..."
      : "Refresh"}

  </button>

</div>

);
}
