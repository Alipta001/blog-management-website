import {
  UserPlus,
  FileCheck,
  MessageSquare,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import type { Blog } from "@/types/blog.types";
import type { Comment } from "@/types/comment.types";
import type { User } from "@/types/user.types";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: typeof UserPlus;
}

const getName = (value: string | User | null | undefined) =>
  typeof value === "string" ? "Unknown user" : value?.name || "Unknown user";

const getBlogTitle = (blog: string | Blog) =>
  typeof blog === "string" ? "a blog" : blog.title;

const formatRelativeTime = (timestamp: string) => {
  const elapsed = Math.max(0, Date.now() - new Date(timestamp).getTime());
  const minutes = Math.floor(elapsed / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};

export default function ActivityFeed() {
  const { adminBlogs, loading: blogsLoading } = useAppSelector(
    (state) => state.blog,
  );
  const { users, loading: usersLoading } = useAppSelector(
    (state) => state.user,
  );
  const { comments, loading: commentsLoading } = useAppSelector(
    (state) => state.comment,
  );

  const activities: ActivityItem[] = [
    ...users.map((user) => ({
      id: `user-${user._id}`,
      title: "New user registered",
      description: `${user.name} joined the platform`,
      timestamp: user.createdAt,
      icon: UserPlus,
    })),
    ...adminBlogs.map((blog) => ({
      id: `blog-${blog._id}`,
      title: blog.status === "published" ? "Blog published" : "Blog updated",
      description: `${blog.title} was ${blog.status === "published" ? "published" : "updated"}`,
      timestamp: blog.updatedAt || blog.createdAt,
      icon: FileCheck,
    })),
    ...comments.map((comment: Comment) => ({
      id: `comment-${comment._id}`,
      title: comment.status === "approved" ? "Comment approved" : "New comment",
      description: `${getName(comment.user)} commented on ${getBlogTitle(comment.blog)}`,
      timestamp: comment.updatedAt || comment.createdAt,
      icon: MessageSquare,
    })),
  ]
    .filter((activity) => !Number.isNaN(new Date(activity.timestamp).getTime()))
    .sort(
      (first, second) =>
        new Date(second.timestamp).getTime() -
        new Date(first.timestamp).getTime(),
    )
    .slice(0, 8);

  const loading = blogsLoading || usersLoading || commentsLoading;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-base font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          What&apos;s happening on your platform
        </p>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-2/5 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No recent activity yet.
          </p>
        ) : (
          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-4 w-4 text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {activity.description}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-400">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}