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
  getMyBlogs,
} from "@/redux/slice/blog/blogSlice";
import Pagination from "@/components/common/pagination/pagination";


export default function MyBlogsPage() {
  const dispatch =
    useAppDispatch();

  const {
    myBlogs,
    myBlogsPagination,
    loading,
  } = useAppSelector(
    (state) => state.blog,
  );

  const [page, setPage] =
    useState(1);

  const limit = 10;


  useEffect(() => {
    dispatch(
      getMyBlogs({
        page,
        limit,
      }),
    );
  }, [
    dispatch,
    page,
  ]);


  const handlePageChange = (
    selectedPage: number,
  ) => {
    setPage(selectedPage);
  };


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          My Blogs
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage and track all your blogs.
        </p>
      </div>


      <div className="rounded-2xl border border-white/10 bg-[#111114]">

        {loading ? (
          <div className="p-6">
            Loading...
          </div>
        ) : myBlogs.length === 0 ? (
          <div className="p-6 text-slate-400">
            No blogs found.
          </div>
        ) : (
          <div className="divide-y divide-white/10">

            {myBlogs.map((blog) => (
              <div
                key={blog._id}
                className="p-6"
              >
                <h2 className="font-semibold text-white">
                  {blog.title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {blog.description}
                </p>

                <p className="mt-3 text-xs text-violet-400">
                  {blog.status}
                </p>
              </div>
            ))}

          </div>
        )}


        <div className="px-6 pb-6">

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

      </div>

    </div>
  );
}