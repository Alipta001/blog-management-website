
"use client";

import {
  CalendarDays,
  RefreshCw,
} from "lucide-react";


interface AnalyticsHeaderProps {
  onRefresh?: () => void;

  isRefreshing?: boolean;
}


export default function AnalyticsHeader({
  onRefresh,
  isRefreshing = false,
}: AnalyticsHeaderProps) {

  return (
    <div
      className="
        flex flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      <div>

        <p className="text-sm font-medium text-violet-400">
          AUTHOR DASHBOARD
        </p>

        <h1
          className="
            mt-1
            text-2xl
            font-bold
            tracking-tight
            text-white
            sm:text-3xl
          "
        >
          Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track your content performance and audience engagement.
        </p>

      </div>


      <div className="flex items-center gap-3">

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-2.5
            text-sm
            text-slate-300
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
        >

          <CalendarDays className="h-4 w-4 text-slate-500" />

          <span>
            Last 30 Days
          </span>

        </button>


        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            text-slate-400
            transition
            hover:bg-white/[0.06]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Refresh analytics"
        >

          <RefreshCw
            className={`
              h-4 w-4
              ${
                isRefreshing
                  ? "animate-spin"
                  : ""
              }
            `}
          />

        </button>

      </div>

    </div>
  );
}
