
"use client";

import {
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import type { AnalyticsRange } from "@/types/analytics.types";


interface AnalyticsHeaderProps {
  onRefresh?: () => void;

  isRefreshing?: boolean;

  range?: AnalyticsRange;

  onRangeChange?: (range: AnalyticsRange) => void;
}


export default function AnalyticsHeader({
  onRefresh,
  isRefreshing = false,
  range = "30d",
  onRangeChange,
}: AnalyticsHeaderProps) {

  const rangeLabels: Record<AnalyticsRange, string> = {
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    "90d": "Last 90 Days",
    all: "All Time",
  };

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

        <label
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
          "
        >
          <CalendarDays className="h-4 w-4 text-slate-500" />

          <select
            value={range}
            onChange={(event) =>
              onRangeChange?.(
                event.target.value as AnalyticsRange,
              )
            }
            className="bg-transparent outline-none"
            aria-label="Analytics date range"
          >
            {(Object.keys(rangeLabels) as AnalyticsRange[]).map(
              (option) => (
                <option key={option} value={option}>
                  {rangeLabels[option]}
                </option>
              ),
            )}
          </select>
        </label>

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
