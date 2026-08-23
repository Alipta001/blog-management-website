"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hooks";


export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    authInitialized,
  } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!authInitialized || !user) {
      return;
    }

    const dashboardByRole = {
      administration: "/dashboard/administration",
      administrator: "/dashboard/administration",
      author: "/dashboard/author",
      user: "/dashboard/reader",
    } as const;

    router.replace(dashboardByRole[user.role]);
  }, [authInitialized, router, user]);

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
      <p className="text-sm text-slate-400">
        Loading your workspace...
      </p>
    </div>
  );
}