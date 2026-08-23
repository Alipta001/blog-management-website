// import Link from "next/link";

// import {
//   ArrowUpRight,
//   BookOpen,
//   Clock3,
// } from "lucide-react";


// const blogs = [
//   {
//     id: "1",
//     title: "The Future of Artificial Intelligence in Modern Development",
//     author: "Sarah Johnson",
//     status: "Published",
//     time: "2 hours ago",
//   },
//   {
//     id: "2",
//     title: "Understanding Modern Web Architecture",
//     author: "Michael Chen",
//     status: "Pending",
//     time: "4 hours ago",
//   },
//   {
//     id: "3",
//     title: "Building a Strong Personal Brand as a Developer",
//     author: "Emma Williams",
//     status: "Published",
//     time: "Yesterday",
//   },
// ];


// export default function RecentBlogs() {
//   return (
//     <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">

//       <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

//         <div>

//           <h2 className="font-semibold text-white">
//             Recent Blogs
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Latest content activity
//           </p>

//         </div>


//         <Link
//           href="/dashboard/administration/blogs"
//           className="flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300"
//         >

//           View all

//           <ArrowUpRight className="h-4 w-4" />

//         </Link>

//       </div>


//       <div className="divide-y divide-white/5">

//         {blogs.map((blog) => (

//           <div
//             key={blog.id}
//             className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-white/[0.02]"
//           >

//             <div className="flex min-w-0 items-center gap-4">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

//                 <BookOpen className="h-5 w-5" />

//               </div>


//               <div className="min-w-0">

//                 <h3 className="truncate text-sm font-semibold text-slate-200">
//                   {blog.title}
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-500">
//                   by {blog.author}
//                 </p>

//               </div>

//             </div>


//             <div className="hidden items-center gap-4 sm:flex">

//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-medium ${
//                   blog.status === "Published"
//                     ? "bg-emerald-500/10 text-emerald-400"
//                     : "bg-amber-500/10 text-amber-400"
//                 }`}
//               >
//                 {blog.status}
//               </span>


//               <span className="flex items-center gap-1 text-xs text-slate-500">

//                 <Clock3 className="h-3.5 w-3.5" />

//                 {blog.time}

//               </span>

//             </div>

//           </div>

//         ))}

//       </div>

//     </section>
//   );
// }



// src/components/dashboard/administrator/recent-blogs.tsx

"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";



export default function RecentBlogs() {

  const {
    adminBlogs = [],
    loading,
  } =
    useAppSelector(
      (state) => state.blog
    );


  const recentBlogs =
    [...adminBlogs]
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


  const formatDate = (
    date: string
  ) => {

    const now =
      new Date();


    const createdDate =
      new Date(date);


    const difference =
      now.getTime() -
      createdDate.getTime();


    const minutes =
      Math.floor(
        difference / 60000
      );


    if (minutes < 1) {
      return "Just now";
    }


    if (minutes < 60) {
      return `${minutes}m ago`;
    }


    const hours =
      Math.floor(
        minutes / 60
      );


    if (hours < 24) {
      return `${hours}h ago`;
    }


    const days =
      Math.floor(
        hours / 24
      );


    if (days === 1) {
      return "Yesterday";
    }


    return `${days} days ago`;
  };


  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]">

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

        <div>

          <h2 className="font-semibold text-white">

            Recent Blogs

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Latest content activity

          </p>

        </div>


        <Link
          href="/dashboard/administration/blogs"
          className="flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300"
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
              className="h-14 animate-pulse rounded-xl bg-white/5"
            />

          ))}

        </div>

      ) : recentBlogs.length === 0 ? (

        <div className="px-6 py-14 text-center">

          <BookOpen className="mx-auto h-8 w-8 text-slate-600" />


          <p className="mt-3 text-sm font-medium text-slate-300">

            No blogs found

          </p>

        </div>

      ) : (

        <div className="divide-y divide-white/5">

          {recentBlogs.map(
            (blog) => {

              const author =
                typeof blog.author ===
                "object"
                  ? blog.author
                  : null;


              return (

                <div
                  key={blog._id}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-white/[0.02]"
                >

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">

                      <BookOpen className="h-5 w-5" />

                    </div>


                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-slate-200">

                        {blog.title}

                      </h3>


                      <p className="mt-1 text-xs text-slate-500">

                        by{" "}

                        {author?.name ??
                          "Unknown author"}

                      </p>

                    </div>

                  </div>


                  <div className="hidden shrink-0 items-center gap-4 sm:flex">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        blog.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : blog.status === "pending"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >

                      {blog.status}

                    </span>


                    <span className="flex items-center gap-1 text-xs text-slate-500">

                      <Clock3 className="h-3.5 w-3.5" />

                      {formatDate(
                        blog.createdAt
                      )}

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