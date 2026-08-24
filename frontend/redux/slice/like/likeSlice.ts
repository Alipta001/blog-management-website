import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const getErrorMessage = (
  error: unknown,
  fallback: string,
) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: unknown;
          };
        };
      }
    ).response;

    if (typeof response?.data?.message === "string") {
      return response.data.message;
    }
  }

  return fallback;
};

 
// TYPES
 

interface LikeState {
  totalLikes: number;

  isLiked: boolean;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


const initialState: LikeState = {
  totalLikes: 0,

  isLiked: false,

  loading: false,

  error: null,

  successMessage: null,
};


 
// GET BLOG LIKE COUNT
// GET /like/:blogId/like-count
 

export const getBlogLikeCount =
  createAsyncThunk(
    "like/getBlogLikeCount",

    async (
      blogId: string,
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.like.blogLikeCount.replace(
            ":blogId",
            blogId
          );

        const response =
          await AxiosInstance.get(url);

        return response.data.data;

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to fetch like count")
        );
      }
    }
  );


 
// LIKE BLOG
// POST /like/:blogId/like
 

export const likeBlog =
  createAsyncThunk(
    "like/likeBlog",

    async (
      blogId: string,
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.like.likeBlog.replace(
            ":blogId",
            blogId
          );

        const response =
          await AxiosInstance.post(
            url
          );

        return {
          totalLikes:
            response.data.data.totalLikes,

          isLiked:
            response.data.data.isLiked,

          message:
            response.data.message,
        };

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to like blog")
        );
      }
    }
  );


 
// UNLIKE BLOG
// DELETE /like/:blogId/unlike
 

export const unlikeBlog =
  createAsyncThunk(
    "like/unlikeBlog",

    async (
      blogId: string,
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.like.unlikeBlog.replace(
            ":blogId",
            blogId
          );

        const response =
          await AxiosInstance.delete(
            url
          );

        return {
          totalLikes:
            response.data.data.totalLikes,

          isLiked:
            response.data.data.isLiked,

          message:
            response.data.message,
        };

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to unlike blog")
        );
      }
    }
  );


 
// LIKE SLICE
 

const likeSlice = createSlice({
  name: "like",

  initialState,

  reducers: {

    //                             =
    // CLEAR ERROR
    //                             =

    clearLikeError: (state) => {
      state.error = null;
    },


    //                             =
    // CLEAR SUCCESS MESSAGE
    //                             =

    clearLikeSuccessMessage: (
      state
    ) => {
      state.successMessage = null;
    },


    //                             =
    // RESET LIKE STATE
    //                             =

    resetLikeState: (state) => {
      state.totalLikes = 0;

      state.isLiked = false;

      state.error = null;

      state.successMessage = null;
    },


    //                             =
    // SET LIKE STATUS
    // Useful when loading blog data
    //                             =

    setIsLiked: (
      state,
      action
    ) => {
      state.isLiked =
        action.payload;
    },
  },


  extraReducers: (builder) => {
    builder


      //                             =
      // GET BLOG LIKE COUNT
      //                             =

      .addCase(
        getBlogLikeCount.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        getBlogLikeCount.fulfilled,
        (state, action) => {
          state.loading = false;

          state.totalLikes =
            action.payload.totalLikes;
        }
      )

      .addCase(
        getBlogLikeCount.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string ||
            "Failed to fetch like count";
        }
      )


      //                             =
      // LIKE BLOG
      //                             =

      .addCase(
        likeBlog.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.successMessage = null;
        }
      )

      .addCase(
        likeBlog.fulfilled,
        (state, action) => {
          state.loading = false;

          state.totalLikes =
            action.payload.totalLikes;

          state.isLiked = action.payload.isLiked;

          state.successMessage =
            action.payload.message;
        }
      )

      .addCase(
        likeBlog.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string ||
            "Failed to like blog";
        }
      )


      //                             =
      // UNLIKE BLOG
      //                             =

      .addCase(
        unlikeBlog.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.successMessage = null;
        }
      )

      .addCase(
        unlikeBlog.fulfilled,
        (state, action) => {
          state.loading = false;

          state.totalLikes =
            action.payload.totalLikes;

          state.isLiked = action.payload.isLiked;

          state.successMessage =
            action.payload.message;
        }
      )

      .addCase(
        unlikeBlog.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string ||
            "Failed to unlike blog";
        }
      );
  },
});


 
// EXPORT ACTIONS
 

export const {
  clearLikeError,
  clearLikeSuccessMessage,
  resetLikeState,
  setIsLiked,
} = likeSlice.actions;


export default likeSlice.reducer;