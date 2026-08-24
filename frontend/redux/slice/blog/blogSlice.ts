import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type {
  Blog,
  BlogStats,
  Pagination,
  BlogsResponse,
} from "@/types/blog.types";

import type {
  CreateBlogPayload,
  GetBlogsParams,
  GetMyBlogsParams,
  GetAdminBlogsParams,
  RejectBlogPayload,
  UpdateBlogPayload,
} from "@/types/blogRequest.types";

import { endPoints } from "@/api/endPoints/endPoints";

import AxiosInstance from "@/api/axios/axios";

import {
  createBlogFormData,
  updateBlogFormData,
} from "@/utils/blogFormData";


 
// STATE
 

interface BlogState {
  blogs: Blog[];

  myBlogs: Blog[];

  adminBlogs: Blog[];

  selectedBlog: Blog | null;

  pagination: Pagination | null;

  myBlogsPagination: Pagination | null;

  adminBlogsPagination: Pagination | null;

  adminBlogStats: BlogStats | null;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}


 
// INITIAL STATE
 

const initialState: BlogState = {
  blogs: [],

  myBlogs: [],

  adminBlogs: [],

  selectedBlog: null,

  pagination: null,

  myBlogsPagination: null,

  adminBlogsPagination: null,

  adminBlogStats: null,

  loading: false,

  error: null,

  successMessage: null,
};


 
// RESPONSE TYPES
 

interface CreateBlogResponse {
  blog: Blog;
  message: string;
}


interface UpdateBlogResponse {
  blog: Blog;
  message: string;
}


interface BlogActionResponse {
  blog: Blog;
  message: string;
}


interface DeleteBlogResponse {
  id: string;
  message: string;
}


interface RecordBlogViewResponse {
  blogId: string;
  views: number;
}


 
// GET ALL PUBLIC BLOGS
 

export const getBlogs = createAsyncThunk<
  BlogsResponse,
  GetBlogsParams | undefined,
  {
    rejectValue: string;
  }
>(
  "blog/getBlogs",

  async (
    params = {},
    { rejectWithValue },
  ) => {
    try {
      const response =
        await AxiosInstance.get(
          endPoints.blog.getAllBlogs,
          {
            params,
          },
        );

      return response.data.data;

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch blogs",
      );
    }
  },
);


 
// GET ADMINISTRATION BLOGS
 

export const getAdminBlogs = createAsyncThunk<
  BlogsResponse,
  GetAdminBlogsParams | undefined,
  {
    rejectValue: string;
  }
>(
  "blog/getAdminBlogs",

  async (
    params = {},
    { rejectWithValue },
  ) => {
    try {

      const response =
        await AxiosInstance.get(
          endPoints.blog.adminBlogs,
          {
            params,
          },
        );

      return response.data.data;

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch administration blogs",
      );
    }
  },
);


 
// GET BLOG BY ID
 

export const getBlogById = createAsyncThunk<
  Blog,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/getBlogById",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.getBlogById.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.get(
          url,
        );

      return response.data.data;

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch blog",
      );
    }
  },
);


 
// GET MY BLOGS
 

export const getMyBlogs = createAsyncThunk<
  BlogsResponse,
  GetMyBlogsParams | undefined,
  {
    rejectValue: string;
  }
>(
  "blog/getMyBlogs",

  async (
    params = {},
    { rejectWithValue },
  ) => {
    try {

      const response =
        await AxiosInstance.get(
          endPoints.blog.myBlogs,
          {
            params,
          },
        );

      return response.data.data;

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch your blogs",
      );
    }
  },
);


 
// CREATE BLOG
 

export const createBlog = createAsyncThunk<
  CreateBlogResponse,
  CreateBlogPayload,
  {
    rejectValue: string;
  }
>(
  "blog/createBlog",

  async (
    data,
    { rejectWithValue },
  ) => {
    try {

      const formData =
        createBlogFormData(data);

      const response =
        await AxiosInstance.post(
          endPoints.blog.create,
          formData,
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to create blog",
      );
    }
  },
);


 
// UPDATE BLOG
 

export const updateBlog = createAsyncThunk<
  UpdateBlogResponse,
  UpdateBlogPayload,
  {
    rejectValue: string;
  }
>(
  "blog/updateBlog",

  async (
    { id, data },
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.updateBlog.replace(
          ":id",
          id,
        );

      const formData =
        updateBlogFormData(data);

      const response =
        await AxiosInstance.patch(
          url,
          formData,
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to update blog",
      );
    }
  },
);


 
// SUBMIT BLOG
 

