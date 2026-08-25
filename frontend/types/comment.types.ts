// src/types/comment.types.ts

import type { Blog } from "./blog.types";
import type { User } from "./user.types";

export type CommentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "hidden";

export interface Comment {
  _id: string;

  blog: string | Blog;
  user: string | User;

  parentComment?: string | Comment | null;

  content: string;

  status: CommentStatus;

  likeCount?: number;
  isLiked?: boolean;
  isPinned?: boolean;

  moderatedBy: string | User | null;

  moderatedAt: string | null;

  createdAt: string;
  updatedAt: string;
}