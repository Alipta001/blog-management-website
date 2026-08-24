import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type {
  User,
  UserRole,
  UserStatus,
} from "@/types/user.types";

import type {
  Pagination,
} from "@/types/blog.types";

import AxiosInstance from "@/api/axios/axios";

import {
  endPoints,
} from "@/api/endPoints/endPoints";


 
// REQUEST TYPES
 

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}


export interface UpdateUserPayload {
  id: string;

  data: {
    name?: string;
    email?: string;
    phone?: string | null;
    address?: string | null;
    department?: string | null;
    role?: UserRole;
    status?: UserStatus;
  };
}


 
// MY PROFILE UPDATE
 

export type UpdateMyProfilePayload =
  FormData;


 
// RESPONSE TYPES
 

interface GetUsersResponse {
  users: User[];

  pagination: Pagination;
}


interface UpdateUserResponse {
  user: User;

  message: string;
}


interface UserActionResponse {
  id: string;

  message: string;
}


interface UpdateProfileResponse {
  user: User;

  message: string;
}

interface ApiUser extends Omit<User, "_id" | "profileImage"> {
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

const normalizeUser = (user: ApiUser): User => ({
  ...user,
  _id: user._id || user.id || "",
  profileImage:
    typeof user.profileImage === "string"
      ? user.profileImage
      : user.profileImage?.url || null,
});


 
// STATE
 

interface UserState {
  users: User[];

  selectedUser: User | null;

  profile: User | null;

  pagination: Pagination | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


const initialState: UserState = {
  users: [],

  selectedUser: null,

  profile: null,

  pagination: null,

  loading: false,

  error: null,

  successMessage: null,
};


 
// GET ALL USERS
// GET /user/all-user
 

export const getUsers =
  createAsyncThunk<
    GetUsersResponse,
    GetUsersParams | undefined,
    {
      rejectValue: string;
    }
  >(
    "user/getUsers",

    async (
      params = {},
      { rejectWithValue }
    ) => {
      try {

        const response =
          await AxiosInstance.get(
            endPoints.user.getUsers,
            {
              params,
            }
          );


        return {
          users: response.data.data.users.map(
            (user: ApiUser) => normalizeUser(user),
          ),
          pagination: response.data.data.pagination,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch users"
        );

      }
    }
  );


 
// GET USER BY ID
// GET /user/:id
 

export const getUserById =
  createAsyncThunk<
    User,
    string,
    {
      rejectValue: string;
    }
  >(
    "user/getUserById",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .getUserById
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.get(
            url
          );


        return normalizeUser(
          response.data.data,
        );

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch user"
        );

      }
    }
  );


 
// UPDATE USER
// PATCH /user/:id/update
 

export const updateUser =
  createAsyncThunk<
    UpdateUserResponse,
    UpdateUserPayload,
    {
      rejectValue: string;
    }
  >(
    "user/updateUser",

    async (
      { id, data },
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .updateUser
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.patch(
            url,
            data
          );


        return {
          user: normalizeUser(
            response.data.data.user,
          ),

          message:
            response.data.message,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to update user"
        );

      }
    }
  );


 
// ACTIVATE USER
 

export const activateUser =
  createAsyncThunk<
    UserActionResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "user/activateUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .activateUser
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.patch(
            url
          );


        return {
          id,

          message:
            response.data.message,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to activate user"
        );

      }
    }
  );


 
// DEACTIVATE USER
 

export const deactivateUser =
  createAsyncThunk<
    UserActionResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "user/deactivateUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .deactivateUser
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.patch(
            url
          );


        return {
          id,

          message:
            response.data.message,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to deactivate user"
        );

      }
    }
  );


 
// BLOCK USER
 

export const blockUser =
  createAsyncThunk<
    UserActionResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "user/blockUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .blockUser
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.patch(
            url
          );


        return {
          id,

          message:
            response.data.message,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to block user"
        );

      }
    }
  );


 
// DELETE USER
 

export const deleteUser =
  createAsyncThunk<
    UserActionResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "user/deleteUser",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const url =
          endPoints.user
            .deleteUser
            .replace(
              ":id",
              id
            );


        const response =
          await AxiosInstance.delete(
            url
          );


        return {
          id,

          message:
            response.data.message,
        };

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to delete user"
        );

      }
    }
  );


 
// GET MY PROFILE
// GET /user/profile
 

export const getMyProfile =
  createAsyncThunk<
    User,
    void,
    {
      rejectValue: string;
    }
  >(
    "user/getMyProfile",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await AxiosInstance.get(
            endPoints.user.getMyProfile
          );


        return normalizeUser(
          response.data.data,
        );

      } catch (error: any) {

        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to fetch profile"
        );

      }
    }
  );


 
// UPDATE MY PROFILE
// PATCH /user/profile/update
// MULTIPART/FORM-DATA
 

export const updateMyProfile =
  createAsyncThunk<
    UpdateProfileResponse,
    UpdateMyProfilePayload,
    {
      rejectValue: string;
    }
  >(
    "user/updateMyProfile",

    async (
      formData,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await AxiosInstance.patch(
            endPoints.user.updateMyProfile,
            formData
          );


        return {
          user: normalizeUser(
            response.data.data.user,
          ),

          message:
            response.data.message,
        };

      } catch (error: any) {

        console.error(
          "Update profile error:",
          error
        );


        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to update profile"
        );

      }
    }
  );


 
// USER SLICE
 

