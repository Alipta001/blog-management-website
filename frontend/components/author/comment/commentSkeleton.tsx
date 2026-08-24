export default function CommentSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from(
        { length: 6 },
      ).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-white/10 bg-[#09090b] p-5"
        >
          {/*                             =
              HEADER
                                      = */}

          <div className="flex items-start justify-between gap-4">

            {/* USER */}

            <div className="flex items-center gap-3">

              {/* AVATAR */}

              <div className="h-10 w-10 rounded-full bg-white/10" />

              <div className="space-y-2">

                {/* USER NAME */}

                <div className="h-3 w-28 rounded bg-white/10" />

                {/* DATE */}

                <div className="h-2.5 w-20 rounded bg-white/5" />

              </div>

            </div>


            {/* STATUS */}

            <div className="h-6 w-20 rounded-full bg-white/10" />

          </div>


          {/*                             =
              BLOG
                                      = */}

          <div className="mt-5">

            <div className="h-3 w-16 rounded bg-white/5" />

            <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />

          </div>


          {/*                             =
              COMMENT CONTENT
                                      = */}

          <div className="mt-5 space-y-2">

            <div className="h-3 w-full rounded bg-white/5" />

            <div className="h-3 w-[90%] rounded bg-white/5" />

            <div className="h-3 w-[65%] rounded bg-white/5" />

          </div>


          {/*                             =
              FOOTER
                                      = */}

          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

            <div className="h-3 w-28 rounded bg-white/5" />

            <div className="flex gap-2">

              <div className="h-8 w-8 rounded-lg bg-white/5" />

              <div className="h-8 w-8 rounded-lg bg-white/5" />

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}
