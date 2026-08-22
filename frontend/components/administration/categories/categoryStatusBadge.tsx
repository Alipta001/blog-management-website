"use client";


interface CategoryStatusBadgeProps {

  isActive:
    boolean;

}


export default function CategoryStatusBadge({
  isActive,
}: CategoryStatusBadgeProps) {

  return (

    <span

      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium

        ${
          isActive
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }
      `}
    >

      {
        isActive
          ? "Active"
          : "Inactive"
      }

    </span>

  );

}