"use client";

import {
  CheckCircle2,
  Folder,
  XCircle,
} from "lucide-react";

import type {
  Category,
} from "@/types/category.types";


interface CategoryStatsProps {

  categories:
    Category[];

}


export default function CategoryStats({
  categories,
}: CategoryStatsProps) {

  const total =
    categories.length;


  const active =
    categories.filter(
      (
        category,
      ) =>
        category.isActive,
    ).length;


  const inactive =
    categories.filter(
      (
        category,
      ) =>
        !category.isActive,
    ).length;


  const stats = [

    {

      label:
        "Total Categories",

      value:
        total,

      icon:
        Folder,

    },

    {

      label:
        "Active",

      value:
        active,

      icon:
        CheckCircle2,

    },

    {

      label:
        "Inactive",

      value:
        inactive,

      icon:
        XCircle,

    },

  ];


  return (

    <div className="grid gap-4 md:grid-cols-3">

      {stats.map(
        ({
          label,
          value,
          icon: Icon,
        }) => (

          <div

            key={
              label
            }

            className="
              rounded-2xl
              border
              border-white/10
              bg-[#111827]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">

                  {label}

                </p>


                <p className="mt-2 text-2xl font-semibold text-white">

                  {value}

                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

                <Icon className="h-5 w-5 text-violet-400" />

              </div>

            </div>

          </div>

        ),
      )}

    </div>

  );

}