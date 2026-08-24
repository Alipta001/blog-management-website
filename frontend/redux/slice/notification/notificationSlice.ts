// src/redux/slices/notification.slice.ts

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";


import type {
  Notification,
} from "@/types/notification.types";
import { endPoints } from "@/api/endPoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

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
 

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
}


interface GetNotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  pagination: Pagination;
}


interface MarkAsReadResponse {
  notification: Notification;
  message: string;
}


interface MarkAllAsReadResponse {
  readAt: string;
  modifiedCount: number;
  message: string;
}


interface DeleteNotificationResponse {
  id: string;
  message: string;
}


 
// STATE
 

interface NotificationState {
  notifications: Notification[];

  pagination: Pagination | null;

  unreadCount: number;

  loading: boolean;

  error: string | null;

  successMessage: string | null;

  lastReadAt: string | null;
}


const initialState: NotificationState = {
  notifications: [],

  pagination: null,

  unreadCount: 0,

  loading: false,

  error: null,

  successMessage: null,

  lastReadAt: null,
};


 
// GET MY NOTIFICATIONS
// GET /notification
 

export const getMyNotifications =
  createAsyncThunk<
    GetNotificationsResponse,
    GetNotificationsParams | undefined,
    {
      rejectValue: string;
    }
  >(
    "notification/getMyNotifications",

    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {
        const {
          page = 1,
          limit = 10,
          isRead,
        } = params;


        const response =
          await AxiosInstance.get(
            endPoints.notification
              .getMyNotifications,
            {
              params: {
                page,
                limit,

                ...(isRead !== undefined
                  ? { isRead }
                  : {}),
              },
            }
          );


        return response.data.data;

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to fetch notifications")
        );
      }
    }
  );


 
// MARK ONE NOTIFICATION AS READ
// PATCH /notification/:id/read
 

export const markNotificationAsRead =
  createAsyncThunk<
    MarkAsReadResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "notification/markNotificationAsRead",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.notification
            .markAsRead
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.patch(
            url
          );


        return {
          notification:
            response.data.data,

          message:
            response.data.message,
        };

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to mark notification as read")
        );
      }
    }
  );


 
// MARK ALL NOTIFICATIONS AS READ
// PATCH /notification/read-all
 

export const markAllNotificationsAsRead =
  createAsyncThunk<
    MarkAllAsReadResponse,
    void,
    {
      rejectValue: string;
    }
  >(
    "notification/markAllNotificationsAsRead",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await AxiosInstance.patch(
            endPoints.notification
              .markAllAsRead
          );


        return {
          readAt:
            response.data.data.readAt,

          modifiedCount:
            response.data.data.modifiedCount,

          message:
            response.data.message,
        };

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to mark all notifications as read")
        );
      }
    }
  );


 
// DELETE NOTIFICATION
// DELETE /notification/:id/delete
 

export const deleteNotification =
  createAsyncThunk<
    DeleteNotificationResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "notification/deleteNotification",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {
        const url =
          endPoints.notification
            .deleteNotification
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.delete(
            url
          );


        return {
          id:
            response.data.data.id,

          message:
            response.data.message,
        };

      } catch (error: unknown) {
        return rejectWithValue(
          getErrorMessage(error, "Failed to delete notification")
        );
      }
    }
  );


 
// NOTIFICATION SLICE
 

