"use client";

import { useEffect } from "react";

import {
  useRouter,
} from "next/navigation";

import { useAppSelector } from "@/redux/hooks";


interface DashboardLayoutProps {
  children:
    React.ReactNode;
}


export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const router =
    useRouter();


  const {
    user,
    isAuthenticated,
    authInitialized,
    loading,
  } =
    useAppSelector(
      (state) =>
        state.auth
    );


  // =================================
  // REDIRECT
  // =================================

  useEffect(() => {

    if (
      authInitialized &&
      !isAuthenticated
    ) {

      router.replace(
        "/login"
      );

    }

  }, [
    authInitialized,
    isAuthenticated,
    router,
  ]);


  // =================================
  // INITIALIZING
  // =================================

  if (
    !authInitialized ||
    loading
  ) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">

        <div className="text-sm text-slate-400">
          Restoring session...
        </div>

      </div>
    );

  }


  // =================================
  // NOT AUTHENTICATED
  // =================================

  if (
    !isAuthenticated ||
    !user
  ) {

    return null;

  }


  // =================================
  // DASHBOARD
  // =================================

  return (
    <>
      {children}
    </>
  );

}