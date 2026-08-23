// "use client";

// import { useCallback, useState } from "react";

// import {
//   AnalyticsHeader,
//   AnalyticsSkeleton,
//   AnalyticsStats,
//   BlogStatusChart,
//   PerformanceChart,
//   TopBlogsTable,
// } from "@/components/author/analytics";

// import type { PerformanceData, TopBlog } from "@/components/author/analytics";

// // =================================
// // DUMMY PERFORMANCE DATA
// // =================================

// const performanceData: PerformanceData[] = [
//   {
//     date: "Aug 1",
//     views: 420,
//     likes: 32,
//     comments: 8,
//   },
//   {
//     date: "Aug 5",
//     views: 680,
//     likes: 48,
//     comments: 14,
//   },
//   {
//     date: "Aug 10",
//     views: 920,
//     likes: 67,
//     comments: 18,
//   },
//   {
//     date: "Aug 15",
//     views: 780,
//     likes: 54,
//     comments: 15,
//   },
//   {
//     date: "Aug 20",
//     views: 1240,
//     likes: 92,
//     comments: 27,
//   },
//   {
//     date: "Aug 25",
//     views: 1580,
//     likes: 118,
//     comments: 34,
//   },
//   {
//     date: "Aug 30",
//     views: 1840,
//     likes: 136,
//     comments: 41,
//   },
// ];

// // =================================
// // DUMMY BLOG STATUS DATA
// // =================================

// const blogStatusData = [
//   {
//     name: "Published",
//     value: 18,
//     color: "#22c55e",
//   },
//   {
//     name: "Draft",
//     value: 3,
//     color: "#64748b",
//   },
//   {
//     name: "Pending",
//     value: 2,
//     color: "#f59e0b",
//   },
//   {
//     name: "Rejected",
//     value: 1,
//     color: "#ef4444",
//   },
// ];

// // =================================
// // DUMMY TOP BLOGS
// // =================================

// const topBlogs: TopBlog[] = [
//   {
//     _id: "1",
//     title: "Understanding React Server Components",
//     views: 2840,
//     likes: 230,
//     comments: 42,
//     status: "published",
//   },
//   {
//     _id: "2",
//     title: "Complete Guide to Node.js Backend Architecture",
//     views: 2120,
//     likes: 185,
//     comments: 31,
//     status: "published",
//   },
//   {
//     _id: "3",
//     title: "MongoDB Performance Optimization Techniques",
//     views: 1680,
//     likes: 142,
//     comments: 25,
//     status: "published",
//   },
//   {
//     _id: "4",
//     title: "Building Scalable APIs with Express.js",
//     views: 1320,
//     likes: 96,
//     comments: 19,
//     status: "published",
//   },
//   {
//     _id: "5",
//     title: "Modern Authentication Using JWT and Refresh Tokens",
//     views: 980,
//     likes: 74,
//     comments: 12,
//     status: "published",
//   },
// ];

// // =================================
// // ANALYTICS PAGE
// // =================================

// export default function AuthorAnalyticsPage() {
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // =================================
//   // REFRESH
//   // =================================

//   const handleRefresh = useCallback(async () => {
//     setIsRefreshing(true);

//     // Temporary delay.
//     // Later this will dispatch
//     // the analytics Redux thunk.

//     await new Promise((resolve) => setTimeout(resolve, 800));

//     setIsRefreshing(false);
//   }, []);

//   // =================================
//   // TEMPORARY LOADING STATE
//   // =================================

//   const loading = false;

//   // =================================
//   // LOADING
//   // =================================

//   if (loading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8">
//         <AnalyticsSkeleton />
//       </div>
//     );
//   }

//   // =================================
//   // PAGE
//   // =================================

//   return (
//     <main
//       className="
//         min-h-full
//         bg-[#050505]
//       "
//     >
//       <div
//         className="
//           mx-auto
//           w-full
//           max-w-[1600px]
//           space-y-6
//           p-4
//           sm:p-6
//           lg:p-8
//         "
//       >
//         {/* =============================
//             HEADER
//         ============================= */}

//         <AnalyticsHeader
//           onRefresh={handleRefresh}
//           isRefreshing={isRefreshing}
//         />

//         {/* =============================
//             REFRESH INDICATOR
//         ============================= */}

//         {isRefreshing && (
//           <div
//             className="
//               flex
//               items-center
//               gap-2
//               rounded-xl
//               border border-violet-500/20
//               bg-violet-500/5
//               px-4 py-3
//               text-sm
//               text-violet-300
//             "
//           >
//             <span
//               className="
//                 h-2 w-2
//                 animate-pulse
//                 rounded-full
//                 bg-violet-400
//               "
//             />
//             Refreshing analytics...
//           </div>
//         )}

//         {/* =============================
//             STATISTICS
//         ============================= */}

//         <AnalyticsStats
//           totalBlogs={24}
//           totalViews={12480}
//           totalLikes={842}
//           totalComments={186}
//         />

//         {/* =============================
//             CHARTS
//         ============================= */}

//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-6
//             xl:grid-cols-3
//           "
//         >
//           {/* Performance Chart */}