const notificationSlice =
  createSlice({
    name: "notification",

    initialState,

    reducers: {


       
      // CLEAR ERROR
       

      clearNotificationError: (
        state
      ) => {
        state.error = null;
      },


       
      // CLEAR SUCCESS MESSAGE
       

      clearNotificationSuccessMessage: (
        state
      ) => {
        state.successMessage = null;
      },


       
      // CLEAR NOTIFICATIONS
       

      clearNotifications: (
        state
      ) => {
        state.notifications = [];

        state.pagination = null;

        state.unreadCount = 0;

        state.lastReadAt = null;

        state.error = null;

        state.successMessage = null;
      },

    },


     
    // EXTRA REDUCERS
     

    extraReducers: (
      builder
    ) => {

      builder


         
        // GET MY NOTIFICATIONS
         

        .addCase(
          getMyNotifications.pending,
          (state) => {
            state.loading = true;

            state.error = null;
          }
        )

        .addCase(
          getMyNotifications.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.notifications =
              action.payload.notifications;

            state.unreadCount =
              action.payload.unreadCount;

            state.pagination =
              action.payload.pagination;
          }
        )

        .addCase(
          getMyNotifications.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch notifications";
          }
        )


         
        // MARK ONE AS READ
         

        .addCase(
          markNotificationAsRead.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          }
        )

        .addCase(
          markNotificationAsRead.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;


            const updatedNotification =
              action.payload.notification;


            const index =
              state.notifications.findIndex(
                (notification) =>
                  notification._id ===
                  updatedNotification._id
              );


            if (index !== -1) {

              // Store previous status BEFORE
              // replacing the notification
              const wasUnread =
                !state.notifications[index].isRead;


              // Update notification
              state.notifications[index] =
                updatedNotification;


              // Decrease unread count only
              // if notification was previously unread
              if (
                wasUnread &&
                state.unreadCount > 0
              ) {
                state.unreadCount -= 1;
              }
            }


            // Store backend-generated timestamp
            state.lastReadAt =
              updatedNotification.readAt;


            state.successMessage =
              action.payload.message;
          }
        )

        .addCase(
          markNotificationAsRead.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to mark notification as read";
          }
        )


         
        // MARK ALL AS READ
         

        .addCase(
          markAllNotificationsAsRead.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          }
        )

        .addCase(
          markAllNotificationsAsRead.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;


            const readAt =
              action.payload.readAt;


            // Update only the notifications
            // currently loaded in Redux
            state.notifications =
              state.notifications.map(
                (notification) => {

                  // Keep already-read notifications
                  // unchanged
                  if (
                    notification.isRead
                  ) {
                    return notification;
                  }


                  return {
                    ...notification,

                    isRead: true,

                    readAt,
                  };
                }
              );


            // Backend has marked all
            // unread notifications as read
            state.unreadCount = 0;


            // Store backend timestamp
            state.lastReadAt =
              readAt;


            state.successMessage =
              action.payload.message;
          }
        )

        .addCase(
          markAllNotificationsAsRead.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to mark all notifications as read";
          }
        )


         
        // DELETE NOTIFICATION
         

        .addCase(
          deleteNotification.pending,
          (state) => {
            state.loading = true;

            state.error = null;

            state.successMessage = null;
          }
        )

        .addCase(
          deleteNotification.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;


            const notification =
              state.notifications.find(
                (item) =>
                  item._id ===
                  action.payload.id
              );


            // If deleted notification
            // was unread, decrease count
            if (
              notification &&
              !notification.isRead &&
              state.unreadCount > 0
            ) {
              state.unreadCount -= 1;
            }


            // Remove notification
            state.notifications =
              state.notifications.filter(
                (notification) =>
                  notification._id !==
                  action.payload.id
              );


            // Optional: update total count
            // for the current page
            if (
              state.pagination &&
              state.pagination.total > 0
            ) {
              state.pagination.total -= 1;

              state.pagination.totalPages =
                Math.ceil(
                  state.pagination.total /
                  state.pagination.limit
                );
            }


            state.successMessage =
              action.payload.message;
          }
        )

        .addCase(
          deleteNotification.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to delete notification";
          }
        );
    },
  });


 
// EXPORT ACTIONS
 

export const {
  clearNotificationError,
  clearNotificationSuccessMessage,
  clearNotifications,
} =
  notificationSlice.actions;


 
// EXPORT REDUCER
 

export default notificationSlice.reducer;