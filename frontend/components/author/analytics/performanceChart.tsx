
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export interface PerformanceData {
  date: string;

  readers: number;

  likes: number;

  comments: number;
}


interface PerformanceChartProps {
  data: PerformanceData[];
}


export default function PerformanceChart({
  data,
}: PerformanceChartProps) {

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

      {/* Header */}

      <div>

        <h2 className="text-base font-semibold text-white">
          Content Performance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Readers and engagement across your content.
        </p>

      </div>


      {/* Chart */}

      <div className="mt-8 h-[350px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
          >

            <defs>

              <linearGradient
                id="viewsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>


            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff10"
              vertical={false}
            />


            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />


            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />


            <Tooltip
              contentStyle={{
                backgroundColor: "#111113",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "#ffffff",
              }}
            />


            <Legend />


            <Area
              type="monotone"
              dataKey="readers"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              name="Readers"
            />


            <Area
              type="monotone"
              dataKey="likes"
              stroke="#ec4899"
              strokeWidth={2}
              fill="transparent"
              name="Likes"
            />


            <Area
              type="monotone"
              dataKey="comments"
              stroke="#22c55e"
              strokeWidth={2}
              fill="transparent"
              name="Comments"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}
