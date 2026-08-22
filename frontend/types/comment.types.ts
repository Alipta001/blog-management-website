// src/types/comment.types.ts

import type { Blog } from "./blog.types";
import type {  user } from "./ user.types";

export type CommentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "hidden";

export interface Comment {
  _id: string;

  blog: string | Blog;
   user: string |  user;

  content: string;

  status: CommentStatus;

  moderatedBy: string |  user | null;

  moderatedAt: string | null;

  createdAt: string;
  updatedAt: string;
}