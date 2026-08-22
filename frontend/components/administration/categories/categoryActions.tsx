"use client";

import {
  Check,
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";


interface CategoryActionsProps {

  isActive:
    boolean;

  onEdit:
    () => void;

  onActivate:
    () => void;

  onDeactivate:
    () => void;

  onDelete:
    () => void;

}


export default function CategoryActions({
  isActive,
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
}: CategoryActionsProps) {

  const [

    open,

    setOpen,

  ] =
    useState(false);


  return (

    <div className="relative flex justify-end">

      <button

        type="button"

        onClick={() =>
          setOpen(
            !open,
          )
        }

        className="
          rounded-lg
          p-2
          text-slate-400
          transition
          hover:bg-white/5
          hover:text-white
        "
      >

        <MoreHorizontal className="h-5 w-5" />

      </button>


      {open && (

        <div className="
          absolute
          right-0
          top-10
          z-20
          w-44
          overflow-hidden
          rounded-xl
          border
          border-white/10
          bg-[#1a2233]
          py-1
          shadow-xl
        ">

          <button

            type="button"

            onClick={() => {

              onEdit();

              setOpen(
                false,
              );

            }}

            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-2.5
              text-left
              text-sm
              text-slate-300
              hover:bg-white/5
            "
          >

            <Pencil className="h-4 w-4" />

            Edit

          </button>


          {isActive ? (

            <button

              type="button"

              onClick={() => {

                onDeactivate();

                setOpen(
                  false,
                );

              }}

              className="
                flex
                w-full
                items-center
                gap-2
                px-4
                py-2.5
                text-left
                text-sm
                text-amber-400
                hover:bg-white/5
              "
            >

              <Power className="h-4 w-4" />

              Deactivate

            </button>

          ) : (

            <button

              type="button"

              onClick={() => {

                onActivate();

                setOpen(
                  false,
                );

              }}

              className="
                flex
                w-full
                items-center
                gap-2
                px-4
                py-2.5
                text-left
                text-sm
                text-emerald-400
                hover:bg-white/5
              "
            >

              <Check className="h-4 w-4" />

              Activate

            </button>

          )}


          <div className="my-1 border-t border-white/10" />


          <button

            type="button"

            onClick={() => {

              onDelete();

              setOpen(
                false,
              );

            }}

            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-2.5
              text-left
              text-sm
              text-red-400
              hover:bg-red-500/10
            "
          >

            <Trash2 className="h-4 w-4" />

            Delete

          </button>

        </div>

      )}

    </div>

  );

}