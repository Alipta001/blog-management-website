import type { User } from "./user.types";
import type { Blog } from "./blog.types";


export interface ReadingHistory {
  _id: string;

  user: string | User;

  blog: string | Blog;

  viewedAt: string;

  createdAt: string;

  updatedAt: string;
}