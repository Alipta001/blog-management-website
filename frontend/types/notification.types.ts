// src/types/notification.types.ts

import type {  user } from "./ user.types";
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

  recipient: string |  user;
  sender: string |  user | null;

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