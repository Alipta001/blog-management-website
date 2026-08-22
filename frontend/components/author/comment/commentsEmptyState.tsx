import {
  MessageSquare,
} from "lucide-react";


export default function CommentsEmptyState() {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#09090b] px-6 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">

        <MessageSquare className="h-7 w-7 text-violet-400" />

      </div>


      <h2 className="mt-5 text-lg font-semibold text-white">
        No comments found
      </h2>


      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Comments from readers on your blogs will appear here.
      </p>

    </div>
  );
}