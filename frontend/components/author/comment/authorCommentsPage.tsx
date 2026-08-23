"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  clearCommentError,
  clearCommentSuccessMessage,
  getCommentsForAuthor,
} from "@/redux/slice/comment/commentSlice";

import CommentsHeader from "./commentsHeader";
import CommentsFilter from "./commentsFilter";
import CommentsList from "./commentsList";
import CommentsEmptyState from "./commentsEmptyState";


export default function AuthorCommentsPage() {
  const dispatch =
    useAppDispatch();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedBlog,
    setSelectedBlog,
  ] = useState("all");


  const {
    comments,
    loading,
    error,
  } = useAppSelector(
    (state) => state.comment,
  );


  // =================================
  // LOAD COMMENTS
  // =================================

  useEffect(() => {
    dispatch(
      getCommentsForAuthor(),
    );

    return () => {
      dispatch(
        clearCommentError(),
      );

      dispatch(
        clearCommentSuccessMessage(),
      );
    };
  }, [dispatch]);


  // =================================
  // FILTERED COMMENTS
  // =================================

  const filteredComments =
    useMemo(() => {

      return comments.filter(
        (comment) => {

          const searchValue =
            search.toLowerCase();


          const matchesSearch =
            comment.content
              .toLowerCase()
              .includes(
                searchValue,
              ) ||
            (typeof comment.user === "string"
              ? ""
              : comment.user?.name || ""
            ).toLowerCase().includes(searchValue);


          const matchesBlog =
            selectedBlog === "all" ||
            (typeof comment.blog === "string"
              ? ""
              : comment.blog?._id) === selectedBlog;


          return (
            matchesSearch &&
            matchesBlog
          );
        },
      );

    }, [
      comments,
      search,
      selectedBlog,
    ]);


  // =================================
  // GET UNIQUE BLOGS
  // =================================

  const blogs =
    useMemo(() => {

      const uniqueBlogs =
        new Map();

      comments.forEach(
        (comment) => {

          if (
            typeof comment.blog !== "string" &&
            comment.blog
          ) {
            uniqueBlogs.set(
              comment.blog._id,
              comment.blog,
            );
          }

        },
      );

      return Array.from(
        uniqueBlogs.values(),
      );

    }, [comments]);


  return (
    <div className="space-y-6">

      <CommentsHeader
        totalComments={
          comments.length
        }
      />


      <CommentsFilter
        search={search}
        onSearchChange={
          setSearch
        }
        selectedBlog={
          selectedBlog
        }
        onBlogChange={
          setSelectedBlog
        }
        blogs={blogs}
      />


      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}


      {filteredComments.length === 0 &&
      !loading ? (

        <CommentsEmptyState />

      ) : (

        <CommentsList
          comments={
            filteredComments
          }
          loading={
            loading
          }
        />

      )}

    </div>
  );
}