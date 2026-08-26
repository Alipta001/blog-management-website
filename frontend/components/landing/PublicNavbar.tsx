"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogIn, Menu, UserPlus, X } from "lucide-react";
import { useState } from "react";

import ThemeToggle from "@/components/common/theme/theme-toggle";
import { useAppSelector } from "@/redux/hooks";

export default function PublicNavbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const initials = (user?.name || "U").slice(0, 1).toUpperCase();

  return (
    <header className="landing-navbar sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="landing-brand text-xl font-bold tracking-tight text-slate-950 dark:text-white">Golpo<span className="text-violet-600 dark:text-violet-400">Kotha</span></Link>
        <div className="hidden items-center gap-8 md:flex"><Link href="#explore" className="landing-nav-link text-sm font-medium text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400">Explore</Link><Link href="#categories" className="landing-nav-link text-sm font-medium text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400">Categories</Link><ThemeToggle /></div>
        <div className="hidden items-center gap-3 sm:flex">{isAuthenticated ? <Link href={user?.role === "author" ? "/dashboard/author" : user?.role === "administration" ? "/dashboard/administration" : "/dashboard/reader"} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-500 dark:hover:text-violet-400"><span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">{user?.profileImage ? <Image src={user.profileImage} alt="" width={24} height={24} className="h-full w-full object-cover" /> : initials}</span>Dashboard</Link> : <><Link href="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"><LogIn className="h-4 w-4" /> Sign in</Link><Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"><UserPlus className="h-4 w-4" /> Get started</Link></>}</div>
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="rounded-xl border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-300 sm:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>
      {open && <div className="landing-mobile-menu border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950 sm:hidden"><div className="flex flex-col gap-4"><Link href="#explore" onClick={() => setOpen(false)} className="text-sm text-slate-700 dark:text-slate-200">Explore</Link><Link href="#categories" onClick={() => setOpen(false)} className="text-sm text-slate-700 dark:text-slate-200">Categories</Link><ThemeToggle />{isAuthenticated ? <Link href="/dashboard/reader" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link> : <div className="flex gap-3"><Link href="/login" className="text-sm text-slate-600 dark:text-slate-300">Sign in</Link><Link href="/register" className="text-sm font-semibold text-violet-600 dark:text-violet-400">Get started</Link></div>}</div></div>}
    </header>
  );
}
