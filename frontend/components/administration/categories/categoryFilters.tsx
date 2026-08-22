"use client";

import {
  Search,
} from "lucide-react";


interface CategoryFiltersProps {

  search:
    string;

  onSearchChange:
    (
      value: string,
    ) => void;

  status:
    "all" |
    "active" |
    "inactive";

  onStatusChange:
    (
      value:
        "all" |
        "active" |
        "inactive",
    ) => void;

}


export default function CategoryFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: CategoryFiltersProps) {

  return (

    <div className="flex flex-col gap-4 sm:flex-row">

      <div className="relative flex-1">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />


        <input

          value={
            search
          }

          onChange={(
            event,
          ) =>
            onSearchChange(
              event.target.value,
            )
          }

          placeholder="Search categories..."

          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            py-2.5
            pl-10
            pr-4
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-violet-500/50
          "
        />

      </div>


      <select

        value={
          status
        }

        onChange={(
          event,
        ) =>
          onStatusChange(

            event.target
              .value as
              "all" |
              "active" |
              "inactive",

          )
        }

        className="
          rounded-xl
          border
          border-white/10
          bg-[#111827]
          px-4
          py-2.5
          text-sm
          text-slate-300
          outline-none
          focus:border-violet-500/50
        "
      >

        <option value="all">

          All Status

        </option>


        <option value="active">

          Active

        </option>


        <option value="inactive">

          Inactive

        </option>

      </select>

    </div>

  );

}