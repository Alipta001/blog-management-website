"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import type {
  BlogStats as BlogStatsType,
} from "@/types/blog.types";


interface BlogsStatsProps {
  stats: BlogStatsType | null;
}


export default function BlogsStats({
  stats,
}: BlogsStatsProps) {

  const blogStats = stats || {
    total: 0,
    published: 0,
    pending: 0,
    draft: 0,
    rejected: 0,
    unpublished: 0,
  };


  const statistics = [

    {
      label: "Total Blogs",

      value:
        blogStats.total,

      description:
        "All platform content",

      icon:
        BookOpen,
    },

    {
      label: "Published",

      value:
        blogStats.published,

      description:
        "Currently visible",

      icon:
        CheckCircle2,
    },

    {
      label: "Pending Review",

      value:
        blogStats.pending,

      description:
        "Waiting for approval",

      icon:
        Clock3,
    },

    {
      label: "Drafts",

      value:
        blogStats.draft,

      description:
        "Not submitted yet",

      icon:
        FileText,
    },

    {
      label: "Rejected",

      value:
        blogStats.rejected,

      description:
        "Requires revision",

      icon:
        XCircle,
    },

  ];


  return (

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

      {statistics.map(
        (stat) => {

          const Icon =
            stat.icon;


          return (

            <div
              key={stat.label}
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#09090b]
                p-5
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">

                    {stat.label}

                  </p>


                  <h3 className="mt-3 text-2xl font-bold text-white">

                    {stat.value.toLocaleString()}

                  </h3>


                  <p className="mt-2 text-xs text-slate-600">

                    {stat.description}

                  </p>

                </div>


                <div className="rounded-xl bg-violet-500/10 p-2.5">

                  <Icon className="h-5 w-5 text-violet-400" />

                </div>

              </div>

            </div>

          );

        },
      )}

    </div>

  );

}