"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  BarChart3,
  ChevronRight,
} from "lucide-react";

import { sidebarConfig } from "./sidebar.config";

import type { UserRole } from "@/types/user.types";


interface SidebarProps {
  role: UserRole;
}


export default function Sidebar({
  role,
}: SidebarProps) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contrastDemo = searchParams.get("demo") === "contrast";

  const navigationItems =
    sidebarConfig[role] || [];

  const dashboardRoot =
    role === "user"
      ? "/dashboard/reader"
      : role === "author"
        ? "/dashboard/author"
        : "/dashboard/administration";


  const roleLabel =
    role.charAt(0).toUpperCase() +
    role.slice(1);


  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#0d0d0f] lg:flex lg:flex-col"
      data-contrast-demo={contrastDemo ? "true" : undefined}
    >

      {/* LOGO */}

      <div className="flex h-[72px] items-center border-b border-white/10 px-6">

        <Link
          href={
            role === "user"
              ? "/dashboard/reader"
              : `/dashboard/${role}`
          }
          className="flex items-center gap-3"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-500/20">
            B
          </div>


          <div>

            <h1 className="font-bold tracking-tight text-white">
              GolpoKotha
            </h1>

            <p className="text-xs text-slate-500">
              {roleLabel}
            </p>

          </div>

        </Link>

      </div>


      {/* NAVIGATION */}

      <nav className="flex-1 space-y-1 px-4 py-6">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>


        {navigationItems.map((item) => {

          const Icon = item.icon;


          const isActive =
            item.href === dashboardRoot
              ? pathname === item.href
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);


          return (

            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >

              <div className="flex items-center gap-3">

                <Icon
                  className={`h-5 w-5 ${
                    isActive
                      ? "text-violet-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />

                <span className="font-medium">
                  {item.name}
                </span>

              </div>


              {isActive && (
                <ChevronRight className="h-4 w-4 text-violet-400" />
              )}

            </Link>

          );

        })}

      </nav>


      {/* BOTTOM CARD */}

      <div className="p-4">

        <div className="demo-sidebar-box rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-start gap-3">

            <div className="demo-sidebar-icon rounded-xl bg-violet-600 p-2 text-white dark:bg-violet-500/20 dark:text-violet-300">

              <BarChart3 className="h-5 w-5 text-violet-400" />

            </div>


            <div>

              <p className="sidebar-workspace-title text-sm font-semibold text-slate-950 dark:text-slate-100">

                {role === "administration"
                  ? "Platform Insights"
                  : "Your Workspace"}

              </p>


              <p className="sidebar-workspace-subtitle mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">

                {role === "administration"
                  ? "Monitor your content and community activity."
                  : "Manage your activity and content."}

              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}