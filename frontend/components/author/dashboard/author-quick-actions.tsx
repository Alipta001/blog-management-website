import Link from "next/link";

import {
  BookOpen,
  FilePenLine,
  PenLine,
  Send,
} from "lucide-react";


const actions = [

  {
    title: "Create Blog",

    description:
      "Start writing a new story",

    href:
      "/dashboard/author/createBlog",

    icon:
      <PenLine className="h-5 w-5" />,
  },

  {
    title: "My Blogs",

    description:
      "Manage all your content",

    href:
      "/dashboard/author/myBlogs",

    icon:
      <BookOpen className="h-5 w-5" />,
  },

  {
    title: "Drafts",

    description:
      "Continue unfinished work",

    href:
      "/dashboard/author/drafts",

    icon:
      <FilePenLine className="h-5 w-5" />,
  },

  {
    title: "Pending Review",

    description:
      "Track submitted blogs",

    href:
      "/dashboard/author/myBlogs?status=pending",

    icon:
      <Send className="h-5 w-5" />,
  },

];


export default function AuthorQuickActions() {

  return (

    <section className="rounded-2xl border border-white/10 bg-[#111114] p-6">

      <div>

        <h2 className="font-semibold text-white">

          Quick Actions

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Manage your content faster

        </p>

      </div>


      <div className="mt-6 space-y-3">

        {actions.map(
          (action) => (

            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-violet-500/30 hover:bg-violet-500/[0.05]"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">

                {action.icon}

              </div>


              <div>

                <h3 className="text-sm font-medium text-slate-200">

                  {action.title}

                </h3>


                <p className="mt-1 text-xs text-slate-500">

                  {action.description}

                </p>

              </div>

            </Link>

          )
        )}

      </div>

    </section>

  );
}