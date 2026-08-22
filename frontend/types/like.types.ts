// src/types/like.types.ts

import type { Blog } from "./blog.types";
import type {  user } from "./ user.types";

export interface Like {
  _id: string;

  blog: string | Blog;
   user: string |  user;

  createdAt: string;
  updatedAt: string;
}