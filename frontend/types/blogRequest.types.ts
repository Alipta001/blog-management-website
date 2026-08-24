import type {
  BlogStatus,
} from "./blog.types";


 
// CREATE BLOG PAYLOAD
 

export interface CreateBlogPayload {
  title: string;

  description: string;

  content: string;

  category: string;

  status?: "draft" | "submitted";

  tags?: string[];

  featuredImage?: File | null;

  contentImages?: File[];
}


 
// UPDATE BLOG PAYLOAD
 

export interface UpdateBlogPayload {
  id: string;

  data: {
    title?: string;

    description?: string;

    content?: string;

    category?: string;

    tags?: string[];

    featuredImage?: File | null;

    contentImages?: File[];
  };
}


 
// GET BLOGS
 

export interface GetBlogsParams {
  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  tag?: string;

  author?: string;

  sort?: "latest" | "oldest" | "mostViewed";
}


 
// GET MY BLOGS
 

export interface GetMyBlogsParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: BlogStatus;
}


 
// GET ADMIN BLOGS
 

export interface GetAdminBlogsParams {
  search?: string;

  status?: BlogStatus;

  category?: string;

  page?: number;

  limit?: number;
}


 
// REJECT BLOG
 

export interface RejectBlogPayload {
  id: string;

  rejectionReason: string;
}