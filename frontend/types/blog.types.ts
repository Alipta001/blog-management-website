export type BlogStatus =
  | "draft"
  | "pending"
  | "published"
  | "rejected"
  | "unpublished";

export interface CreateBlogFormValues {
  title: string;
  description: string;
  content: string;
  category: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogStats {
  total: number;
  published: number;
  pending: number;
  draft: number;
  rejected: number;
  unpublished: number;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface BlogTag {
  _id: string;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string | null;
  bio?: string;
}

export interface BlogImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;

  featuredImage?: BlogImage | null;

  contentImages?: BlogImage[];

  author: string | BlogAuthor;

  category: string | BlogCategory;

  tags: Array<string | BlogTag>;

  status: BlogStatus;

  views: number;

  likeCount?: number;

  isLiked?: boolean;

  rejectionReason?: string | null;

  publishedAt?: string | null;

  isDeleted: boolean;

  deletedAt?: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface BlogsResponse {
  blogs: Blog[];
  pagination: Pagination;
  stats?: BlogStats;
}