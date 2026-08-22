"use client";

import { useEffect } from "react";
import {
  Bell,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  getMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/redux/slice/notification/notificationSlice";

export default function ReaderNotificationsPage() {
  const dispatch = useAppDispatch();

  const {
    notifications,
    unreadCount,
    loading,
    error,
  } = useAppSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    dispatch(
      getMyNotifications({
        page: 1,
        limit: 30,
      }),
    );
  }, [dispatch]);

  const handleMarkAll = async () => {
    try {
      await dispatch(
        markAllNotificationsAsRead(),
      ).unwrap();

      toast.success(
        "Notifications marked as read",
      );
    } catch (reason) {
      toast.error(
        typeof reason === "string"
          ? reason
          : "Unable to update notifications",
      );
    }
  };

  return (
    <main className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-500/10
            "
          >
            <Bell className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-sm text-violet-400">
              Stay up to date
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              Notifications
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMarkAll}
          disabled={!unreadCount || loading}
          className="
            rounded-xl
            border
            border-white/10
            bg-white/[0.02]
            px-4
            py-2.5
            text-sm
            text-slate-300
            transition
            hover:bg-white/[0.05]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Mark all read
        </button>
      </header>

      {/* ERROR */}
      {error && (
        <div
          className="
            rounded-xl
            border
            border-rose-500/20
            bg-rose-500/10
            px-4
            py-3
            text-sm
            text-rose-400
          "
        >
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading &&
        !notifications.length && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    h-28
                    animate-pulse
                    rounded-2xl
                    bg-white/[0.05]
                  "
                />
              ),
            )}
          </div>
        )}

      {/* EMPTY */}
      {!loading &&
        !notifications.length && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-white/10
              bg-[#111114]
              p-12
              text-center
            "
          >
            <Bell className="mx-auto h-8 w-8 text-slate-700" />

            <p className="mt-3 text-sm text-slate-500">
              You have no notifications.
            </p>
          </div>
        )}

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map(
            (notification) => (
              <button
                type="button"
                key={notification._id}
                onClick={() => {
                  if (
                    !notification.isRead
                  ) {
                    dispatch(
                      markNotificationAsRead(
                        notification._id,
                      ),
                    );
                  }
                }}
                className={`
                  w-full
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition
                  hover:border-violet-500/30
                  ${
                    notification.isRead
                      ? "border-white/10 bg-[#111114]"
                      : "border-violet-500/20 bg-violet-500/[0.06]"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-medium text-white">
                      {notification.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {new Date(
                        notification.createdAt,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>

                  {notification.isRead && (
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                </div>
              </button>
            ),
          )}
        </div>
      )}
    </main>
  );
}