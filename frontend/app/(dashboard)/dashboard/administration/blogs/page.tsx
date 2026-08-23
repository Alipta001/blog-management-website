"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  deleteBlog,
  getAdminBlogs,
  publishBlog,
  rejectBlog,
  unpublishBlog,
} from "@/redux/slice/blog/blogSlice";

import type { GetAdminBlogsParams } from "@/types/blogRequest.types";

import {
  getCategories,
} from "@/redux/slice/category/categorySlice";

import {
  BlogsFilters,
  BlogsHeader,
  BlogsPagination,
  BlogsStats,
  BlogsTable,
} from "@/components/administration/blogs";


export default function AdministrationBlogsPage() {

  const dispatch =
    useAppDispatch();

  const router =
    useRouter();


  // =================================
  // BLOG STATE
  // =================================

  const {

    adminBlogs,

    adminBlogsPagination,

    adminBlogStats,

    loading,

  } =
    useAppSelector(
      (state) =>
        state.blog,
    );


  // =================================
  // CATEGORY STATE
  // =================================

  const {

    categories,

  } =
    useAppSelector(
      (state) =>
        state.category,
    );


  // =================================
  // FILTER STATE
  // =================================

  const [

    search,

    setSearch,

  ] =
    useState("");


  const [

    debouncedSearch,

    setDebouncedSearch,

  ] =
    useState("");


  const [

    status,

    setStatus,

  ] =
    useState("");


  const [

    category,

    setCategory,

  ] =
    useState("");


  const [

    currentPage,

    setCurrentPage,

  ] =
    useState(1);


  // =================================
  // FETCH CATEGORIES
  // =================================

  useEffect(
    () => {

      dispatch(
        getCategories(),
      );

    },
    [
      dispatch,
    ],
  );


  // =================================
  // DEBOUNCE SEARCH
  // =================================

  useEffect(
    () => {

      const timeout =
        setTimeout(
          () => {

            setDebouncedSearch(
              search,
            );

          },
          500,
        );


      return () => {

        clearTimeout(
          timeout,
        );

      };

    },
    [
      search,
    ],
  );


  // =================================
  // FETCH BLOGS
  // =================================

  const fetchBlogs =
    useCallback(
      (
        page = currentPage,
      ) => {

        dispatch(
          getAdminBlogs({

            page,

            limit:
              10,

            ...(debouncedSearch
              ? {
                  search:
                    debouncedSearch,
                }
              : {}),

            ...(status
              ? {
                  status: status as GetAdminBlogsParams["status"],
                }
              : {}),

            ...(category
              ? {
                  category,
                }
              : {}),

          }),
        );

      },
      [

        dispatch,

        currentPage,

        debouncedSearch,

        status,

        category,

      ],
    );


  // =================================
  // FETCH WHEN FILTER CHANGES
  // =================================

  useEffect(
    () => {

      fetchBlogs();

    },
    [
      fetchBlogs,
    ],
  );


  // =================================
  // SEARCH
  // =================================

  const handleSearchChange =
    (
      value: string,
    ) => {

      setSearch(
        value,
      );

      setCurrentPage(
        1,
      );

    };


  // =================================
  // STATUS
  // =================================

  const handleStatusChange =
    (
      value: string,
    ) => {

      setStatus(
        value,
      );

      setCurrentPage(
        1,
      );

    };


  // =================================
  // CATEGORY
  // =================================

  const handleCategoryChange =
    (
      value: string,
    ) => {

      setCategory(
        value,
      );

      setCurrentPage(
        1,
      );

    };


  // =================================
  // CLEAR FILTERS
  // =================================

  const handleClear =
    () => {

      setSearch("");

      setDebouncedSearch("");

      setStatus("");

      setCategory("");

      setCurrentPage(
        1,
      );

    };


  // =================================
  // PAGE CHANGE
  // =================================

  const handlePageChange =
    (
      page: number,
    ) => {

      if (
        page < 1
      ) {
        return;
      }


      if (
        adminBlogsPagination &&
        page >
          adminBlogsPagination.totalPages
      ) {
        return;
      }


      setCurrentPage(
        page,
      );

    };


  // =================================
  // REFRESH
  // =================================

  const handleRefresh =
    () => {

      fetchBlogs(
        currentPage,
      );

    };


  // =================================
  // VIEW BLOG
  // =================================

  const handleView =
    (
      id: string,
    ) => {

      router.push(
        `/dashboard/administration/blogs/${id}`,
      );

    };


  // =================================
  // PUBLISH BLOG
  // =================================

  const handlePublish =
    async (
      id: string,
    ) => {

      try {

        await dispatch(
          publishBlog(
            id,
          ),
        ).unwrap();


        fetchBlogs();

      } catch (
        error
      ) {

        console.error(
          "Failed to publish blog:",
          error,
        );

      }

    };


  // =================================
  // REJECT BLOG
  // =================================

  const handleReject =
    async (
      id: string,

      rejectionReason: string,
    ) => {

      try {

        await dispatch(
          rejectBlog({

            id,

            rejectionReason,

          }),
        ).unwrap();


        fetchBlogs();

      } catch (
        error
      ) {

        console.error(
          "Failed to reject blog:",
          error,
        );

      }

    };


  // =================================
  // UNPUBLISH BLOG
  // =================================

  const handleUnpublish =
    async (
      id: string,
    ) => {

      try {

        await dispatch(
          unpublishBlog(
            id,
          ),
        ).unwrap();


        fetchBlogs();

      } catch (
        error
      ) {

        console.error(
          "Failed to unpublish blog:",
          error,
        );

      }

    };


  // =================================
  // DELETE BLOG
  // =================================

  const handleDelete =
    async (
      id: string,
    ) => {

      try {

        await dispatch(
          deleteBlog(
            id,
          ),
        ).unwrap();


        fetchBlogs();

      } catch (
        error
      ) {

        console.error(
          "Failed to delete blog:",
          error,
        );

      }

    };


  return (

    <main
      className="
        mx-auto
        w-full
        max-w-[1600px]
        space-y-8
      "
    >


      {/* =============================
          HEADER
      ============================== */}

      <BlogsHeader

        onRefresh={
          handleRefresh
        }

        isRefreshing={
          loading
        }

      />


      {/* =============================
          STATISTICS
      ============================== */}

      <BlogsStats

        stats={
          adminBlogStats
        }

      />


      {/* =============================
          CONTENT
      ============================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#09090b]
        "
      >


        {/* =============================
            FILTERS
        ============================== */}

        <BlogsFilters

          search={
            search
          }

          status={
            status
          }

          category={
            category
          }

          categories={
            categories
          }

          onSearchChange={
            handleSearchChange
          }

          onStatusChange={
            handleStatusChange
          }

          onCategoryChange={
            handleCategoryChange
          }

          onClear={
            handleClear
          }

        />


        {/* =============================
            TABLE
        ============================== */}

        <BlogsTable

          blogs={
            adminBlogs
          }

          loading={
            loading
          }

          onView={
            handleView
          }

          onPublish={
            handlePublish
          }

          onReject={
            handleReject
          }

          onUnpublish={
            handleUnpublish
          }

          onDelete={
            handleDelete
          }

        />


        {/* =============================
            PAGINATION
        ============================== */}

        <BlogsPagination

          pagination={
            adminBlogsPagination
          }

          onPageChange={
            handlePageChange
          }

        />

      </section>

    </main>

  );

}