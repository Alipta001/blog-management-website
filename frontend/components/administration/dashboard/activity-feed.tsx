import {
  UserPlus,
  FileCheck,
  MessageSquare,
  Heart,
} from "lucide-react";

const activities = [
  {
    title: "New  user registered",

    description: "Priya Sharma joined the platform",

    time: "5 minutes ago",

    icon:  UserPlus,
  },

  {
    title: "Blog published",

    description: "Understanding React Server Components",

    time: "32 minutes ago",

    icon: FileCheck,
  },

  {
    title: "New comment",

    description: "A comment requires moderation",

    time: "1 hour ago",

    icon: MessageSquare,
  },

  {
    title: "New engagement",

    description: "A blog received multiple likes",

    time: "2 hours ago",

    icon: Heart,
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-base font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          What's happening on your platform
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex gap-4"
              >
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
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}