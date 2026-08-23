// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// import AxiosInstance from "@/api/axios/axios";

// import {
//   endPoints,
// } from "@/api/endPoints/endPoints";

// import type {
//   User,
//   UserRole,
// } from "@/types/user.types";


// // =================================
// // TYPES
// // =================================

// interface LoginPayload {

//   email: string;

//   password: string;

// }


// interface RegisterPayload {

//   name: string;

//   email: string;

//   phone?: string;

//   password: string;

//   role?: UserRole;

// }


// interface ChangePasswordPayload {

//   currentPassword: string;

//   newPassword: string;

// }


// interface LoginResponse {

//   user: User;

//   message: string;

// }


// interface RegisterResponse {
//   email: string;

//   message: string;

// }


// interface VerifyRegistrationOtpPayload {
//   email: string;

//   otp: string;
// }


// interface BasicResponse {

//   message: string;

// }

// interface AuthApiUser extends Omit<User, "_id" | "profileImage"> {
//   _id?: string;

//   id?: string;

//   profileImage:
//     | string
//     | null
//     | {
//         url: string | null;
//         publicId?: string | null;
//       };
// }

// const normalizeAuthUser = (user: AuthApiUser): User => ({
//   ...user,
//   _id: user._id || user.id || "",
//   profileImage:
//     typeof user.profileImage === "string"
//       ? user.profileImage
//       : user.profileImage?.url || null,
// });


// // =================================
// // STATE
// // =================================

// interface AuthState {

//   user: User | null;

//   loading: boolean;

//   error: string | null;

//   successMessage: string | null;

//   isAuthenticated: boolean;

//   /*
//    * Important:
//    *
//    * false means "not authenticated"
//    * only after initialization has completed.
//    *
//    * During page reload this remains false
//    * until /auth/me has been checked.
//    */

//   authInitialized: boolean;

// }


// // =================================
// // INITIAL STATE
// // =================================

// const initialState: AuthState = {

//   user: null,

//   loading: false,

//   error: null,

//   successMessage: null,

//   isAuthenticated: false,

//   authInitialized: false,

// };


// // =================================
// // REGISTER
// // =================================

// export const registerUser =
//   createAsyncThunk<
//     RegisterResponse,
//     RegisterPayload,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/register",

//     async (
//       data,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.post(
//             endPoints.auth.sendRegistrationOtp,
//             data,
//           );


//         return {

//           email: response.data.data.email,

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Registration failed"

//         );

//       }

//     }

//   );


// // =================================
// // VERIFY REGISTRATION OTP
// // =================================

// export const verifyRegistrationOtp =
//   createAsyncThunk<
//     RegisterResponse & { user: User },
//     VerifyRegistrationOtpPayload,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/verifyRegistrationOtp",

//     async (
//       data,
//       {
//         rejectWithValue,
//       }
//     ) => {
//       try {
//         const response =
//           await AxiosInstance.post(
//             endPoints.auth.verifyRegistrationOtp,
//             data,
//           );

//         return {
//           user: normalizeAuthUser(
//             response.data.data.user,
//           ),

//           message:
//             response.data.message,

//           email: data.email,
//         };

//       } catch (error: any) {
//         return rejectWithValue(
//           error?.response?.data?.message ||
//           "OTP verification failed"
//         );
//       }
//     }
//   );


// // =================================
// // LOGIN
// // =================================

// export const loginUser =
//   createAsyncThunk<
//     LoginResponse,
//     LoginPayload,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/login",

//     async (
//       data,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.post(

//             endPoints.auth.login,

//             data,

//           );


//         return {

//           user: normalizeAuthUser(
//             response.data.data.user,
//           ),

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Login failed"

//         );

//       }

//     }

//   );


// // =================================
// // GET CURRENT USER
// // GET /auth/me
// // =================================

// export const getCurrentUser =
//   createAsyncThunk<
//     LoginResponse,
//     void,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/getCurrentUser",

//     async (
//       _,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.get(