//           <div
//             className="
//               xl:col-span-2
//             "
//           >
//             <PerformanceChart data={performanceData} />
//           </div>

//           {/* Blog Status */}

//           <BlogStatusChart data={blogStatusData} />
//         </div>

//         {/* =============================
//             TOP BLOGS
//         ============================= */}

//         <TopBlogsTable blogs={topBlogs} />
//       </div>
//     </main>
//   );
// }




"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AnalyticsHeader,
  AnalyticsSkeleton,
  AnalyticsStats,
  BlogStatusChart,
  PerformanceChart,
  TopBlogsTable,
} from "@/components/author/analytics";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  getAuthorAnalytics,
} from "@/redux/slice/analytics/analyticsSlice";

import type { AnalyticsRange } from "@/types/analytics.types";


// =================================
// AUTHOR ANALYTICS PAGE
// =================================

export default function AuthorAnalyticsPage() {

  const dispatch =
    useAppDispatch();

  const [range, setRange] =
    useState<AnalyticsRange>("30d");


  // =================================
  // REDUX STATE
  // =================================

  const {
    authorAnalytics,
    loading,
    error,
  } = useAppSelector(
    (state) =>
      state.analytics
  );

  const analytics = authorAnalytics;


  // =================================
  // FETCH ANALYTICS
  // =================================

  useEffect(() => {

    dispatch(
      getAuthorAnalytics({ range })
    );

  }, [
    dispatch,
    range,
  ]);


  // =================================
  // REFRESH
  // =================================

  const handleRefresh =
    useCallback(
      async () => {

        try {

          await dispatch(
            getAuthorAnalytics({ range })
          ).unwrap();

        } catch (
          error
        ) {

          console.error(
            "Failed to refresh analytics:",
            error
          );

        }

      },
      [
        dispatch,
        range,
      ]
    );


  // =================================
  // INITIAL LOADING
  // =================================

  if (
    loading &&
    !authorAnalytics
  ) {

    return (
      <div className="p-4 sm:p-6 lg:p-8">

        <AnalyticsSkeleton />

      </div>
    );

  }


  // =================================
  // ERROR STATE
  // =================================

  if (
    error &&
    !authorAnalytics
  ) {

    return (

      <main className="min-h-full bg-[#050505]">

        <div
          className="
            mx-auto
            flex
            min-h-[500px]
            max-w-[1600px]
            items-center
            justify-center
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <div
            className="
              max-w-md
              rounded-2xl
              border border-red-500/20
              bg-red-500/5
              p-6
              text-center
            "
          >

            <h2 className="text-lg font-semibold text-white">
              Failed to load analytics
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={
                handleRefresh
              }
              className="
                mt-5
                rounded-xl
                bg-violet-600
                px-4 py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-violet-500
              "
            >
              Try Again
            </button>

          </div>

        </div>

      </main>

    );

  }


  // =================================
  // SAFETY CHECK
  // =================================

  if (!analytics) {
    return null;
  }


  // =================================
  // PAGE
  // =================================

  return (

    <main
      className="
        min-h-full
        bg-[#050505]
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          space-y-6
          p-4
          sm:p-6
          lg:p-8
        "
      >

        {/* =============================
            HEADER
        ============================= */}

        <AnalyticsHeader
          onRefresh={
            handleRefresh
          }
          range={range}
          onRangeChange={setRange}
          isRefreshing={
            loading
          }
        />


        {/* =============================
            REFRESH INDICATOR
        ============================= */}

        {loading && analytics && (

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border border-violet-500/20
              bg-violet-500/5
              px-4 py-3
              text-sm
              text-violet-300
            "
          >

            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-violet-400
              "
            />

            Refreshing analytics...

          </div>

        )}


        {/* =============================
            STATISTICS
        ============================= */}

        <AnalyticsStats

          totalBlogs={
            analytics.stats
              .totalBlogs
          }

          totalViews={
            analytics.stats
              .totalViews
          }

          totalLikes={
            analytics.stats
              .totalLikes
          }

          totalComments={
            analytics.stats
              .totalComments
          }

        />


        {/* =============================
            CHARTS
        ============================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
        >

          {/* =========================
              PERFORMANCE CHART
          ========================= */}

          <div
            className="
              xl:col-span-2
            "
          >

            <PerformanceChart
              data={
                analytics.performance
              }
            />

          </div>


          {/* =========================
              BLOG STATUS CHART
          ========================= */}

          <BlogStatusChart
            data={
              analytics.blogStatus.map(
                (item) => ({
                  ...item,
                  color:
                    item.status === "published"
                      ? "#22c55e"
                      : item.status === "draft"
                        ? "#64748b"
                        : item.status === "pending"
                          ? "#f59e0b"
                          : item.status === "rejected"
                            ? "#ef4444"
                            : "#94a3b8",
                }),
              )
            }
          />

        </div>


        {/* =============================
            TOP BLOGS
        ============================= */}

        <TopBlogsTable
          blogs={
            analytics.topBlogs
          }
        />

      </div>

    </main>

  );
}