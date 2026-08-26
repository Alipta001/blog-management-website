"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/slice/blog/blogSlice";
import { getCategories } from "@/redux/slice/category/categorySlice";
import PublicNavbar from "@/components/landing/PublicNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedBlogs from "@/components/landing/FeaturedBlogs";
import LatestBlogs from "@/components/landing/LatestBlogs";
import WhyJoinSection from "@/components/landing/WhyJoinSection";
import CategorySection from "@/components/landing/CategorySection";
import LandingCTA from "@/components/landing/LandingCTA";
import PublicFooter from "@/components/landing/PublicFooter";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated, authInitialized } = useAppSelector((state) => state.auth);
  const { blogs, loading: blogsLoading } = useAppSelector((state) => state.blog);
  const [query, setQuery] = useState("");

  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => { dispatch(getBlogs({ page: 1, limit: 12, sort: "latest" })); dispatch(getCategories()); }, [dispatch]);
  useEffect(() => {
    if (!authInitialized || loading || !isAuthenticated || !user) return;
    const destination = user.role === "administration" ? "/dashboard/administration" : user.role === "author" ? "/dashboard/author" : user.role === "user" ? "/dashboard/reader" : "/login";
    router.replace(destination);
  }, [authInitialized, isAuthenticated, loading, router, user]);

  const visibleBlogs = useMemo(() => blogs.filter((blog) => !query.trim() || `${blog.title} ${blog.description}`.toLowerCase().includes(query.toLowerCase())), [blogs, query]);
  const featured = blogs[0];

  return <main className="landing-page theme-page min-h-screen"><PublicNavbar /><HeroSection /><FeaturedBlogs blog={featured} /><div className="border-t border-slate-200 dark:border-slate-800"><LatestBlogs blogs={visibleBlogs.filter((blog) => blog._id !== featured?._id).slice(0, 6)} loading={blogsLoading} query={query} onQueryChange={setQuery} /></div><CategorySection categories={categories} /><WhyJoinSection /><LandingCTA /><PublicFooter /></main>;
}