//             endPoints.auth.me,

//           );


//         return {

//           user: normalizeAuthUser(
//             response.data.data.user,
//           ),

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Failed to restore session"

//         );

//       }

//     }

//   );


// // =================================
// // LOGOUT
// // =================================

// export const logoutUser =
//   createAsyncThunk<
//     BasicResponse,
//     void,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/logout",

//     async (
//       _,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.post(

//             endPoints.auth.logout,

//           );


//         return {

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Logout failed"

//         );

//       }

//     }

//   );


// // =================================
// // CHANGE PASSWORD
// // =================================

// export const changePassword =
//   createAsyncThunk<
//     BasicResponse,
//     ChangePasswordPayload,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/changePassword",

//     async (
//       data,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.patch(

//             endPoints.auth.changePassword,

//             data,

//           );


//         return {

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Failed to change password"

//         );

//       }

//     }

//   );


// // =================================
// // REFRESH TOKEN
// // =================================

// export const refreshAccessToken =
//   createAsyncThunk<
//     BasicResponse,
//     void,
//     {
//       rejectValue: string;
//     }
//   >(
//     "auth/refreshToken",

//     async (
//       _,
//       {
//         rejectWithValue,
//       }
//     ) => {

//       try {

//         const response =
//           await AxiosInstance.post(

//             endPoints.auth.refreshToken,

//           );


//         return {

//           message:
//             response.data.message,

//         };

//       } catch (error: any) {

//         return rejectWithValue(

//           error?.response?.data?.message ||

//           "Session expired"

//         );

//       }

//     }

//   );


// // =================================
// // SLICE
// // =================================

// const authSlice =
//   createSlice({

//     name:
//       "auth",

//     initialState,

//     reducers: {


//       // ===============================
//       // CLEAR ERROR
//       // ===============================

//       clearAuthError: (
//         state,
//       ) => {

//         state.error = null;

//       },


//       // ===============================
//       // CLEAR SUCCESS MESSAGE
//       // ===============================

//       clearAuthSuccessMessage: (
//         state,
//       ) => {

//         state.successMessage =
//           null;

//       },


//       // ===============================
//       // SET AUTH DATA
//       // ===============================

//       setAuthData: (
//         state,
//         action,
//       ) => {

//         state.user =
//           action.payload.user;

//         state.isAuthenticated =
//           true;

//         state.authInitialized =
//           true;

//       },


//       setAuthUser: (
//         state,
//         action,
//       ) => {

//         state.user =
//           action.payload;

//         state.isAuthenticated =
//           true;

//       },


//       // ===============================
//       // CLEAR AUTH
//       // ===============================

//       clearAuth: (
//         state,
//       ) => {

//         state.user =
//           null;

//         state.isAuthenticated =
//           false;

//         state.authInitialized =
//           true;

//         state.error =
//           null;

//         state.successMessage =
//           null;

//       },

//     },


//     extraReducers: (
//       builder,
//     ) => {

//       builder


//         // =================================
//         // REGISTER
//         // =================================

//         .addCase(

//           registerUser.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//             state.successMessage =
//               null;

//           }

//         )


//         .addCase(

//           registerUser.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.successMessage =
//               action.payload.message;

//           }

//         )


//         .addCase(

//           registerUser.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.error =
//               action.payload ||
//               "Registration failed";

//           }

//         )


//         // =================================
//         // VERIFY REGISTRATION OTP
//         // =================================

//         .addCase(

//           verifyRegistrationOtp.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//             state.successMessage =
//               null;

//           }

//         )

//         .addCase(

//           verifyRegistrationOtp.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.successMessage =
//               action.payload.message;

//           }

//         )

//         .addCase(

//           verifyRegistrationOtp.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.error =
//               action.payload ||
//               "OTP verification failed";

//           }

//         )


//         // =================================
//         // LOGIN
//         // =================================

//         .addCase(

//           loginUser.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//             state.successMessage =
//               null;

//           }

//         )


