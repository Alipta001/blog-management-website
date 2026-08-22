import type { ReactNode } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";


interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  trend?: number;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  const isPositive =
    trend !== undefined && trend >= 0;


  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-black/30">

      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />


      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>


          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>


          <div className="mt-3 flex items-center gap-2">

            {trend !== undefined && (

              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  isPositive
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >

                {isPositive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}

                {Math.abs(trend)}%

              </span>

            )}


            <span className="text-xs text-slate-500">
              {description}
            </span>

          </div>

        </div>


        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">

          {icon}

        </div>

      </div>

    </div>
  );
}