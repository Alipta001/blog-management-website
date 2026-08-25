"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { sidebarConfig } from "./sidebar.config";

import type { UserRole } from "@/types/user.types";


interface MobileSidebarProps {
  role: UserRole;
}


export default function MobileSidebar({
  role,
}: MobileSidebarProps) {

  const [isOpen, setIsOpen] =
    useState(false);

  const pathname = usePathname();

  const navigationItems =
    sidebarConfig[role] || [];

  const dashboardRoot =
    role === "user"
      ? "/dashboard/reader"
      : role === "author"
        ? "/dashboard/author"
        : "/dashboard/administration";


  return (
    <>

      {/* MOBILE BUTTON */}

      <div className="fixed bottom-5 right-5 z-50 lg:hidden">

        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-violet-600 text-white shadow-xl shadow-violet-600/20 transition hover:scale-105"
        >

          <Menu className="h-5 w-5" />

        </button>

      </div>


      {/* OVERLAY */}

      {isOpen && (

        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        />

      )}


      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-72 flex-col border-r border-white/10 bg-[#0d0d0f] transition-transform duration-300 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* HEADER */}

        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-6">

          <Link
            href={`/dashboard/${role}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white">

              B

            </div>


            <div>

              <h1 className="font-bold text-white">
                GolpoKotha
              </h1>

              <p className="text-xs capitalize text-slate-500">
                {role}
              </p>

            </div>

          </Link>


          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 transition hover:text-white"
          >

            <X className="h-5 w-5" />

          </button>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 space-y-1 px-4 py-6">

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
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
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
                        : "text-slate-500"
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

      </aside>

    </>
  );
}