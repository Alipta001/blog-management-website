
export default function AnalyticsSkeleton() {

  return (
    <div className="animate-pulse space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="space-y-3">

          <div className="h-4 w-28 rounded bg-white/[0.06]" />

          <div className="h-8 w-40 rounded bg-white/[0.06]" />

          <div className="h-4 w-72 rounded bg-white/[0.04]" />

        </div>


        <div className="h-10 w-36 rounded-xl bg-white/[0.05]" />

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from(
          {
            length: 4,
          },
        ).map(
          (
            _,
            index,
          ) => (

            <div
              key={index}
              className="
                rounded-2xl
                border border-white/10
                bg-[#09090b]
                p-5
              "
            >

              <div className="flex justify-between">

                <div className="h-4 w-24 rounded bg-white/[0.06]" />

                <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />

              </div>


              <div className="mt-5 h-8 w-24 rounded bg-white/[0.06]" />

              <div className="mt-5 h-4 w-36 rounded bg-white/[0.04]" />

            </div>

          ),
        )}

      </div>


      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div
          className="
            h-[450px]
            rounded-2xl
            border border-white/10
            bg-[#09090b]
            xl:col-span-2
          "
        />

        <div
          className="
            h-[450px]
            rounded-2xl
            border border-white/10
            bg-[#09090b]
          "
        />

      </div>


      {/* Table */}

      <div
        className="
          h-[400px]
          rounded-2xl
          border border-white/10
          bg-[#09090b]
        "
      />

    </div>
  );
}
