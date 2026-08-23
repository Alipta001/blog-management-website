import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { endPoints } from "@/api/endPoints/endPoints";


// =================================
// BASE URL
// =================================

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://blog-management-website.onrender.com";


// =================================
// AXIOS INSTANCE
// =================================

const AxiosInstance =
  axios.create({

    baseURL:
      BASE_URL,

    headers: {

      "Content-Type":
        "application/json",

    },

    /*
     * VERY IMPORTANT
     *
     * Allows browser to send
     * HttpOnly cookies to Render.
     */

    withCredentials:true,

  });


// =================================
// REQUEST INTERCEPTOR
// =================================
//
// Let browser set multipart boundary
// automatically for FormData.
//

AxiosInstance.interceptors.request.use(

  (config) => {

    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {

      config.headers?.delete(
        "Content-Type"
      );

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);


// =================================
// REFRESH STATE
// =================================

let refreshPromise:
  Promise<void> | null =
  null;


// =================================
// RESPONSE INTERCEPTOR
// =================================

AxiosInstance.interceptors.response.use(

  /*
   * ================================
   * SUCCESS
   * ================================
   */

  (response) => {

    return response;

  },


  /*
   * ================================
   * ERROR
   * ================================
   */

  async (
    error: AxiosError
  ) => {

    const originalRequest =
      error.config as
        | InternalAxiosRequestConfig & {
            _retry?: boolean;
          }
        | undefined;


    // =================================
    // NO REQUEST CONFIG
    // =================================

    if (!originalRequest) {

      return Promise.reject(
        error
      );

    }


    // =================================
    // ONLY HANDLE 401
    // =================================

    if (
      error.response?.status !== 401
    ) {

      return Promise.reject(
        error
      );

    }


    // =================================
    // REQUEST URL
    // =================================

    const requestUrl =
      originalRequest.url || "";


    // =================================
    // NEVER REFRESH LOGIN REQUEST
    // =================================

    if (
      requestUrl.includes(
        endPoints.auth.login
      )
    ) {

      return Promise.reject(
        error
      );

    }


    // =================================
    // NEVER REFRESH REFRESH-TOKEN
    // =================================
    //
    // This is extremely important.
    //
    // Otherwise:
    //
    // refresh-token -> 401
    //       ↓
    // interceptor
    //       ↓
    // refresh-token
    //       ↓
    // 401
    //       ↓
    // infinite loop
    //

    if (
      requestUrl.includes(
        endPoints.auth.refreshToken
      )
    ) {

      return Promise.reject(
        error
      );

    }


    // =================================
    // DO NOT RETRY SAME REQUEST
    // MORE THAN ONCE
    // =================================

    if (
      originalRequest._retry
    ) {

      return Promise.reject(
        error
      );

    }


    originalRequest._retry =
      true;


    // =================================
    // REFRESH ACCESS TOKEN
    // =================================

    try {

      /*
       * If another request is already
       * refreshing the token, wait for
       * that same request.
       */

      if (
        !refreshPromise
      ) {

        refreshPromise =
          AxiosInstance
            .post(
              endPoints.auth.refreshToken
            )
            .then(() => {

              /*
               * Backend sets the new
               * accessToken as an
               * HttpOnly cookie.
               */

              return;

            })
            .finally(() => {

              /*
               * Allow a future refresh
               * after this one completes.
               */

              refreshPromise =
                null;

            });

      }


      // =================================
      // WAIT FOR REFRESH
      // =================================

      await refreshPromise;


      // =================================
      // RETRY ORIGINAL REQUEST
      // =================================

      return AxiosInstance(
        originalRequest
      );

    }

    catch (
      refreshError
    ) {

      // =================================
      // REFRESH FAILED
      // =================================
      //
      // Do NOT call window.location here.
      //
      // This prevents redirect/reload loops.
      //

      if (
        typeof window !== "undefined"
      ) {

        window.dispatchEvent(
          new Event(
            "auth:session-expired"
          )
        );

      }


      return Promise.reject(
        refreshError
      );

    }

  }

);


// =================================
// EXPORT
// =================================

export default AxiosInstance;