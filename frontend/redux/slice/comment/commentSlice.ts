
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type {
  Comment,
  CommentStatus,
} from "@/types/comment.types";

import type {
  Pagination,
} from "@/types/blog.types";

import {
  endPoints,
} from "@/api/endPoints/endPoints";

import AxiosInstance from "@/api/axios/axios";


 
// REQUEST TYPES
 

interface GetCommentsParams {
  blogId: string;

  page?: number;

  limit?: number;
}


interface GetCommentsForAuthorParams {
  page?: number;

  limit?: number;

  status?: CommentStatus;
}

interface GetAllCommentsParams {
  page?: number;

  limit?: number;

  status?: CommentStatus;
}


interface CreateCommentPayload {
  blogId: string;

  content: string;
}


interface UpdateCommentPayload {
  id: string;

  content: string;
}


interface ModerateCommentPayload {
  id: string;

  status: CommentStatus;
}


 
// RESPONSE TYPES
 

interface CommentsResponse {
  comments: Comment[];

  pagination: Pagination | null;
}


interface CommentResponse {
  comment: Comment;

  message: string;
}


interface CommentActionResponse {
  id: string;

  message: string;
}


 
// STATE
 

interface CommentState {
  comments: Comment[];

  pagination: Pagination | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


 
// INITIAL STATE
 

const initialState: CommentState = {
  comments: [],

  pagination: null,

  loading: false,

  error: null,

  successMessage: null,
};


 
// GET APPROVED COMMENTS
// GET /comment/blog/:blogId
 

export const getApprovedComments =
  createAsyncThunk<
    CommentsResponse,
    GetCommentsParams,
    {
      rejectValue: string;
    }
  >(
    "comment/getApprovedComments",

    async (
      {
        blogId,
        page = 1,
        limit = 10,
      },
      { rejectWithValue },
    ) => {
      try {
        const url =
          endPoints.comment
            .getApprovedCommentOfBlog
            .replace(
              ":blogId",
              blogId,
            );

        const response =
          await AxiosInstance.get(
            url,
            {
              params: {
                page,
                limit,
              },
            },
          );

        return response.data.data;

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch comments",
        );
      }
    },
  );


 
// GET COMMENTS FOR AUTHOR
// GET /comment/author
 

export const getCommentsForAuthor =
  createAsyncThunk<
    CommentsResponse,
    GetCommentsForAuthorParams | undefined,
    {
      rejectValue: string;
    }
  >(
    "comment/getCommentsForAuthor",

    async (
      params = {},
      { rejectWithValue },
    ) => {
      try {
        const response =
          await AxiosInstance.get(
            endPoints.comment
              .getCommentsForAuthor,
            {
              params: {
                page: params.page || 1,

                limit: params.limit || 20,

                ...(params.status && {
                  status: params.status,
                }),
              },
            },
          );

        return response.data.data;

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch comments for your blogs",
        );
      }
    },
  );


 
// GET ALL COMMENTS FOR ADMINISTRATION
// GET /comment/administration
 

export const getAllCommentsForAdministration =
  createAsyncThunk<
    CommentsResponse,
    GetAllCommentsParams | undefined,
    { rejectValue: string }
  >(
    "comment/getAllCommentsForAdministration",

    async (params = {}, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.get(
          endPoints.comment.getAllCommentsForAdministration,
          {
            params: {
              page: params.page || 1,
              limit: params.limit || 10,
              ...(params.status && { status: params.status }),
            },
          },
        );

        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch all comments",
        );
      }
    },
  );


 
// CREATE COMMENT
// POST /comment/blog/:blogId/create
 

export const createComment =
  createAsyncThunk<
    CommentResponse,
    CreateCommentPayload,
    {
      rejectValue: string;
    }
  >(
    "comment/createComment",

    async (
      {
        blogId,
        content,
      },
      { rejectWithValue },
    ) => {
      try {
        const url =
          endPoints.comment
            .createComment
            .replace(
              ":blogId",
              blogId,
            );

        const response =
          await AxiosInstance.post(
            url,
            {
              content,
            },
          );

        return {
          comment:
            response.data.data,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to create comment",
        );
      }
    },
  );


 
// UPDATE OWN COMMENT
// PATCH /comment/:id/update
 

export const updateOwnComment =
  createAsyncThunk<
    CommentResponse,
    UpdateCommentPayload,
    {
      rejectValue: string;
    }
  >(
    "comment/updateOwnComment",

    async (
      {
        id,
        content,
      },
      { rejectWithValue },
    ) => {
      try {
        const url =
          endPoints.comment
            .updateOwnComment
            .replace(
              ":id",
              id,
            );

        const response =
          await AxiosInstance.patch(
            url,
            {
              content,
            },
          );

        return {
          comment:
            response.data.data,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to update comment",
        );
      }
    },
  );


 