const userSlice =
  createSlice({

    name: "user",

    initialState,

    reducers: {

      //                             =
      // CLEAR ERROR
      //                             =

      clearUserError: (
        state
      ) => {

        state.error = null;

      },


      //                             =
      // CLEAR SUCCESS MESSAGE
      //                             =

      clearUserSuccessMessage: (
        state
      ) => {

        state.successMessage = null;

      },


      //                             =
      // CLEAR SELECTED USER
      //                             =

      clearSelectedUser: (
        state
      ) => {

        state.selectedUser = null;

      },


      //                             =
      // CLEAR USERS
      //                             =

      clearUsers: (
        state
      ) => {

        state.users = [];

        state.pagination = null;

      },


      //                             =
      // CLEAR PROFILE
      //                             =

      clearProfile: (
        state
      ) => {

        state.profile = null;

      },

    },


     
    // EXTRA REDUCERS
     

    extraReducers: (
      builder
    ) => {

      builder

        //                             =
        // GET ALL USERS
        //                             =

        .addCase(
          getUsers.pending,
          (state) => {

            state.loading = true;

            state.error = null;

          }
        )

        .addCase(
          getUsers.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.users =
              action.payload.users;

            state.pagination =
              action.payload.pagination;

          }
        )

        .addCase(
          getUsers.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch users";

          }
        )


        //                             =
        // GET USER BY ID
        //                             =

        .addCase(
          getUserById.pending,
          (state) => {

            state.loading = true;

            state.error = null;

          }
        )

        .addCase(
          getUserById.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.selectedUser =
              action.payload;

          }
        )

        .addCase(
          getUserById.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch user";

          }
        )


        //                             =
        // UPDATE USER
        //                             =

        .addCase(
          updateUser.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          updateUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            const updatedUser =
              action.payload.user;


            const index =
              state.users.findIndex(
                (user) =>
                  user._id ===
                  updatedUser._id
              );


            if (index !== -1) {

              state.users[index] =
                updatedUser;

            }


            if (
              state.selectedUser?._id ===
              updatedUser._id
            ) {

              state.selectedUser =
                updatedUser;

            }


            if (
              state.profile?._id ===
              updatedUser._id
            ) {

              state.profile =
                updatedUser;

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          updateUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to update user";

          }
        )


        //                             =
        // ACTIVATE USER
        //                             =

        .addCase(
          activateUser.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          activateUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;


            const index =
              state.users.findIndex(
                (user) =>
                  user._id ===
                  action.payload.id
              );


            if (index !== -1) {

              state.users[index].status =
                "active";

            }


            if (
              state.selectedUser?._id ===
              action.payload.id
            ) {

              state.selectedUser.status =
                "active";

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          activateUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to activate user";

          }
        )


        //                             =
        // DEACTIVATE USER
        //                             =

        .addCase(
          deactivateUser.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          deactivateUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;


            const index =
              state.users.findIndex(
                (user) =>
                  user._id ===
                  action.payload.id
              );


            if (index !== -1) {

              state.users[index].status =
                "inactive";

            }


            if (
              state.selectedUser?._id ===
              action.payload.id
            ) {

              state.selectedUser.status =
                "inactive";

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          deactivateUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to deactivate user";

          }
        )


        //                             =
        // BLOCK USER
        //                             =

        .addCase(
          blockUser.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          blockUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;


            const index =
              state.users.findIndex(
                (user) =>
                  user._id ===
                  action.payload.id
              );


            if (index !== -1) {

              state.users[index].status =
                "blocked";

            }


            if (
              state.selectedUser?._id ===
              action.payload.id
            ) {

              state.selectedUser.status =
                "blocked";

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          blockUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to block user";

          }
        )


        //                             =
        // DELETE USER
        //                             =

        .addCase(
          deleteUser.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          deleteUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;


            state.users =
              state.users.filter(
                (user) =>
                  user._id !==
                  action.payload.id
              );


            if (
              state.selectedUser?._id ===
              action.payload.id
            ) {

              state.selectedUser =
                null;

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          deleteUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to delete user";

          }
        )


        //                             =
        // GET MY PROFILE
        //                             =

        .addCase(
          getMyProfile.pending,
          (state) => {

            state.loading = true;

            state.error = null;

          }
        )

        .addCase(
          getMyProfile.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.profile =
              action.payload;

          }
        )

        .addCase(
          getMyProfile.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch profile";

          }
        )


        //                             =
        // UPDATE MY PROFILE
        //                             =

        .addCase(
          updateMyProfile.pending,
          (state) => {

            state.loading = true;

            state.error = null;

            state.successMessage = null;

          }
        )

        .addCase(
          updateMyProfile.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            const updatedUser =
              action.payload.user;


            // IMPORTANT
            // Update profile immediately

            state.profile =
              updatedUser;


            // Update users list

            const index =
              state.users.findIndex(
                (user) =>
                  user._id ===
                  updatedUser._id
              );


            if (index !== -1) {

              state.users[index] =
                updatedUser;

            }


            // Update selected user

            if (
              state.selectedUser?._id ===
              updatedUser._id
            ) {

              state.selectedUser =
                updatedUser;

            }


            state.successMessage =
              action.payload.message;

          }
        )

        .addCase(
          updateMyProfile.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to update profile";

          }
        );

    },

  });


 
// EXPORT ACTIONS
 

export const {
  clearUserError,
  clearUserSuccessMessage,
  clearSelectedUser,
  clearUsers,
  clearProfile,
} =
  userSlice.actions;


 
// EXPORT REDUCER
 

export default
  userSlice.reducer;