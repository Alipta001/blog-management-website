"use client";

import {
  Folder,
  Loader2,
} from "lucide-react";

import type {
  Category,
} from "@/types/category.types";

import CategoryStatusBadge from "./categoryStatusBadge";
import CategoryActions from "./categoryActions";


interface CategoryTableProps {

  categories:
    Category[];

  loading:
    boolean;

  onEdit:
    (
      category: Category,
    ) => void;

  onActivate:
    (
      id: string,
    ) => void;

  onDeactivate:
    (
      id: string,
    ) => void;

  onDelete:
    (
      category: Category,
    ) => void;

}


export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
}: CategoryTableProps) {

  if (loading) {

    return (

      <div className="flex min-h-[400px] items-center justify-center">

        <Loader2 className="h-7 w-7 animate-spin text-violet-400" />

      </div>

    );

  }


  if (
    !categories.length
  ) {

    return (

      <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

        <div className="rounded-2xl bg-white/[0.03] p-4">

          <Folder className="h-7 w-7 text-slate-500" />

        </div>


        <h3 className="mt-4 text-base font-semibold text-white">

          No categories found

        </h3>


        <p className="mt-2 text-sm text-slate-500">

          Try changing your search criteria.

        </p>

      </div>

    );

  }


  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[850px]">

        <thead>

          <tr className="border-b border-white/10 bg-white/[0.02]">

            <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">

              Category

            </th>


            <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">

              Description

            </th>


            <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">

              Status

            </th>


            <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">

              Created

            </th>


            <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">

              Actions

            </th>

          </tr>

        </thead>


        <tbody>

          {categories.map(
            (
              category,
            ) => (

              <tr

                key={
                  category._id
                }

                className="
                  border-b
                  border-white/[0.06]
                  transition
                  hover:bg-white/[0.025]
                "
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">

                      <Folder className="h-4 w-4 text-violet-400" />

                    </div>


                    <div>

                      <p className="text-sm font-medium text-white">

                        {category.name}

                      </p>


                      <p className="mt-1 text-xs text-slate-500">

                        {category.slug}

                      </p>

                    </div>

                  </div>

                </td>


                <td className="max-w-[300px] px-6 py-4">

                  <p className="truncate text-sm text-slate-400">

                    {
                      category.description ||
                      "No description"
                    }

                  </p>

                </td>


                <td className="px-6 py-4">

                  <CategoryStatusBadge

                    isActive={
                      category.isActive
                    }

                  />

                </td>


                <td className="px-6 py-4">

                  <span className="text-sm text-slate-500">

                    {new Date(
                      category.createdAt,
                    ).toLocaleDateString(
                      "en-US",
                      {

                        month:
                          "short",

                        day:
                          "numeric",

                        year:
                          "numeric",

                      },
                    )}

                  </span>

                </td>


                <td className="px-6 py-4">

                  <CategoryActions

                    isActive={
                      category.isActive
                    }

                    onEdit={() =>
                      onEdit(
                        category,
                      )
                    }

                    onActivate={() =>
                      onActivate(
                        category._id,
                      )
                    }

                    onDeactivate={() =>
                      onDeactivate(
                        category._id,
                      )
                    }

                    onDelete={() =>
                      onDelete(
                        category,
                      )
                    }

                  />

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}