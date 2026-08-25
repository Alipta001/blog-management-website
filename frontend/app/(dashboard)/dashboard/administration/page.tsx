"use client";

import { useEffect } from "react";

import DashboardHeader from "@/components/administration/dashboard/dashboard-header";

import StatsGrid from "@/components/administration/dashboard/stats-grid";

import RecentBlogs from "@/components/administration/dashboard/recent-blogs";


import ActivityFeed from "@/components/administration/dashboard/activity-feed";
import RecentUsers from "@/components/administration/dashboard/recent-users";
import { useAppDispatch } from "@/redux/hooks";
import { getAdminBlogs } from "@/redux/slice/blog/blogSlice";
import { getAllCommentsForAdministration } from "@/redux/slice/comment/commentSlice";
import { getUsers } from "@/redux/slice/user/userSlice";


export default function AdministrationDashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdminBlogs({ page: 1, limit: 5 }));
    dispatch(getUsers({ page: 1, limit: 5 }));
    dispatch(getAllCommentsForAdministration({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-8">

      {/* Dashboard Welcome Section */}
      <DashboardHeader />


      {/* Statistics */}
      <StatsGrid />


      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">

        {/* Left Content */}
        <div className="space-y-6 2xl:col-span-2">

          <RecentBlogs />

          <RecentUsers />

        </div>


        {/* Right Content */}
        <div>
          <ActivityFeed />
        </div>

      </div>

    </div>
  );
}