//         .addCase(

//           loginUser.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.user =
//               action.payload.user;

//             state.isAuthenticated =
//               true;

//             state.authInitialized =
//               true;

//             state.successMessage =
//               action.payload.message;

//           }

//         )


//         .addCase(

//           loginUser.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.error =
//               action.payload ||
//               "Login failed";

//             state.isAuthenticated =
//               false;

//             state.authInitialized =
//               true;

//           }

//         )


//         // =================================
//         // GET CURRENT USER
//         // =================================

//         .addCase(

//           getCurrentUser.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//           }

//         )


//         .addCase(

//           getCurrentUser.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.user =
//               action.payload.user;

//             state.isAuthenticated =
//               true;

//             state.authInitialized =
//               true;

//           }

//         )


//         .addCase(

//           getCurrentUser.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.user =
//               null;

//             state.isAuthenticated =
//               false;

//             state.authInitialized =
//               true;

//             state.error =
//               action.payload ||
//               "Failed to restore session";

//           }

//         )


//         // =================================
//         // LOGOUT
//         // =================================

//         .addCase(

//           logoutUser.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//           }

//         )


//         .addCase(

//           logoutUser.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.user =
//               null;

//             state.isAuthenticated =
//               false;

//             state.authInitialized =
//               true;

//             state.successMessage =
//               action.payload.message;

//           }

//         )


//         .addCase(

//           logoutUser.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.error =
//               action.payload ||
//               "Logout failed";

//           }

//         )


//         // =================================
//         // CHANGE PASSWORD
//         // =================================

//         .addCase(

//           changePassword.pending,

//           (state) => {

//             state.loading =
//               true;

//             state.error =
//               null;

//           }

//         )


//         .addCase(

//           changePassword.fulfilled,

//           (state, action) => {

//             state.loading =
//               false;

//             state.user =
//               null;

//             state.isAuthenticated =
//               false;

//             state.authInitialized =
//               true;

//             state.successMessage =
//               action.payload.message;

//           }

//         )


//         .addCase(

//           changePassword.rejected,

//           (state, action) => {

//             state.loading =
//               false;

//             state.error =
//               action.payload ||
//               "Failed to change password";

//           }

//         )


//         // =================================
//         // REFRESH TOKEN
//         // =================================

//         .addCase(

//           refreshAccessToken.pending,

//           (state) => {

//             state.error =
//               null;

//           }

//         )


//         .addCase(

//           refreshAccessToken.fulfilled,

//           (state) => {

//             /*
//              * Do not set user here.
//              *
//              * Refresh endpoint only creates
//              * a new access token.
//              *
//              * /auth/me restores the user.
//              */

//             state.isAuthenticated =
//               true;

//           }

//         )


//         .addCase(

//           refreshAccessToken.rejected,

//           (state, action) => {

//             state.user =
//               null;

//             state.isAuthenticated =
//               false;

//             state.authInitialized =
//               true;

//             state.error =
//               action.payload ||
//               "Session expired";

//           }

//         );

//     },

//   });


// // =================================
// // ACTIONS
// // =================================

// export const {

//   clearAuthError,

//   clearAuthSuccessMessage,

//   setAuthData,

//   setAuthUser,

//   clearAuth,

// } = authSlice.actions;


// // =================================
// // REDUCER
// // =================================

// export default authSlice.reducer;




import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import AxiosInstance from "@/api/axios/axios";

import {
  endPoints,
} from "@/api/endPoints/endPoints";

import type {
  User,
  UserRole,
} from "@/types/user.types";


// =================================
// TYPES
// =================================

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface LoginResponse {
  user: User;
  message: string;
}

interface RegisterResponse {
  email: string;
  message: string;
}

interface VerifyRegistrationOtpPayload {
  email: string;
  otp: string;
}

interface BasicResponse {
  message: string;
}

interface AuthApiUser extends Omit<User, "_id" | "profileImage"> {
  _id?: string;
  id?: string;
  profileImage:
    | string
    | null
    | {
        url: string | null;
        publicId?: string | null;
      };
}

