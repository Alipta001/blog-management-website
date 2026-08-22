// import Link from "next/link";

// import {
//   ArrowUpRight,
// } from "lucide-react";

// const  users = [
//   {
//     name: "Sarah Johnson",

//     email: "sarah@example.com",

//     role: "Author",

//     initials: "SJ",
//   },

//   {
//     name: "Michael Brown",

//     email: "michael@example.com",

//     role: "user",

//     initials: "MB",
//   },

//   {
//     name: "Emily Davis",

//     email: "emily@example.com",

//     role: "Author",

//     initials: "ED",
//   },

//   {
//     name: "David Wilson",

//     email: "david@example.com",

//     role: "user",

//     initials: "DW",
//   },
// ];

// export default function RecentUsers() {
//   return (
//     <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
//       <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
//         <div>
//           <h2 className="text-base font-bold text-slate-900">
//             Recently Joined  users
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             New members on the platform
//           </p>
//         </div>

//         <Link
//           href="/administration/ users"
//           className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
//         >
//           View all

//           <ArrowUpRight className="h-4 w-4" />
//         </Link>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-slate-100 bg-slate-50/50">
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
//                  user
//               </th>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
//                 Role
//               </th>

//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
//                 Status
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-100">
//             { users.map(( user) => (
//               <tr
//                 key={ user.email}
//                 className="transition hover:bg-slate-50"
//               >
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
//                       { user.initials}
//                     </div>

//                     <div>
//                       <p className="text-sm font-semibold text-slate-800">
//                         { user.name}
//                       </p>

//                       <p className="mt-0.5 text-xs text-slate-400">
//                         { user.email}
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className="text-sm text-slate-600">
//                     { user.role}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-right">
//                   <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
//                     Active
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }



// src/components/dashboard/administrator/recent-users.tsx

"use client";

import { useAppSelector } from "@/redux/hooks";
import { ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";




export default function RecentUsers() {

  const {
    users,
    loading,
  } =
    useAppSelector(
      (state) => state.user
    );


  const recentUsers =
    [...users]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(0, 5);


  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

        <div>

          <h2 className="text-base font-semibold text-white">

            Recently Joined Users

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            New members on the platform

          </p>

        </div>


        <Link
          href="/dashboard/administration/users"
          className="flex items-center gap-1 text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >

          View all

          <ArrowUpRight className="h-4 w-4" />

        </Link>

      </div>


      {loading ? (

        <div className="space-y-4 p-6">

          {Array.from(
            { length: 4 }
          ).map((_, index) => (

            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-white/5"
            />

          ))}

        </div>

      ) : recentUsers.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">

            <Users className="h-5 w-5" />

          </div>


          <p className="mt-4 text-sm font-medium text-white">

            No users found

          </p>


          <p className="mt-1 text-xs text-slate-500">

            New users will appear here.

          </p>

        </div>

      ) : (

        <div className="divide-y divide-white/5">

          {recentUsers.map(
            (user) => {

              const initials =
                user.name
                  .split(" ")
                  .map(
                    (name) =>
                      name.charAt(0)
                  )
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();


              return (

                <div
                  key={user._id}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-white/[0.02]"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/10 text-xs font-bold text-violet-300">

                      {user.profileImage ? (

                        <img
                          src={
                            user.profileImage
                          }
                          alt={
                            user.name
                          }
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        initials

                      )}

                    </div>


                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-slate-200">

                        {user.name}

                      </p>


                      <p className="mt-0.5 truncate text-xs text-slate-500">

                        {user.email}

                      </p>

                    </div>

                  </div>


                  <div className="flex shrink-0 items-center gap-3">

                    <span className="hidden text-xs capitalize text-slate-400 sm:block">

                      {user.role}

                    </span>


                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : user.status === "inactive"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >

                      {user.status}

                    </span>

                  </div>

                </div>

              );
            }
          )}

        </div>

      )}

    </section>
  );
}