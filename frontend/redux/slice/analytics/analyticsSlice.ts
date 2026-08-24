import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import AxiosInstance from
  "@/api/axios/axios";

import {
  endPoints,
} from "@/api/endPoints/endPoints";

import type {
  AnalyticsRange,
  AuthorAnalytics,
} from "@/types/analytics.types";


 
// REQUEST TYPES
 

interface GetAuthorAnalyticsParams {

  range?: AnalyticsRange;

}


 
// STATE
 

interface AnalyticsState {

  authorAnalytics:
    AuthorAnalytics | null;

  loading: boolean;

  error: string | null;

}


 
// INITIAL STATE
 

const initialState:
  AnalyticsState = {

    authorAnalytics:
      null,

    loading:
      false,

    error:
      null,

  };


 
// GET AUTHOR ANALYTICS
//
// GET /analytics/author
 

export const getAuthorAnalytics =
  createAsyncThunk<
    AuthorAnalytics,
    GetAuthorAnalyticsParams | undefined,
    {
      rejectValue: string;
    }
  >(

    "analytics/getAuthorAnalytics",

    async (
      params = {},
      {
        rejectWithValue,
      }
    ) => {

      try {

        const response =
          await AxiosInstance.get(
            endPoints.analytics
              .getAuthorAnalytics,
            {
              params,
            }
          );


        return response
          .data
          .data;

      } catch (
        error: any
      ) {

        return rejectWithValue(

          error
            ?.response
            ?.data
            ?.message ||

          "Failed to fetch analytics"

        );

      }

    }

  );


 
// ANALYTICS SLICE
 

const analyticsSlice =
  createSlice({

    name:
      "analytics",

    initialState,


    reducers: {


      //                             =
      // CLEAR ERROR
      //                             =

      clearAnalyticsError: (
        state
      ) => {

        state.error =
          null;

      },


      //                             =
      // CLEAR ANALYTICS
      //                             =

      clearAuthorAnalytics: (
        state
      ) => {

        state.authorAnalytics =
          null;

      },

    },


    extraReducers: (
      builder
    ) => {

      builder


        //                             =
        // GET AUTHOR ANALYTICS
        //                             =

        .addCase(
          getAuthorAnalytics
            .pending,

          (
            state
          ) => {

            state.loading =
              true;

            state.error =
              null;

          }
        )


        .addCase(
          getAuthorAnalytics
            .fulfilled,

          (
            state,
            action
          ) => {

            state.loading =
              false;

            state.authorAnalytics =
              action.payload;

          }
        )


        .addCase(
          getAuthorAnalytics
            .rejected,

          (
            state,
            action
          ) => {

            state.loading =
              false;

            state.error =

              action.payload ||

              "Failed to fetch analytics";

          }
        );

    },

  });


 
// ACTIONS
 

export const {

  clearAnalyticsError,

  clearAuthorAnalytics,

} =
  analyticsSlice.actions;


 
// REDUCER
 

export default
  analyticsSlice.reducer;