"use client";

import Image from "next/image";

import {
  CalendarDays,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  User,
} from "@/types/user.types";


interface ProfileOverviewProps {
  user: User;
}


export default function ProfileOverview({
  user,
}: ProfileOverviewProps) {

   
  // GET INITIALS
   

  const initials =
    user.name
      ?.split(" ")
      .map(
        (word) =>
          word.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "U";


   
  // STATUS STYLE
   

  const statusStyles = {
    active:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    inactive:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    blocked:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };


  const statusClass =
    statusStyles[
      user.status
    ] ||
    statusStyles.active;


  return (

    <section
      className="
        h-fit
        rounded-2xl
        border border-white/10
        bg-[#09090b]
        p-6
      "
    >

      {/*                             =====
          PROFILE AVATAR
                                  ===== */}

      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >

        <div className="relative">

          <div
            className="
              relative
              flex
              h-28
              w-28
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-violet-500/20
              bg-violet-500/10
              text-3xl
              font-semibold
              text-violet-400
            "
          >

            {user.profileImage ? (

              <Image
                src={user.profileImage}
                alt={user.name}
                fill
                sizes="112px"
                className="object-cover"
              />

            ) : (

              initials

            )}

          </div>

        </div>


        <h2 className="mt-5 text-lg font-semibold text-white">
          {user.name}
        </h2>


        <p className="mt-1 text-sm capitalize text-violet-400">
          {user.role}
        </p>


        {/*                             =====
            STATUS
                                    ===== */}

        <span
          className={`
            mt-4
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
            capitalize
            ${statusClass}
          `}
        >
          {user.status}
        </span>

      </div>


      {/*                             =====
          ACCOUNT DETAILS
                                  ===== */}

      <div
        className="
          mt-6
          space-y-5
          border-t
          border-white/10
          pt-6
        "
      >

        {/* EMAIL */}

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white/[0.03]
              text-slate-400
            "
          >

            <Mail className="h-4 w-4" />

          </div>


          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              Email Address
            </p>

            <p className="mt-1 truncate text-sm text-slate-300">
              {user.email}
            </p>

          </div>

        </div>


        {/* ROLE */}

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white/[0.03]
              text-slate-400
            "
          >

            <UserRound className="h-4 w-4" />

          </div>


          <div>

            <p className="text-xs text-slate-500">
              Account Role
            </p>

            <p className="mt-1 text-sm capitalize text-slate-300">
              {user.role}
            </p>

          </div>

        </div>


        {/* STATUS */}

        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white/[0.03]
              text-slate-400
            "
          >

            <ShieldCheck className="h-4 w-4" />

          </div>


          <div>

            <p className="text-xs text-slate-500">
              Account Status
            </p>

            <p className="mt-1 text-sm capitalize text-slate-300">
              {user.status}
            </p>

          </div>

        </div>


        {/* JOIN DATE */}

        {user.createdAt && (

          <div className="flex items-start gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white/[0.03]
                text-slate-400
              "
            >

              <CalendarDays className="h-4 w-4" />

            </div>


            <div>

              <p className="text-xs text-slate-500">
                Member Since
              </p>

              <p className="mt-1 text-sm text-slate-300">

                {new Date(
                  user.createdAt,
                ).toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  },
                )}

              </p>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}