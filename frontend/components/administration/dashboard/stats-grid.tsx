// import {
//   BookOpen,
//   FileClock,
//   MessageSquare,
//    Users,
// } from "lucide-react";

// import StatCard from "./stat-card";


// export default function StatsGrid() {
//   return (
//     <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

//       <StatCard
//         title="Total users"
//         value="12,846"
//         description="vs last month"
//         trend={12.5}
//         icon={<Users className="h-6 w-6" />}
//       />


//       <StatCard
//         title="Published Blogs"
//         value="3,284"
//         description="vs last month"
//         trend={8.2}
//         icon={<BookOpen className="h-6 w-6" />}
//       />


//       <StatCard
//         title="Pending Reviews"
//         value="48"
//         description="requires attention"
//         trend={-4.6}
//         icon={<FileClock className="h-6 w-6" />}
//       />


//       <StatCard
//         title="Total Comments"
//         value="8,942"
//         description="vs last month"
//         trend={18.4}
//         icon={<MessageSquare className="h-6 w-6" />}
//       />

//     </section>
//   );
// }


// src/components/dashboard/administrator/stats/stats-grid.tsx

"use client";

import {
  BookOpen,
  FileClock,
  MessageSquare,
  Users,
} from "lucide-react";


import StatCard from "./stat-card";
import { useAppSelector } from "@/redux/hooks";


export default function StatsGrid() {

  const userState =
    useAppSelector(
      (state) => state.user
    );


  const blogState =
    useAppSelector(
      (state) => state.blog
    );


  const totalUsers =
    userState.pagination?.total ??
    userState.users.length;


  const blogs =
    blogState.blogs ?? [];


  const totalBlogs =
    blogState.pagination?.total ??
    blogs.length;


  const publishedBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "published"
    ).length;


  const pendingBlogs =
    blogs.filter(
      (blog) =>
        blog.status === "pending"
    ).length;


  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

      <StatCard
        title="Total Users"
        value={totalUsers}
        description="Registered platform members"
        icon={
          <Users className="h-6 w-6" />
        }
      />


      <StatCard
        title="Published Blogs"
        value={publishedBlogs}
        description={`${totalBlogs} total blogs`}
        icon={
          <BookOpen className="h-6 w-6" />
        }
      />


      <StatCard
        title="Pending Reviews"
        value={pendingBlogs}
        description="Requires attention"
        icon={
          <FileClock className="h-6 w-6" />
        }
      />


      <StatCard
        title="Total Comments"
        value="—"
        description="Analytics endpoint required"
        icon={
          <MessageSquare className="h-6 w-6" />
        }
      />

    </section>
  );
}