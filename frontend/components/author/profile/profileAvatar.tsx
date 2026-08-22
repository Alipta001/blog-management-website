"use client";

import Image from "next/image";

import {
  Camera,
  Mail,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import type {
  User,
} from "@/types/user.types";


interface ProfileAvatarProps {
  user: User;
}


export default function ProfileAvatar({
  user,
}: ProfileAvatarProps) {

  const initials =
    user.name
      ?.split(" ")
      .map(
        (name) =>
          name.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();


  return (
    <section className="h-fit rounded-2xl border border-white/10 bg-[#09090b] p-6">

      {/* =================================
          AVATAR
      ================================= */}

      <div className="flex flex-col items-center text-center">

        <div className="relative">

          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-violet-500/10 text-3xl font-semibold text-violet-400">

            {user.profileImage ? (

              <Image
                src={user.profileImage}
                alt={user.name}
                fill
                className="object-cover"
              />

            ) : (

              initials

            )}

          </div>


          <button
            type="button"
            className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#18181b] text-slate-300 transition hover:bg-violet-500 hover:text-white"
          >
            <Camera className="h-4 w-4" />
          </button>

        </div>


        <h2 className="mt-5 text-lg font-semibold text-white">
          {user.name}
        </h2>


        <p className="mt-1 text-sm capitalize text-violet-400">
          {user.role}
        </p>

      </div>


      {/* =================================
          DETAILS
      ================================= */}

      <div className="mt-6 space-y-4 border-t border-white/10 pt-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-400">

            <Mail className="h-4 w-4" />

          </div>

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              Email
            </p>

            <p className="truncate text-sm text-slate-300">
              {user.email}
            </p>

          </div>

        </div>


        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-400">

            <ShieldCheck className="h-4 w-4" />

          </div>

          <div>

            <p className="text-xs text-slate-500">
              Account Status
            </p>

            <p className="text-sm capitalize text-emerald-400">
              {user.status}
            </p>

          </div>

        </div>


        {user.createdAt && (

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-400">

              <CalendarDays className="h-4 w-4" />

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Member Since
              </p>

              <p className="text-sm text-slate-300">

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