// src/redux/slices/readingHistory.slice.ts

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";


import type {
  ReadingHistory,
} from "@/types/readingHistory.types";
import { endPoints } from "@/api/endPoints/endPoints";
import AxiosInstance from "@/api/axios/axios";


// =================================
// TYPES
// =================================

export interface Pagination {
  total: number;

  page: number;

  limit: number;

  totalPages: number;
}


export interface GetReadingHistoryParams {
  page?: number;

  limit?: number;
}


interface GetReadingHistoryResponse {
  history: ReadingHistory[];

  pagination: Pagination;
}


interface AddReadingHistoryPayload {
  blogId: string;
}


interface AddReadingHistoryResponse {
  history: ReadingHistory;

  message: string;
}


interface ClearReadingHistoryResponse {
  deletedCount: number;

  message: string;
}


// =================================
// STATE
// =================================

interface ReadingHistoryState {
  history: ReadingHistory[];

  pagination: Pagination | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


const initialState: ReadingHistoryState = {
  history: [],

  pagination: null,

  loading: false,

  error: null,

  successMessage: null,
};


// =================================
// ADD / UPDATE READING HISTORY
// POST /reading-history/:blogId
// =================================

export const addReadingHistory =
  createAsyncThunk<
    AddReadingHistoryResponse,
    AddReadingHistoryPayload,
    {
      rejectValue: string;
    }
  >(
    "readingHistory/addReadingHistory",

    async (
      { blogId },
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.readingHistory
            .addReadingHistory
            .replace(
              ":blogId",
              blogId
            );


        const response =
          await AxiosInstance.post(
            url
          );


        return {
          history:
            response.data.data,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to update reading history"
        );
      }
    }
  );


// =================================
// GET MY READING HISTORY
// GET /reading-history
// =================================

export const getMyReadingHistory =
  createAsyncThunk<
    GetReadingHistoryResponse,
    GetReadingHistoryParams | undefined,
    {
      rejectValue: string;
    }
  >(
    "readingHistory/getMyReadingHistory",

    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const {
          page = 1,
          limit = 10,
        } = params;


        const response =
          await AxiosInstance.get(
            endPoints.readingHistory
              .getMyReadingHistory,
            {
              params: {
                page,
                limit,
              },
            }
          );


        return response.data.data;

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch reading history"
        );
      }
    }
  );


// =================================
// CLEAR READING HISTORY
// DELETE /reading-history
// =================================

export const clearReadingHistory =
  createAsyncThunk<
    ClearReadingHistoryResponse,
    void,
    {
      rejectValue: string;
    }
  >(
    "readingHistory/clearReadingHistory",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await AxiosInstance.delete(
            endPoints.readingHistory
              .clearReadingHistory
          );


        return {
          deletedCount:
            response.data.data.deletedCount,

          message:
            response.data.message,
        };

      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to clear reading history"
        );
      }
    }
  );


// =================================
// READING HISTORY SLICE
// =================================

const readingHistorySlice =
  createSlice({
    name: "readingHistory",

    initialState,


    // =================================
    // REDUCERS
    // =================================

    reducers: {


      // =============================
      // CLEAR ERROR
      // =============================

      clearReadingHistoryError: (
        state
      ) => {
        state.error = null;
      },


      // =============================
      // CLEAR SUCCESS MESSAGE
      // =============================

      clearReadingHistorySuccessMessage: (
        state
      ) => {
        state.successMessage = null;
      },


      // =============================
      // CLEAR LOCAL HISTORY STATE
      // =============================

      clearReadingHistoryState: (
        state
      ) => {
        state.history = [];

        state.pagination = null;

        state.error = null;

        state.successMessage = null;
      },

    },


    // =================================
    // EXTRA REDUCERS
    // =================================

    extraReducers: (
      builder
    ) => {

      builder


        // =============================
        // ADD / UPDATE READING HISTORY
        // =============================

        .addCase(
          addReadingHistory.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          }
        )

        .addCase(
          addReadingHistory.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            const updatedHistory =
              action.payload.history;


            /*
              If this blog already exists
              in the current Redux history,
              remove the old record first.

              Then add the updated record
              at the beginning because the
              latest viewedAt should appear
              first.
            */

            state.history =
              state.history.filter(
                (item) =>
                  item._id !==
                  updatedHistory._id
              );


            state.history.unshift(
              updatedHistory
            );


            state.successMessage =
              action.payload.message;
          }
        )

        .addCase(
          addReadingHistory.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to update reading history";
          }
        )


        // =============================
        // GET MY READING HISTORY
        // =============================

        .addCase(
          getMyReadingHistory.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          }
        )

        .addCase(
          getMyReadingHistory.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.history =
              action.payload.history;

            state.pagination =
              action.payload.pagination;
          }
        )

        .addCase(
          getMyReadingHistory.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch reading history";
          }
        )


        // =============================
        // CLEAR READING HISTORY
        // =============================

        .addCase(
          clearReadingHistory.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          }
        )

        .addCase(
          clearReadingHistory.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.history = [];

            state.pagination = null;

            state.successMessage =
              action.payload.message;
          }
        )

        .addCase(
          clearReadingHistory.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to clear reading history";
          }
        );
    },
  });


// =================================
// EXPORT ACTIONS
// =================================

export const {
  clearReadingHistoryError,
  clearReadingHistorySuccessMessage,
  clearReadingHistoryState,
} =
  readingHistorySlice.actions;


// =================================
// EXPORT REDUCER
// =================================

export default
  readingHistorySlice.reducer;