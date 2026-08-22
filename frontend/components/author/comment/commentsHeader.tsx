import {
  MessageSquare,
} from "lucide-react";


interface CommentsHeaderProps {
  totalComments: number;
}


export default function CommentsHeader({
  totalComments,
}: CommentsHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
            <MessageSquare className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white">
              Comments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage comments on your blogs.
            </p>
          </div>

        </div>
      </div>


      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">

        <span className="text-sm text-slate-500">
          Total Comments
        </span>

        <p className="text-lg font-semibold text-white">
          {totalComments}
        </p>

      </div>

    </div>
  );
}