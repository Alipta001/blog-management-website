// import Link from "next/link";

// interface BlogNotFoundProps { message?: string; }

// export default function BlogNotFound({ message = "This blog could not be found." }: BlogNotFoundProps) {
//   return <div className="mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-center px-6 text-center"><h1 className="text-2xl font-semibold text-white">Blog unavailable</h1><p className="mt-3 text-sm text-slate-400">{message}</p><Link href="/blogs" className="mt-6 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500">Back to blogs</Link></div>;
// }


import Link from "next/link";
import { FileQuestion } from "lucide-react";

interface BlogNotFoundProps {
  message?: string;
}

export default function BlogNotFound({
  message,
}: BlogNotFoundProps) {
  return (
    <main
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-[#09090b]
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-white/10
          bg-[#111114]
          p-8
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-violet-500/10
          "
        >
          <FileQuestion className="h-6 w-6 text-violet-400" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-white">
          Blog not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message ||
            "The blog you are looking for does not exist or is no longer available."}
        </p>

        <Link
          href="/dashboard/administration/blogs"
          className="
            mt-6
            inline-flex
            rounded-xl
            bg-violet-600
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-violet-500
          "
        >
          Browse blogs
        </Link>
      </div>
    </main>
  );
}