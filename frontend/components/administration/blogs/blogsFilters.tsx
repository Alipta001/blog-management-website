"use client";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type {
  ChangeEvent,
} from "react";

import type {
  Category,
} from "@/types/category.types";


interface BlogsFiltersProps {

  search:
    string;

  status:
    string;

  category:
    string;

  categories:
    Category[];

  onSearchChange:
    (
      value: string,
    ) => void;

  onStatusChange:
    (
      value: string,
    ) => void;

  onCategoryChange:
    (
      value: string,
    ) => void;

  onClear:
    () => void;

}


export default function BlogsFilters({

  search,

  status,

  category,

  categories,

  onSearchChange,

  onStatusChange,

  onCategoryChange,

  onClear,

}: BlogsFiltersProps) {

  const hasActiveFilters =
    Boolean(
      search ||
      status ||
      category,
    );


  return (

    <div className="border-b border-white/10 p-5">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">


        {/* SEARCH */}

        <div className="relative flex-1">

          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(
              event: ChangeEvent<HTMLInputElement>,
            ) =>
              onSearchChange(
                event.target.value,
              )
            }
            placeholder="Search blogs..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              py-2.5
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-slate-600
              focus:border-violet-500/50
              focus:bg-white/[0.05]
            "
          />

        </div>


        {/* STATUS */}

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value,
            )
          }
          className="
            rounded-xl
            border
            border-white/10
            bg-[#111114]
            px-4
            py-2.5
            text-sm
            text-slate-300
            outline-none
            focus:border-violet-500/50
          "
        >

          <option value="">
            All Status
          </option>

          <option value="published">
            Published
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="draft">
            Draft
          </option>

          <option value="rejected">
            Rejected
          </option>

          <option value="unpublished">
            Unpublished
          </option>

        </select>


        {/* CATEGORY */}

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value,
            )
          }
          className="
            rounded-xl
            border
            border-white/10
            bg-[#111114]
            px-4
            py-2.5
            text-sm
            text-slate-300
            outline-none
            focus:border-violet-500/50
          "
        >

          <option value="">
            All Categories
          </option>


          {categories.map(
            (categoryItem) => (

              <option
                key={
                  categoryItem._id
                }
                value={
                  categoryItem._id
                }
              >

                {categoryItem.name}

              </option>

            ),
          )}

        </select>


        {/* FILTER INDICATOR */}

        <div
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
            text-slate-400
          "
        >

          <SlidersHorizontal className="h-4 w-4" />

          {hasActiveFilters
            ? "Filters Active"
            : "Filters"}

        </div>


        {/* CLEAR */}

        <button
          type="button"
          onClick={onClear}
          disabled={
            !hasActiveFilters
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-slate-500
            transition
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          <X className="h-4 w-4" />

          Clear

        </button>

      </div>

    </div>

  );

}