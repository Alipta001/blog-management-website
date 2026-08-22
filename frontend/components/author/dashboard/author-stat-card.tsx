import type {
  ReactNode,
} from "react";

import {
  FileText,
} from "lucide-react";


interface AuthorStatCardProps {

  title: string;

  value: number;

  description: string;

  icon: ReactNode;

  loading?: boolean;

}


export default function AuthorStatCard({
  title,
  value,
  description,
  icon,
  loading = false,
}: AuthorStatCardProps) {

  return (

    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-black/30">

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />


      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">

            {title}

          </p>


          {loading ? (

            <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-white/10" />

          ) : (

            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">

              {value}

            </h3>

          )}


          <p className="mt-3 text-xs text-slate-500">

            {description}

          </p>

        </div>


        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">

          {icon}

        </div>

      </div>

    </div>

  );
}