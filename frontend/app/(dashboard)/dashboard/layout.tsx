"use client";

import type { ReactNode } from "react";

import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store/store";

import Sidebar from "@/components/layout/sidebar/sidebar";

import Navbar from "@/components/layout/navbar/navbar";

import MobileSidebar from "@/components/layout/sidebar/mobileSidebar";


interface DashboardLayoutProps {
  children: ReactNode;
}


export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const {
    user,
    loading,
    authInitialized,
  } = useSelector(
    (state: RootState) => state.auth
  );


  // Wait while authentication state is loading
  if (!authInitialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">

        <div className="flex flex-col items-center gap-4">

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />

          <p className="text-sm text-zinc-400">
            Loading your workspace...
          </p>

        </div>

      </div>
    );
  }


  // Do not render dashboard components without user
  if (!user) {
    return null;
  }


  const role = user.role;


  return (
    <div className="min-h-screen bg-[#09090b] text-white">

      {/* Desktop Sidebar */}

      <Sidebar
        role={role}
      />


      {/* Main Area */}

      <div className="lg:pl-72">

        {/* Navbar */}

        <Navbar
          role={role}
          user={user}
        />


        {/* Mobile Sidebar */}

        <MobileSidebar
          role={role}
        />


        {/* Page Content */}

        <main className="min-h-[calc(100vh-72px)] px-4 py-6 sm:px-6 lg:px-8">

          {children}

        </main>

      </div>

    </div>
  );
}