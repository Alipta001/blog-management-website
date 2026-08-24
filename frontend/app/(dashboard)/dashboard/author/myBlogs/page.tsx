"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  clearBlogError,
  deleteBlog,
  getMyBlogs,
  submitBlog,
} from "@/redux/slice/blog/blogSlice";

import type {
  BlogStatus,
} from "@/types/blog.types";

import Pagination from "@/components/common/pagination/pagination";
import MyBlogsTable from "@/components/author/myBlogs/myBlogsTable";
import MyBlogsFilters from "@/components/author/myBlogs/myBlogsFilters";
import MyBlogsHeader from "@/components/author/myBlogs/myBlogsHeader";

export default function MyBlogsPage() {
  const dispatch =
    useAppDispatch();

  const {
    myBlogs,
    myBlogsPagination,
    loading,
    error,
  } = useAppSelector(
    (state) => state.blog,
  );

  const [page, setPage] =
    useState(1);

  const [status, setStatus] =
    useState<
      BlogStatus | "all"
    >("all");

  const limit = 10;


   
  // FETCH MY BLOGS
   

  useEffect(() => {
    const params: {
      page: number;
      limit: number;
      status?: BlogStatus;
    } = {
      page,
      limit,
    };

    if (status !== "all") {
      params.status = status;
    }

    dispatch(
      getMyBlogs(params),
    );
  }, [
    dispatch,
    page,
    status,
  ]);


   
  // STATUS CHANGE
   

  const handleStatusChange = (
    value:
      | BlogStatus
      | "all",
  ) => {
    setStatus(value);

    // Reset pagination when filter changes
    setPage(1);
  };


   
  // PAGE CHANGE
   

  const handlePageChange = (
    selectedPage: number,
  ) => {
    setPage(selectedPage);
  };


   
  // SUBMIT BLOG
   

  const handleSubmit = async (
    id: string,
  ) => {
    try {
      await dispatch(
        submitBlog(id),
      ).unwrap();

      // Refetch current page
      dispatch(
        getMyBlogs({
          page,
          limit,
          ...(status !== "all"
            ? { status }
            : {}),
        }),
      );
    } catch (error) {
      console.error(
        "Failed to submit blog:",
        error,
      );
    }
  };


   
  // DELETE BLOG
   

  const handleDelete = async (
    id: string,
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog?",
      );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(
        deleteBlog(id),
      ).unwrap();

      // Refetch blogs after deletion
      dispatch(
        getMyBlogs({
          page,
          limit,
          ...(status !== "all"
            ? { status }
            : {}),
        }),
      );
    } catch (error) {
      console.error(
        "Failed to delete blog:",
        error,
      );
    }
  };


   
  // CLEAR ERROR
   

  useEffect(() => {
    if (!error) {
      return;
    }

    return () => {
      dispatch(
        clearBlogError(),
      );
    };
  }, [
    error,
    dispatch,
  ]);


  return (
    <div className="space-y-6">

      {/*                             = */}
      {/* HEADER */}
      {/*                             = */}

      <MyBlogsHeader />


      {/*                             = */}
      {/* FILTERS */}
      {/*                             = */}

      <MyBlogsFilters
        status={status}
        onStatusChange={
          handleStatusChange
        }
      />


      {/*                             = */}
      {/* BLOG TABLE */}
      {/*                             = */}

      <MyBlogsTable
        blogs={myBlogs}
        loading={loading}
        error={error}
        onSubmit={
          handleSubmit
        }
        onDelete={
          handleDelete
        }
      />


      {/*                             = */}
      {/* PAGINATION */}
      {/*                             = */}

      {myBlogsPagination && (
        <div className="flex justify-center">

          <Pagination
            pagination={
              myBlogsPagination
            }
            onPageChange={
              handlePageChange
            }
            loading={loading}
          />

        </div>
      )}

    </div>
  );
}