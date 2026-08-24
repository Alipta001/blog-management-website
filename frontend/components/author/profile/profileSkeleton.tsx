export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">

      {/*                             =====
          HEADER
                                  ===== */}

      <div className="flex items-center gap-4 border-b border-white/10 pb-6">

        <div className="h-11 w-11 animate-pulse rounded-xl bg-white/[0.06]" />


        <div className="space-y-2">

          <div className="h-5 w-32 animate-pulse rounded bg-white/[0.06]" />

          <div className="h-4 w-64 animate-pulse rounded bg-white/[0.04]" />

        </div>

      </div>


      {/*                             =====
          CONTENT
                                  ===== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">


        {/*                             =====
            PROFILE OVERVIEW
                                    ===== */}

        <div className="rounded-2xl border border-white/10 bg-[#09090b] p-6">

          <div className="flex flex-col items-center">

            <div className="h-28 w-28 animate-pulse rounded-2xl bg-white/[0.06]" />


            <div className="mt-5 h-5 w-32 animate-pulse rounded bg-white/[0.06]" />

            <div className="mt-3 h-4 w-20 animate-pulse rounded bg-white/[0.04]" />

            <div className="mt-4 h-6 w-16 animate-pulse rounded-full bg-white/[0.04]" />

          </div>


          <div className="mt-6 space-y-5 border-t border-white/10 pt-6">

            {[1, 2, 3, 4].map(
              (item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <div className="h-9 w-9 animate-pulse rounded-lg bg-white/[0.05]" />


                  <div className="flex-1 space-y-2">

                    <div className="h-3 w-20 animate-pulse rounded bg-white/[0.04]" />

                    <div className="h-4 w-full animate-pulse rounded bg-white/[0.06]" />

                  </div>

                </div>

              ),
            )}

          </div>

        </div>


        {/*                             =====
            FORM
                                    ===== */}

        <div className="rounded-2xl border border-white/10 bg-[#09090b]">

          <div className="border-b border-white/10 px-6 py-5">

            <div className="h-5 w-44 animate-pulse rounded bg-white/[0.06]" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-white/[0.04]" />

          </div>


          <div className="space-y-5 p-6">

            <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.04]" />


            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />

              <div className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />

            </div>


            <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.04]" />


            <div className="h-28 w-full animate-pulse rounded-xl bg-white/[0.04]" />


            <div className="flex justify-end border-t border-white/10 pt-6">

              <div className="h-11 w-32 animate-pulse rounded-xl bg-white/[0.06]" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}