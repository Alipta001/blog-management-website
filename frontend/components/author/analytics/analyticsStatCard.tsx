
import type {
  LucideIcon,
} from "lucide-react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";


interface AnalyticsStatCardProps {
  title: string;

  value: string | number;

  description: string;

  icon: LucideIcon;

  trend?: number;
}


export default function AnalyticsStatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: AnalyticsStatCardProps) {

  const isPositive =
    trend !== undefined &&
    trend >= 0;


  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#09090b]
        p-5
        transition
        hover:border-white/15
        hover:bg-white/[0.02]
      "
    >

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>

        </div>


        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-violet-500/20
            bg-violet-500/10
            text-violet-400
          "
        >

          <Icon className="h-5 w-5" />

        </div>

      </div>


      {/* Footer */}

      <div className="mt-5 flex items-center gap-2">

        {trend !== undefined && (

          <div
            className={`
              flex items-center gap-1
              text-xs font-medium
              ${
                isPositive
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            `}
          >

            {isPositive ? (

              <ArrowUpRight className="h-3.5 w-3.5" />

            ) : (

              <ArrowDownRight className="h-3.5 w-3.5" />

            )}

            <span>
              {Math.abs(trend)}%
            </span>

          </div>

        )}


        <p className="text-xs text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}
