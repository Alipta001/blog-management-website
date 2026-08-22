import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";


import type { Category } from "@/types/category.types";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

// =================================
// PAYLOAD TYPES
// =================================

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryPayload {
  id: string;

  data: {
    name?: string;
    description?: string;
    image?: string;
  };
}

// =================================
// STATE
// =================================

interface CategoryState {
  categories: Category[];

  selectedCategory: Category | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}

const initialState: CategoryState = {
  categories: [],

  selectedCategory: null,

  loading: false,

  error: null,

  successMessage: null,
};

// =================================
// GET ALL CATEGORIES
// GET /category
// =================================

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  "category/getCategories",

  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        endPoints.category.getCategories,
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// =================================
// GET CATEGORY BY ID
// GET /category/:id
// =================================

export const getCategoryById = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>(
  "category/getCategoryById",

  async (id, { rejectWithValue }) => {
    try {
      const url = endPoints.category.getCategoriesById.replace(":id", id);

      const response = await AxiosInstance.get(url);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);

// =================================
// CREATE CATEGORY
// POST /category/create
// =================================

export const createCategory = createAsyncThunk<
  {
    category: Category;
    message: string;
  },
  CreateCategoryPayload,
  { rejectValue: string }
>(
  "category/createCategory",

  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        endPoints.category.createCategory,
        data,
      );

      return {
        category: response.data.data,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create category",
      );
    }
  },
);

// =================================
// UPDATE CATEGORY
// PATCH /category/:id/update
// =================================

export const updateCategory = createAsyncThunk<
  {
    category: Category;
    message: string;
  },
  UpdateCategoryPayload,
  { rejectValue: string }
>(
  "category/updateCategory",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const url = endPoints.category.updateCategory.replace(":id", id);

      const response = await AxiosInstance.patch(url, data);

      return {
        category: response.data.data,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update category",
      );
    }
  },
);

// =================================
// ACTIVATE CATEGORY
// PATCH /category/:id/activate
// =================================

export const activateCategory = createAsyncThunk<
  {
    category: Category;
    message: string;
  },
  string,
  { rejectValue: string }
>(
  "category/activateCategory",

  async (id, { rejectWithValue }) => {
    try {
      const url = endPoints.category.activateCategory.replace(":id", id);

      const response = await AxiosInstance.patch(url);

      return {
        category: response.data.data,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to activate category",
      );
    }
  },
);

// =================================
// DEACTIVATE CATEGORY
// PATCH /category/:id/deactivate
// =================================

export const deactivateCategory = createAsyncThunk<
  {
    category: Category;
    message: string;
  },
  string,
  { rejectValue: string }
>(
  "category/deactivateCategory",

  async (id, { rejectWithValue }) => {
    try {
      const url = endPoints.category.deactivateCategory.replace(":id", id);

      const response = await AxiosInstance.patch(url);

      return {
        category: response.data.data,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to deactivate category",
      );
    }
  },
);

// =================================
// DELETE CATEGORY
// DELETE /category/:id
// =================================

export const deleteCategory = createAsyncThunk<
  {
    id: string;
    message: string;
  },
  string,
  { rejectValue: string }
>(
  "category/deleteCategory",

  async (id, { rejectWithValue }) => {
    try {
      const url = endPoints.category.deleteCategory.replace(":id", id);

      const response = await AxiosInstance.delete(url);

      return {
        id,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete category",
      );
    }
  },
);

// =================================
// SLICE
// =================================

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },

    clearCategorySuccessMessage: (state) => {
      state.successMessage = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET ALL CATEGORIES
      // =========================

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch categories";
      })

      // =========================
      // GET CATEGORY BY ID
      // =========================

      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedCategory = action.payload;
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch category";
      })

      // =========================
      // CREATE CATEGORY
      // =========================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.unshift(action.payload.category);

        state.successMessage = action.payload.message;
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create category";
      })

      // =========================
      // UPDATE CATEGORY
      // =========================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (category) => category._id === action.payload.category._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }

        if (state.selectedCategory?._id === action.payload.category._id) {
          state.selectedCategory = action.payload.category;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to update category";
      })

      // =========================
      // ACTIVATE CATEGORY
      // =========================

      .addCase(activateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(activateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (category) => category._id === action.payload.category._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }

        if (state.selectedCategory?._id === action.payload.category._id) {
          state.selectedCategory = action.payload.category;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(activateCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to activate category";
      })

      // =========================
      // DEACTIVATE CATEGORY
      // =========================

      .addCase(deactivateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deactivateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (category) => category._id === action.payload.category._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }

        if (state.selectedCategory?._id === action.payload.category._id) {
          state.selectedCategory = action.payload.category;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(deactivateCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to deactivate category";
      })

      // =========================
      // DELETE CATEGORY
      // =========================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.id,
        );

        if (state.selectedCategory?._id === action.payload.id) {
          state.selectedCategory = null;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to delete category";
      });
  },
});

export const {
  clearCategoryError,
  clearCategorySuccessMessage,
  clearSelectedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