export const submitBlog = createAsyncThunk<
  BlogActionResponse,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/submitBlog",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.submitBlog.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.patch(
          url,
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to submit blog",
      );
    }
  },
);


 
// PUBLISH BLOG
 

export const publishBlog = createAsyncThunk<
  BlogActionResponse,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/publishBlog",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.publishBlog.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.patch(
          url,
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to publish blog",
      );
    }
  },
);


 
// REJECT BLOG
 

export const rejectBlog = createAsyncThunk<
  BlogActionResponse,
  RejectBlogPayload,
  {
    rejectValue: string;
  }
>(
  "blog/rejectBlog",

  async (
    {
      id,
      rejectionReason,
    },
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.rejectBlog.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.patch(
          url,
          {
            rejectionReason,
          },
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to reject blog",
      );
    }
  },
);


 
// UNPUBLISH BLOG
 

export const unpublishBlog = createAsyncThunk<
  BlogActionResponse,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/unpublishBlog",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.unpublishBlog.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.patch(
          url,
        );

      return {
        blog:
          response.data.data,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to unpublish blog",
      );
    }
  },
);


 
// DELETE BLOG
 

export const deleteBlog = createAsyncThunk<
  DeleteBlogResponse,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/deleteBlog",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.deleteBlog.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.delete(
          url,
        );

      return {
        id:
          response.data.data.id,

        message:
          response.data.message,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to delete blog",
      );
    }
  },
);


 
// RECORD BLOG VIEW
//
// PATCH /blog/:id/view
// POST /blog/:id/view
 

export const recordBlogView = createAsyncThunk<
  RecordBlogViewResponse,
  string,
  {
    rejectValue: string;
  }
>(
  "blog/recordBlogView",

  async (
    id,
    { rejectWithValue },
  ) => {
    try {

      const url =
        endPoints.blog.recordBlogView.replace(
          ":id",
          id,
        );

      const response =
        await AxiosInstance.post(
          url,
        );

      return {
        blogId: id,

        views:
          response.data.data.views,
      };

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to record blog view",
      );
    }
  },
);


 
// HELPER
 

const replaceBlogInList = (
  blogs: Blog[],
  updatedBlog: Blog,
) => {

  const index =
    blogs.findIndex(
      (blog) =>
        blog._id ===
        updatedBlog._id,
    );

  if (index !== -1) {

    blogs[index] =
      updatedBlog;

  }
};


 
// UPDATE SELECTED BLOG
 

const updateSelectedBlog = (
  state: BlogState,
  updatedBlog: Blog,
) => {

  if (
    state.selectedBlog?._id ===
    updatedBlog._id
  ) {

    state.selectedBlog =
      updatedBlog;

  }
};


 
// UPDATE BLOG VIEWS
 

const updateBlogViewsInList = (
  blogs: Blog[],
  blogId: string,
  views: number,
) => {

  const blog =
    blogs.find(
      (item) =>
        item._id === blogId,
    );

  if (blog) {

    blog.views = views;

  }
};


 
// SLICE
 

