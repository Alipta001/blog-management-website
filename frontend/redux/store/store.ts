// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slice/auth/authSlice";
import blogReducer from "../slice/blog/blogSlice";
import categoryReducer from "../slice/category/categorySlice";
import commentReducer from "../slice/comment/commentSlice";
import likeReducer from "../slice/like/likeSlice";
import notificationReducer from "../slice/notification/notificationSlice";
import readingHistoryReducer from "../slice/readingHistory/readingHistorySlice";
import tagReducer from "../slice/tag/tagSlice";
import userReducer from "../slice/user/userSlice";
import analyticsReducer from "../slice/analytics/analyticsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,

    blog: blogReducer,

    category: categoryReducer,

    comment: commentReducer,

    like: likeReducer,

    notification: notificationReducer,

    readingHistory: readingHistoryReducer,

    tag: tagReducer,

    user: userReducer,

    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
