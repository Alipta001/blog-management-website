
"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


interface BlogStatusData {
  name: string;

  value: number;

  color: string;
}


interface BlogStatusChartProps {
  data: BlogStatusData[];
}


export default function BlogStatusChart({
  data,
}: BlogStatusChartProps) {

  const totalBlogs =
    data.reduce(
      (
        total,
        item,
      ) =>
        total + item.value,
      0,
    );


  return (
    <section
      className="
        rounded-2xl
        border border-white/10
        bg-[#09090b]
        p-5
        sm:p-6
      "
    >

      <h2 className="text-base font-semibold text-white">
        Blog Status
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Distribution of your content.
      </p>


      {/* Chart */}

      <div className="relative mt-5 h-[230px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              stroke="none"
            >

              {data.map(
                (
                  entry,
                  index,
                ) => (

                  <Cell
                    key={index}
                    fill={entry.color}
                  />

                ),
              )}

            </Pie>


            <Tooltip
              contentStyle={{
                backgroundColor: "#111113",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius:
                  "12px",
              }}
            />

          </PieChart>

        </ResponsiveContainer>


        {/* Center */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            flex flex-col
            items-center
            justify-center
          "
        >

          <span className="text-3xl font-bold text-white">
            {totalBlogs}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            Total Blogs
          </span>

        </div>

      </div>


      {/* Legend */}

      <div className="mt-5 space-y-3">

        {data.map(
          (item) => (

            <div
              key={item.name}
              className="
                flex
                items-center
                justify-between
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                />

                <span className="text-sm text-slate-400">
                  {item.name}
                </span>

              </div>


              <span className="text-sm font-medium text-white">
                {item.value}
              </span>

            </div>

          ),
        )}

      </div>

    </section>
  );
}
