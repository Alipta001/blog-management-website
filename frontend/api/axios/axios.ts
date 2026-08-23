import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { endPoints } from "@/api/endPoints/endPoints";


const BASE_URL =
  process.env
    .NEXT_PUBLIC_API_BASE_URL;


const AxiosInstance =
  axios.create({

    baseURL:
      BASE_URL,

    headers: {

      "Content-Type":
        "application/json",

    },

    withCredentials:
      true,

  });


// Let the browser add the multipart boundary for file uploads.
AxiosInstance.interceptors.request.use(
  (config) => {
    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      config.headers?.delete("Content-Type");
    }

    return config;
  },
);


// =================================
// REFRESH STATE
// =================================

let isRefreshing =
  false;

let refreshPromise:
  Promise<unknown> | null =
  null;


// =================================
// RESPONSE INTERCEPTOR
// =================================

AxiosInstance.interceptors.response.use(

  (response) =>
    response,

  async (
    error: AxiosError
  ) => {

    const originalRequest =
      error.config as
        | InternalAxiosRequestConfig & {
            _retry?: boolean;
          }
        | undefined;


    /*
     * No request configuration.
     */

    if (!originalRequest) {

      return Promise.reject(
        error
      );

    }


    /*
     * Only handle 401.
     */

    if (
      error.response?.status !== 401
    ) {

      return Promise.reject(
        error
      );

    }


    /*
     * Never refresh the refresh endpoint
     * itself.
     */

    if (
      originalRequest.url?.includes(
        endPoints.auth.refreshToken
      )
    ) {

      return Promise.reject(
        error
      );

    }


    /*
     * Don't retry the same request
     * more than once.
     */

    if (
      originalRequest._retry
    ) {

      return Promise.reject(
        error
      );

    }


    originalRequest._retry =
      true;


    try {

      /*
       * If another request is already
       * refreshing the token, wait for it.
       */

      if (
        !isRefreshing
      ) {

        isRefreshing =
          true;


        refreshPromise =
          AxiosInstance.post(
            endPoints.auth.refreshToken,
          );

      }


      await refreshPromise;


      /*
       * Refresh successful.
       *
       * Backend has already sent the
       * new access token as a cookie.
       *
       * Retry original request.
       */

      return AxiosInstance(
        originalRequest
      );

    } catch (
      refreshError
    ) {

      if (
        typeof window !== "undefined"
      ) {
        window.dispatchEvent(
          new Event("auth:session-expired")
        );

        window.location.replace("/login");
      }

      return Promise.reject(
        refreshError
      );

    } finally {

      isRefreshing =
        false;

      refreshPromise =
        null;

    }

  }

);


export default AxiosInstance;