const normalizeAuthUser = (user: AuthApiUser): User => ({
  ...user,
  _id: user._id || user.id || "",
  profileImage:
    typeof user.profileImage === "string"
      ? user.profileImage
      : user.profileImage?.url || null,
});


// =================================
// STATE
// =================================

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
  authInitialized: boolean;
}


// =================================
// INITIAL STATE
// =================================

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
  authInitialized: false,
};


// =================================
// REGISTER
// =================================

export const registerUser =
  createAsyncThunk<
    RegisterResponse,
    RegisterPayload,
    {
      rejectValue: string;
    }
  >(
    "auth/register",
    async (data, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post(
          endPoints.auth.sendRegistrationOtp,
          data,
        );

        return {
          email: response.data.data.email,
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Registration failed"
        );
      }
    }
  );


// =================================
// VERIFY REGISTRATION OTP
// =================================

export const verifyRegistrationOtp =
  createAsyncThunk<
    RegisterResponse & { user: User },
    VerifyRegistrationOtpPayload,
    {
      rejectValue: string;
    }
  >(
    "auth/verifyRegistrationOtp",
    async (data, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post(
          endPoints.auth.verifyRegistrationOtp,
          data,
        );

        return {
          user: normalizeAuthUser(response.data.data.user),
          message: response.data.message,
          email: data.email,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "OTP verification failed"
        );
      }
    }
  );


// =================================
// LOGIN
// =================================

export const loginUser =
  createAsyncThunk<
    LoginResponse,
    LoginPayload,
    {
      rejectValue: string;
    }
  >(
    "auth/login",
    async (data, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post(
          endPoints.auth.login,
          data,
        );

        return {
          user: normalizeAuthUser(response.data.data.user),
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Login failed"
        );
      }
    }
  );


// =================================
// GET CURRENT USER
// GET /auth/me
// =================================

export const getCurrentUser =
  createAsyncThunk<
    LoginResponse,
    void,
    {
      rejectValue: string;
    }
  >(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.get(endPoints.auth.me);

        return {
          user: normalizeAuthUser(response.data.data.user),
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Failed to restore session"
        );
      }
    }
  );


// =================================
// LOGOUT
// =================================

export const logoutUser =
  createAsyncThunk<
    BasicResponse,
    void,
    {
      rejectValue: string;
    }
  >(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post(endPoints.auth.logout);

        return {
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Logout failed"
        );
      }
    }
  );


// =================================
// CHANGE PASSWORD
// =================================

export const changePassword =
  createAsyncThunk<
    BasicResponse,
    ChangePasswordPayload,
    {
      rejectValue: string;
    }
  >(
    "auth/changePassword",
    async (data, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.patch(
          endPoints.auth.changePassword,
          data,
        );

        return {
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Failed to change password"
        );
      }
    }
  );


// =================================
// REFRESH TOKEN
// =================================

export const refreshAccessToken =
  createAsyncThunk<
    BasicResponse,
    void,
    {
      rejectValue: string;
    }
  >(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post(
          endPoints.auth.refreshToken,
        );

        return {
          message: response.data.message,
        };
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Session expired"
        );
      }
    }
  );


// =================================
// SLICE
// =================================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },

    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.authInitialized = true;
    },

    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // VERIFY REGISTRATION OTP
      .addCase(verifyRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyRegistrationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(verifyRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.authInitialized = true;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.authInitialized = true;
      })

      // GET CURRENT USER (/auth/me)
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.authInitialized = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
        state.error = null; // Quietly handle unauthenticated state without UI error
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
        state.successMessage = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
        state.successMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      })

      // REFRESH TOKEN
      .addCase(refreshAccessToken.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
        state.error = null; // Quietly handle background token refresh failures
      });
  },
});

export const {
  clearAuthError,
  clearAuthSuccessMessage,
  setAuthData,
  setAuthUser,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;

