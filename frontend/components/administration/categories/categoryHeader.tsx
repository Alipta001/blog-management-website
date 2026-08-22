"use client";

import {
  FolderPlus,
  Plus,
} from "lucide-react";


interface CategoryHeaderProps {

  onCreate:
    () => void;

}


export default function CategoryHeader({
  onCreate,
}: CategoryHeaderProps) {

  return (

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">

            <FolderPlus className="h-5 w-5 text-violet-400" />

          </div>


          <div>

            <h1 className="text-2xl font-semibold text-white">

              Categories

            </h1>


            <p className="mt-1 text-sm text-slate-400">

              Organize and manage blog categories.

            </p>

          </div>

        </div>

      </div>


      <button

        type="button"

        onClick={
          onCreate
        }

        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-violet-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-violet-500
        "
      >

        <Plus className="h-4 w-4" />

        Add Category

      </button>

    </div>

  );

}