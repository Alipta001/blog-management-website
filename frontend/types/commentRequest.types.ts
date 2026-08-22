import type { CommentStatus } from "./comment.types";

export interface GetCommentsParams {
  blogId: string;
  page?: number;
  limit?: number;
}

export interface CreateCommentPayload {
  blogId: string;
  content: string;
}

export interface UpdateCommentPayload {
  id: string;
  content: string;
}

export interface ModerateCommentPayload {
  id: string;
  status: CommentStatus;
}