const blogSlice = createSlice({

  name: "blog",

  initialState,


  reducers: {

     
    // CLEAR ERROR
     

    clearBlogError: (
      state,
    ) => {

      state.error = null;

    },


     
    // CLEAR SUCCESS MESSAGE
     

    clearBlogSuccessMessage: (
      state,
    ) => {

      state.successMessage = null;

    },


     
    // CLEAR SELECTED BLOG
     

    clearSelectedBlog: (
      state,
    ) => {

      state.selectedBlog = null;

    },


     
    // UPDATE LIKE STATE
     

    setSelectedBlogLikeState: (
      state,
      action: {
        payload: {
          likeCount: number;
          isLiked: boolean;
        };
      },
    ) => {

      if (state.selectedBlog) {

        state.selectedBlog.likeCount =
          action.payload.likeCount;

        state.selectedBlog.isLiked =
          action.payload.isLiked;

      }

    },

  },


  extraReducers: (
    builder,
  ) => {

    builder


      
      // GET PUBLIC BLOGS
  

      .addCase(
        getBlogs.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        getBlogs.fulfilled,
        (state, action) => {

          state.loading = false;

          state.blogs =
            action.payload.blogs;

          state.pagination =
            action.payload.pagination;

        },
      )

      .addCase(
        getBlogs.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch blogs";

        },
      )


      
      // GET ADMIN BLOGS
      

      .addCase(
        getAdminBlogs.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        getAdminBlogs.fulfilled,
        (state, action) => {

          state.loading = false;

          state.adminBlogs =
            action.payload.blogs;

          state.adminBlogsPagination =
            action.payload.pagination;

          state.adminBlogStats =
            action.payload.stats ||
            null;

        },
      )

      .addCase(
        getAdminBlogs.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch administration blogs";

        },
      )


      
      // GET BLOG BY ID
      

      .addCase(
        getBlogById.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        getBlogById.fulfilled,
        (state, action) => {

          state.loading = false;

          state.selectedBlog =
            action.payload;

        },
      )

      .addCase(
        getBlogById.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch blog";

        },
      )


       
      // GET MY BLOGS
       

      .addCase(
        getMyBlogs.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        getMyBlogs.fulfilled,
        (state, action) => {

          state.loading = false;

          state.myBlogs =
            action.payload.blogs;

          state.myBlogsPagination =
            action.payload.pagination;

        },
      )

      .addCase(
        getMyBlogs.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch your blogs";

        },
      )


       
      // CREATE BLOG
       

      .addCase(
        createBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;
          state.successMessage = null;

        },
      )

      .addCase(
        createBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          state.myBlogs.unshift(
            action.payload.blog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        createBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to create blog";

        },
      )


       
      // UPDATE BLOG
       

      .addCase(
        updateBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        updateBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const updatedBlog =
            action.payload.blog;

          replaceBlogInList(
            state.myBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.adminBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.blogs,
            updatedBlog,
          );

          updateSelectedBlog(
            state,
            updatedBlog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        updateBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to update blog";

        },
      )


       
      // SUBMIT BLOG
       

      .addCase(
        submitBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        submitBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const updatedBlog =
            action.payload.blog;

          replaceBlogInList(
            state.myBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.adminBlogs,
            updatedBlog,
          );

          updateSelectedBlog(
            state,
            updatedBlog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        submitBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to submit blog";

        },
      )


       
      // PUBLISH BLOG
       

      .addCase(
        publishBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        publishBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const updatedBlog =
            action.payload.blog;

          replaceBlogInList(
            state.adminBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.myBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.blogs,
            updatedBlog,
          );

          updateSelectedBlog(
            state,
            updatedBlog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        publishBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to publish blog";

        },
      )


       
      // REJECT BLOG

      .addCase(
        rejectBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        rejectBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const updatedBlog =
            action.payload.blog;

          replaceBlogInList(
            state.myBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.adminBlogs,
            updatedBlog,
          );

          updateSelectedBlog(
            state,
            updatedBlog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        rejectBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to reject blog";

        },
      )


       
      // UNPUBLISH BLOG
       

      .addCase(
        unpublishBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        unpublishBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const updatedBlog =
            action.payload.blog;

          replaceBlogInList(
            state.myBlogs,
            updatedBlog,
          );

          replaceBlogInList(
            state.adminBlogs,
            updatedBlog,
          );

          state.blogs =
            state.blogs.filter(
              (blog) =>
                blog._id !==
                updatedBlog._id,
            );

          updateSelectedBlog(
            state,
            updatedBlog,
          );

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        unpublishBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to unpublish blog";

        },
      )


       
      // DELETE BLOG
      

      .addCase(
        deleteBlog.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        },
      )

      .addCase(
        deleteBlog.fulfilled,
        (state, action) => {

          state.loading = false;

          const id =
            action.payload.id;

          state.myBlogs =
            state.myBlogs.filter(
              (blog) =>
                blog._id !== id,
            );

          state.adminBlogs =
            state.adminBlogs.filter(
              (blog) =>
                blog._id !== id,
            );

          state.blogs =
            state.blogs.filter(
              (blog) =>
                blog._id !== id,
            );

          if (
            state.selectedBlog?._id === id
          ) {

            state.selectedBlog = null;

          }

          state.successMessage =
            action.payload.message;

        },
      )

      .addCase(
        deleteBlog.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to delete blog";

        },
      )


       
      // RECORD BLOG VIEW
      
      .addCase(
        recordBlogView.fulfilled,
        (state, action) => {

          const {
            blogId,
            views,
          } = action.payload;


          // Update selected blog
          if (
            state.selectedBlog?._id ===
            blogId
          ) {

            state.selectedBlog.views =
              views;

          }


          // Update public blogs list
          updateBlogViewsInList(
            state.blogs,
            blogId,
            views,
          );


          // Update author's blogs list
          updateBlogViewsInList(
            state.myBlogs,
            blogId,
            views,
          );


          // Update administration blogs list
          updateBlogViewsInList(
            state.adminBlogs,
            blogId,
            views,
          );

        },
      );

  },

});


 
// ACTIONS
 

export const {
  clearBlogError,
  clearBlogSuccessMessage,
  clearSelectedBlog,
  setSelectedBlogLikeState,
} =
  blogSlice.actions;


 
// REDUCER
 

export default blogSlice.reducer;