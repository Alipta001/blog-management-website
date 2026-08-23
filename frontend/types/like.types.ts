// src/types/like.types.ts

import type { Blog } from "./blog.types";
import type { User } from "./user.types";

export interface Like {
  _id: string;

  blog: string | Blog;
  user: string | User;

  createdAt: string;
  updatedAt: string;
}