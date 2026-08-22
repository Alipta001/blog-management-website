"use client";

import Link from "next/link";

import {
  CalendarDays,
  Plus,
  Sparkles,
} from "lucide-react";

import {
  useAppSelector,
} from "@/redux/hooks";


export default function AuthorDashboardHeader() {

  const profile =
    useAppSelector(
      (state) =>
        state.user.profile
    );


  const hour =
    new Date().getHours();


  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";


  const date =
    new Intl.DateTimeFormat(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    ).format(
      new Date()
    );


  return (

    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#15151b] via-[#111116] to-violet-950/40 p-6 sm:p-8">

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />


      <div className="relative">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <CalendarDays className="h-4 w-4" />

          {date}

        </div>


        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-violet-400" />

              <span className="text-sm font-medium text-violet-400">
                Author Workspace
              </span>

            </div>


            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">

              {greeting},{" "}

              {profile?.name || "Author"}

            </h1>


            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">

              Manage your stories, track your publishing progress,
              and continue building your audience.

            </p>

          </div>


          <Link
            href="/dashboard/author/createBlog"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
          >

            <Plus className="h-4 w-4" />

            Create New Blog

          </Link>

        </div>

      </div>

    </section>

  );
}