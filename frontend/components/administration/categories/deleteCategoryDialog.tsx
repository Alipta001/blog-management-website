"use client";

import {
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";

import type {
  Category,
} from "@/types/category.types";


interface DeleteCategoryDialogProps {

  open:
    boolean;

  category:
    Category | null;

  loading:
    boolean;

  onClose:
    () => void;

  onConfirm:
    () =>
      Promise<void>;

}


export default function DeleteCategoryDialog({
  open,
  category,
  loading,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) {

  if (
    !open ||
    !category
  ) {

    return null;

  }


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">

        <div className="flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">

            <AlertTriangle className="h-5 w-5 text-red-400" />

          </div>


          <button

            type="button"

            onClick={
              onClose
            }

            disabled={
              loading
            }

            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"

          >

            <X className="h-5 w-5" />

          </button>

        </div>


        <h2 className="mt-5 text-lg font-semibold text-white">

          Delete Category

        </h2>


        <p className="mt-2 text-sm leading-6 text-slate-400">

          Are you sure you want to delete{" "}

          <span className="font-medium text-white">

            {category.name}

          </span>

          ?

          This action may affect blogs associated with this category.

        </p>


        <div className="mt-6 flex justify-end gap-3">

          <button

            type="button"

            onClick={
              onClose
            }

            disabled={
              loading
            }

            className="
              rounded-xl
              border
              border-white/10
              px-4
              py-2.5
              text-sm
              text-slate-300
              hover:bg-white/5
            "
          >

            Cancel

          </button>


          <button

            type="button"

            onClick={
              onConfirm
            }

            disabled={
              loading
            }

            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading && (

              <Loader2 className="h-4 w-4 animate-spin" />

            )}

            Delete Category

          </button>

        </div>

      </div>

    </div>

  );

}