// DELETE OWN COMMENT
// DELETE /comment/:id/delete
 

export const deleteOwnComment =
  createAsyncThunk<
    CommentActionResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "comment/deleteOwnComment",

    async (
      id,
      { rejectWithValue },
    ) => {
      try {
        const url =
          endPoints.comment
            .deleteOwnComment
            .replace(
              ":id",
              id,
            );

        const response =
          await AxiosInstance.delete(
            url,
          );

        return {
          id,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to delete comment",
        );
      }
    },
  );


 
// MODERATE COMMENT
// PATCH /comment/:id/moderate
// ADMIN ONLY
 

export const moderateComment =
  createAsyncThunk<
    CommentResponse,
    ModerateCommentPayload,
    {
      rejectValue: string;
    }
  >(
    "comment/moderateComment",

    async (
      {
        id,
        status,
      },
      { rejectWithValue },
    ) => {
      try {
        const url =
          endPoints.comment
            .moderateComment
            .replace(
              ":id",
              id,
            );

        const response =
          await AxiosInstance.patch(
            url,
            {
              status,
            },
          );

        return {
          comment:
            response.data.data,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to moderate comment",
        );
      }
    },
  );


 
// COMMENT SLICE
 

const commentSlice =
  createSlice({
    name: "comment",

    initialState,

    reducers: {

      //                             =
      // CLEAR ERROR
      //                             =

      clearCommentError: (
        state,
      ) => {
        state.error = null;
      },


      //                             =
      // CLEAR SUCCESS MESSAGE
      //                             =

      clearCommentSuccessMessage: (
        state,
      ) => {
        state.successMessage = null;
      },


      //                             =
      // CLEAR COMMENTS
      //                             =

      clearComments: (
        state,
      ) => {
        state.comments = [];

        state.pagination = null;
      },

    },


    extraReducers: (
      builder,
    ) => {
      builder


         
        // GET APPROVED COMMENTS
         

        .addCase(
          getApprovedComments.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          getApprovedComments.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.comments =
              action.payload.comments;

            state.pagination =
              action.payload.pagination;
          },
        )

        .addCase(
          getApprovedComments.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch comments";
          },
        )


         
        // GET COMMENTS FOR AUTHOR
         

        .addCase(
          getCommentsForAuthor.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          getCommentsForAuthor.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.comments =
              action.payload.comments;

            state.pagination =
              action.payload.pagination;
          },
        )

        .addCase(
          getCommentsForAuthor.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch comments for your blogs";
          },
        )


         
        // GET ALL COMMENTS FOR ADMINISTRATION
         

        .addCase(
          getAllCommentsForAdministration.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          getAllCommentsForAdministration.fulfilled,
          (state, action) => {
            state.loading = false;

            state.comments = action.payload.comments;

            state.pagination = action.payload.pagination;
          },
        )

        .addCase(
          getAllCommentsForAdministration.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch all comments";
          },
        )


         
        // CREATE COMMENT
         

        .addCase(
          createComment.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          },
        )

        .addCase(
          createComment.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.successMessage =
              action.payload.message;
          },
        )

        .addCase(
          createComment.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to create comment";
          },
        )


         
        // UPDATE OWN COMMENT
         

        .addCase(
          updateOwnComment.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          updateOwnComment.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            const updatedComment =
              action.payload.comment;

            const index =
              state.comments.findIndex(
                (comment) =>
                  comment._id ===
                  updatedComment._id,
              );

            if (index !== -1) {
              state.comments[index] =
                updatedComment;
            }

            state.successMessage =
              action.payload.message;
          },
        )

        .addCase(
          updateOwnComment.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to update comment";
          },
        )


         
        // DELETE OWN COMMENT
         

        .addCase(
          deleteOwnComment.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          deleteOwnComment.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.comments =
              state.comments.filter(
                (comment) =>
                  comment._id !==
                  action.payload.id,
              );

            state.successMessage =
              action.payload.message;
          },
        )

        .addCase(
          deleteOwnComment.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to delete comment";
          },
        )


         
        // MODERATE COMMENT
         

        .addCase(
          moderateComment.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          },
        )

        .addCase(
          moderateComment.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            const updatedComment =
              action.payload.comment;

            const index =
              state.comments.findIndex(
                (comment) =>
                  comment._id ===
                  updatedComment._id,
              );

            if (index !== -1) {
              state.comments[index] =
                updatedComment;
            }

            state.successMessage =
              action.payload.message;
          },
        )

        .addCase(
          moderateComment.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to moderate comment";
          },
        );
    },
  });


 
// EXPORT ACTIONS
 

export const {
  clearCommentError,
  clearCommentSuccessMessage,
  clearComments,
} = commentSlice.actions;


 
// REDUCER
 

export default commentSlice.reducer;

