export type AnalyticsRange =
  | "7d"
  | "30d"
  | "90d"
  | "all";


// =================================
// OVERVIEW STATS
// =================================

export interface AuthorAnalyticsStats {

  totalBlogs: number;

  publishedBlogs: number;

  totalViews: number;

  totalLikes: number;

  totalComments: number;

  uniqueReaders: number;

}


// =================================
// BLOG STATUS
// =================================

export interface BlogStatusAnalytics {

  name: string;

  status:
    | "draft"
    | "pending"
    | "published"
    | "rejected"
    | "unpublished";

  value: number;

}


// =================================
// TOP BLOG
// =================================

export interface TopBlogAnalytics {

  _id: string;

  title: string;

  slug: string;

  status: string;

  views: number;

  likes: number;

  comments: number;

  readers: number;

  score: number;

  publishedAt:
    | string
    | null;

  featuredImage: {

    url: string;

    publicId: string;

    alt: string;

  } | null;

}


// =================================
// PERFORMANCE
// =================================

export interface PerformanceAnalytics {

  date: string;

  likes: number;

  comments: number;

  readers: number;

}


// =================================
// COMPLETE RESPONSE
// =================================

export interface AuthorAnalytics {

  range:
    AnalyticsRange;

  stats:
    AuthorAnalyticsStats;

  blogStatus:
    BlogStatusAnalytics[];

  topBlogs:
    TopBlogAnalytics[];

  performance:
    PerformanceAnalytics[];

}