// src/types/notification.types.ts

import type { User } from "./user.types";
import type { Blog } from "./blog.types";
import type { Comment } from "./comment.types";

export type NotificationType =
  | "blog_submitted"
  | "blog_published"
  | "new_comment"
  | "new_like"
  | "author_approved"
  | "author_rejected";

export interface Notification {
  _id: string;

  recipient: string | User;
  sender: string | User | null;

  type: NotificationType;

  title: string;
  message: string;

  blog: string | Blog | null;
  comment: string | Comment | null;

  isRead: boolean;
  readAt: string | null;

  createdAt: string;
  updatedAt: string;
}