import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Tag } from "@/types/tag.types";
import { endPoints } from "@/api/endPoints/endPoints";
import AxiosInstance from "@/api/axios/axios";


 
// REQUEST TYPES
 

interface CreateTagPayload {
  name: string;
}


interface UpdateTagPayload {
  id: string;
  name: string;
}


 
// STATE
 

interface TagState {
  tags: Tag[];

  selectedTag: Tag | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


const initialState: TagState = {
  tags: [],

  selectedTag: null,

  loading: false,

  error: null,

  successMessage: null,
};



 
// GET ALL TAGS
// GET /tag
 

export const getTags = createAsyncThunk(
  "tag/getTags",

  async (_, { rejectWithValue }) => {
    try {
      const response =
        await AxiosInstance.get(
          endPoints.tag.getTags
        );

      return response.data.data;

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch tags"
      );
    }
  }
);



 
// GET TAG BY ID
// GET /tag/:id
 

export const getTagById = createAsyncThunk(
  "tag/getTagById",

  async (
    id: string,
    { rejectWithValue }
  ) => {
    try {
      const url =
        endPoints.tag.getTagById.replace(
          ":id",
          id
        );

      const response =
        await AxiosInstance.get(url);

      return response.data.data;

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch tag"
      );
    }
  }
);



 
// CREATE TAG
// POST /tag/create
// ADMINISTRATION ONLY
 

export const createTag = createAsyncThunk(
  "tag/createTag",

  async (
    data: CreateTagPayload,
    { rejectWithValue }
  ) => {
    try {
      const response =
        await AxiosInstance.post(
          endPoints.tag.createTag,
          data
        );

      return {
        tag: response.data.data,
        message: response.data.message,
      };

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to create tag"
      );
    }
  }
);



 
// UPDATE TAG
// PATCH /tag/:id/update
// ADMINISTRATION ONLY
 

export const updateTag = createAsyncThunk(
  "tag/updateTag",

  async (
    {
      id,
      name,
    }: UpdateTagPayload,

    { rejectWithValue }
  ) => {
    try {
      const url =
        endPoints.tag.updateTag.replace(
          ":id",
          id
        );

      const response =
        await AxiosInstance.patch(
          url,
          {
            name,
          }
        );

      return {
        tag: response.data.data,
        message: response.data.message,
      };

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to update tag"
      );
    }
  }
);



 
// DELETE TAG
// DELETE /tag/:id/delete
// ADMINISTRATION ONLY
 

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",

  async (
    id: string,
    { rejectWithValue }
  ) => {
    try {
      const url =
        endPoints.tag.deleteTag.replace(
          ":id",
          id
        );

      const response =
        await AxiosInstance.delete(url);

      return {
        id,
        message: response.data.message,
      };

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to delete tag"
      );
    }
  }
);



 
// TAG SLICE
 

const tagSlice = createSlice({
  name: "tag",

  initialState,

  reducers: {


    //                             =
    // CLEAR ERROR
    //                             =

    clearTagError: (state) => {
      state.error = null;
    },


    //                             =
    // CLEAR SUCCESS MESSAGE
    //                             =

    clearTagSuccessMessage: (state) => {
      state.successMessage = null;
    },


    //                             =
    // CLEAR SELECTED TAG
    //                             =

    clearSelectedTag: (state) => {
      state.selectedTag = null;
    },


    //                             =
    // CLEAR TAGS
    //                             =

    clearTags: (state) => {
      state.tags = [];

      state.selectedTag = null;
    },

  },


  extraReducers: (builder) => {
    builder


      //                             =
      // GET ALL TAGS
      //                             =

      .addCase(
        getTags.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        getTags.fulfilled,
        (state, action) => {
          state.loading = false;

          state.tags =
            action.payload;
        }
      )

      .addCase(
        getTags.rejected,
        (
          state,
          action: PayloadAction<any>
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch tags";
        }
      )



      //                             =
      // GET TAG BY ID
      //                             =

      .addCase(
        getTagById.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        getTagById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedTag =
            action.payload;
        }
      )

      .addCase(
        getTagById.rejected,
        (
          state,
          action: PayloadAction<any>
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch tag";
        }
      )



      //                             =
      // CREATE TAG
      //                             =

      .addCase(
        createTag.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.successMessage = null;
        }
      )

      .addCase(
        createTag.fulfilled,
        (state, action) => {
          state.loading = false;

          state.tags.push(
            action.payload.tag
          );

          // Keep alphabetical order
          state.tags.sort(
            (a, b) =>
              a.name.localeCompare(b.name)
          );

          state.successMessage =
            action.payload.message;
        }
      )

      .addCase(
        createTag.rejected,
        (
          state,
          action: PayloadAction<any>
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to create tag";
        }
      )



      //                             =
      // UPDATE TAG
      //                             =

      .addCase(
        updateTag.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.successMessage = null;
        }
      )

      .addCase(
        updateTag.fulfilled,
        (state, action) => {
          state.loading = false;

          const updatedTag =
            action.payload.tag;

          const index =
            state.tags.findIndex(
              (tag) =>
                tag._id ===
                updatedTag._id
            );

          if (index !== -1) {
            state.tags[index] =
              updatedTag;
          }

          // Update selected tag if it is open
          if (
            state.selectedTag?._id ===
            updatedTag._id
          ) {
            state.selectedTag =
              updatedTag;
          }

          // Keep alphabetical order
          state.tags.sort(
            (a, b) =>
              a.name.localeCompare(b.name)
          );

          state.successMessage =
            action.payload.message;
        }
      )

      .addCase(
        updateTag.rejected,
        (
          state,
          action: PayloadAction<any>
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to update tag";
        }
      )



      //                             =
      // DELETE TAG
      //                             =

      .addCase(
        deleteTag.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.successMessage = null;
        }
      )

      .addCase(
        deleteTag.fulfilled,
        (state, action) => {
          state.loading = false;

          state.tags =
            state.tags.filter(
              (tag) =>
                tag._id !==
                action.payload.id
            );

          // Clear selected tag if deleted
          if (
            state.selectedTag?._id ===
            action.payload.id
          ) {
            state.selectedTag = null;
          }

          state.successMessage =
            action.payload.message;
        }
      )

      .addCase(
        deleteTag.rejected,
        (
          state,
          action: PayloadAction<any>
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to delete tag";
        }
      );
  },
});



 
// EXPORT ACTIONS
 

export const {
  clearTagError,
  clearTagSuccessMessage,
  clearSelectedTag,
  clearTags,
} = tagSlice.actions;



export default tagSlice.reducer;