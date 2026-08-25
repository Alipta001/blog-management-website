// "use client";

// import { useMemo } from "react";

// import {
//   CalendarDays,
//   Sparkles,
// } from "lucide-react";


// export default function DashboardHeader() {

//   const greeting = useMemo(() => {
//     const hour =
//       new Date().getHours();

//     if (hour < 12) {
//       return "Good morning";
//     }

//     if (hour < 18) {
//       return "Good afternoon";
//     }

//     return "Good evening";
//   }, []);


//   const date =
//     new Intl.DateTimeFormat(
//       "en-US",
//       {
//         weekday: "long",
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//       }
//     ).format(new Date());


//   return (
//     <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#15151b] via-[#111116] to-violet-950/30 p-6 sm:p-8">

//       <div className="relative">

//         <div className="flex items-center gap-2 text-sm text-slate-500">

//           <CalendarDays className="h-4 w-4" />

//           {date}

//         </div>


//         <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

//           <div>

//             <div className="flex items-center gap-2">

//               <Sparkles className="h-5 w-5 text-violet-400" />

//               <span className="text-sm font-medium text-violet-400">
//                 Administration Center
//               </span>

//             </div>


//             <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">

//               {greeting}, Administrator

//             </h1>


//             <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">

//               Monitor your platform, manage  users, review content,
//               and keep track of your entire blog ecosystem from
//               one powerful workspace.

//             </p>

//           </div>


//           <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">

//             <p className="text-xs uppercase tracking-wider text-slate-500">
//               Platform Status
//             </p>

//             <div className="mt-2 flex items-center gap-2">

//               <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

//               <span className="text-sm font-medium text-white">
//                 All systems operational
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// src/components/dashboard/common/dashboard-header.tsx

"use client";

import { useMemo } from "react";

import {
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";



export default function DashboardHeader() {

  const profile =
    useAppSelector(
      (state) => state.user.profile
    );


  const greeting = useMemo(() => {

    const hour =
      new Date().getHours();


    if (hour < 12) {
      return "Good morning";
    }


    if (hour < 18) {
      return "Good afternoon";
    }


    return "Good evening";

  }, []);


  const date =
    useMemo(() => {

      return new Intl.DateTimeFormat(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      ).format(new Date());

    }, []);


  const roleLabel =
    profile?.role === "administrator"
      ? "Administration Center"
      : profile?.role === "author"
      ? "Author Workspace"
      : "Reader Workspace";


  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 dark:border-white/10 dark:from-[#15151b] dark:via-[#111116] dark:to-violet-950/30 sm:p-8">

      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-500">

          <CalendarDays className="h-4 w-4" />

          {date}

        </div>


        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-violet-400" />

              <span className="text-sm font-medium text-violet-400">

                {roleLabel}

              </span>

            </div>


            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">

              {greeting}
              {profile?.name
                ? `, ${profile.name}`
                : ""}

            </h1>


            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">

              {profile?.role === "administrator"
                ? "Monitor your platform, manage users, review content, and keep track of your entire blog ecosystem from one powerful workspace."
                : profile?.role === "author"
                ? "Manage your content, track your writing activity, and grow your audience from one powerful workspace."
                : "Discover content, manage your reading activity, and stay connected with the latest blogs."}

            </p>

          </div>


          <div className="rounded-2xl border border-violet-200 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">

            <p className="text-xs uppercase tracking-wider text-slate-500">

              Platform Status

            </p>


            <div className="mt-2 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-sm font-medium text-slate-900 dark:text-white">

                All systems operational

              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}