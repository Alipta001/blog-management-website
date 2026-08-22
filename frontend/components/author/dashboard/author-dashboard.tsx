 "use client";

import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { getMyBlogs } from "@/redux/slice/blog/blogSlice";
import AuthorDashboardHeader from "./author-dashboard-header";
import AuthorStatsGrid from "./author-stats-grid";
import RecentAuthorBlogs from "./recent-author-blogs";
import AuthorQuickActions from "./author-quick-actions";



export default function AuthorDashboard() {

  const dispatch =
    useAppDispatch();


  const {
    myBlogs,
    loading,
  } =
    useAppSelector(
      (state) =>
        state.blog
    );


  useEffect(() => {

    dispatch(
      getMyBlogs({
        page: 1,
        limit: 100,
      })
    );

  }, [dispatch]);


  return (

    <main className="space-y-6">

      <AuthorDashboardHeader />


      <AuthorStatsGrid
        blogs={myBlogs}
        loading={loading}
      />


      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

        <RecentAuthorBlogs
          blogs={myBlogs}
          loading={loading}
        />


        <AuthorQuickActions />

      </div>

    </main>

  );
}