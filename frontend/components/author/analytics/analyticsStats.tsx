
import {
  BookOpen,
  Heart,
  MessageSquare,
  Eye,
} from "lucide-react";

import AnalyticsStatCard from "./analyticsStatCard";


interface AnalyticsStatsProps {
  totalBlogs: number;

  totalViews: number;

  totalLikes: number;

  totalComments: number;
}


export default function AnalyticsStats({
  totalBlogs,
  totalViews,
  totalLikes,
  totalComments,
}: AnalyticsStatsProps) {

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      <AnalyticsStatCard
        title="Total Blogs"
        value={totalBlogs}
        description="All your published content"
        icon={BookOpen}
        trend={12.5}
      />


      <AnalyticsStatCard
        title="Total Views"
        value={totalViews.toLocaleString()}
        description="Compared to last month"
        icon={Eye}
        trend={18.2}
      />


      <AnalyticsStatCard
        title="Total Likes"
        value={totalLikes.toLocaleString()}
        description="Compared to last month"
        icon={Heart}
        trend={8.4}
      />


      <AnalyticsStatCard
        title="Total Comments"
        value={totalComments.toLocaleString()}
        description="Compared to last month"
        icon={MessageSquare}
        trend={5.6}
      />

    </div>
  );
}
