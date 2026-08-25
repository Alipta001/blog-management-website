"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  UserRound,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useDispatch,
} from "react-redux";

import type {
  User,
  UserRole,
} from "@/types/user.types";

import type {
  AppDispatch,
} from "@/redux/store/store";

import {
  logoutUser,
} from "@/redux/slice/auth/authSlice";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "@/redux/slice/notification/notificationSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import ThemeToggle from "@/components/common/theme/theme-toggle";


 
// PROPS
 

interface NavbarProps {
  role: UserRole;

  user: User;
}


 
// ROLE PROFILE ROUTES
 

const profileRoutes: Record<
  UserRole,
  string
> = {
  administration:
    "/dashboard/administration/profile",

  administrator:
    "/dashboard/administration/profile",

  author:
    "/dashboard/author/profile",

  user:
    "/dashboard/reader/profile",
};


 
// NAVBAR
 

export default function Navbar({
  role,
  user,
}: NavbarProps) {

  const router =
    useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const appDispatch =
    useAppDispatch();

  const {
    notifications,
    unreadCount,
  } = useAppSelector(
    (state) => state.notification,
  );


  const [
    isProfileOpen,
    setIsProfileOpen,
  ] = useState(false);

  const [
    isNotificationsOpen,
    setIsNotificationsOpen,
  ] = useState(false);

  useEffect(() => {
    if (isNotificationsOpen) {
      appDispatch(
        getMyNotifications({
          page: 1,
          limit: 5,
        }),
      );
    }
  }, [appDispatch, isNotificationsOpen]);


   
  // ROLE LABEL
   

  const roleLabel =
    role.charAt(0).toUpperCase() +
    role.slice(1);


   
  // USER INITIALS
   

  const initials =
    user?.name
      ?.split(" ")
      .map(
        (name) =>
          name.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase()
    || "U";


   
  // LOGOUT
   

  const handleLogout =
    async () => {

      try {

        await dispatch(
          logoutUser(),
        ).unwrap();


        setIsProfileOpen(false);


        router.push(
          "/login",
        );

      } catch (error) {

        console.error(
          "Logout failed:",
          error,
        );

      }

    };


   
  // GO TO PROFILE
   

  const handleProfile =
    () => {

      setIsProfileOpen(false);


      router.push(
        profileRoutes[role] ||
        "/dashboard/user/profile",
      );

    };


  return (
    <header
      className="
        sticky top-0 z-30
        flex h-[72px]
        items-center justify-between
        border-b border-white/10
        bg-[#09090b]/80
        theme-navbar
        px-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
    >

      {/*                             =====
          RIGHT SIDE
                                  ===== */}

      <div
        className="
          ml-auto
          flex items-center gap-3
        "
      >

        <ThemeToggle />

        {/*                             =====
            NOTIFICATION
                                    ===== */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(
                (previous) => !previous,
              );
              setIsProfileOpen(false);
            }}
            aria-label="Open notifications"
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              theme-control
              text-slate-400
              transition
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-80 overflow-hidden rounded-xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">Notifications</p>
                <span className="text-xs text-slate-500">{unreadCount} unread</span>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-slate-500">
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification._id}
                      type="button"
                      onClick={() => {
                        if (!notification.isRead) {
                          appDispatch(
                            markNotificationAsRead(
                              notification._id,
                            ),
                          );
                        }
                      }}
                      className={`w-full rounded-lg px-3 py-3 text-left transition hover:bg-white/[0.06] ${notification.isRead ? "" : "bg-violet-500/[0.08]"}`}
                    >
                      <p className="text-sm font-medium text-white">
                        {notification.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                        {notification.message}
                      </p>
                    </button>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsNotificationsOpen(false);
                  router.push(
                    role === "administration" ||
                    role === "administrator"
                      ? "/dashboard/administration/notifications"
                      : role === "author"
                        ? "/dashboard/author/notifications"
                        : "/dashboard/reader/notifications",
                  );
                }}
                className="w-full border-t border-white/10 px-4 py-3 text-left text-xs font-medium text-violet-400 hover:bg-white/[0.04]"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>


        {/*                             =====
            PROFILE DROPDOWN
                                    ===== */}

        <div className="relative">

          {/*                             =====
              PROFILE TRIGGER
                                      ===== */}

          <button
            type="button"
            onClick={() =>
              setIsProfileOpen(
                (previous) =>
                  !previous,
              )
            }
            className="
              flex items-center gap-3
              rounded-xl
              border border-transparent
              px-2 py-1.5
              transition
              hover:border-white/10
              hover:bg-white/[0.04]
            "
          >

            {/* User Information */}

            <div
              className="
                hidden
                text-right
                sm:block
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {user?.name || "User"}
              </p>

              <p
                className="
                  text-xs
                  capitalize
                  text-slate-500
                "
              >
                {roleLabel}
              </p>

            </div>


            {/* Avatar */}

            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-indigo-600
                text-sm
                font-semibold
                text-white
              "
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name || "Profile"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>


            {/* Chevron */}

            <ChevronDown
              className={`
                hidden
                h-4 w-4
                text-slate-500
                transition-transform
                sm:block
                ${
                  isProfileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>


          {/*                             =====
              DROPDOWN MENU
                                      ===== */}

          {isProfileOpen && (

            <div
              className="
                absolute
                right-0
                top-[calc(100%+10px)]
                w-56
                overflow-hidden
                rounded-xl
                border border-white/10
                bg-[#111113]
                theme-menu
                shadow-2xl
                shadow-black/40
              "
            >

            <ThemeToggle />

              {/*                             =====
                  DROPDOWN HEADER
                                          ===== */}

              <div
                className="
                  border-b
                  border-white/10
                  px-4 py-3
                "
              >

                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {user?.name || "User"}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {user?.email || ""}
                </p>

              </div>


              {/*                             =====
                  MENU ITEMS
                                          ===== */}

              <div className="p-1.5">

                {/* Profile */}

                <button
                  type="button"
                  onClick={
                    handleProfile
                  }
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-slate-300
                    transition
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >

                  <UserRound
                    className="
                      h-4 w-4
                      text-slate-500
                    "
                  />

                  <span>
                    Profile
                  </span>

                </button>


                {/* Logout */}

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm
                    text-red-400
                    transition
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >

                  <LogOut
                    className="
                      h-4 w-4
                    "
                  />

                  <span>
                    Logout
                  </span>

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}