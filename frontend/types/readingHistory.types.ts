import type {  user } from "./ user.types";
import type { Blog } from "./blog.types";


export interface ReadingHistory {
  _id: string;

   user: string |  user;

  blog: string | Blog;

  viewedAt: string;

  createdAt: string;

  updatedAt: string;
}