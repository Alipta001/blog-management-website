"use client";

import {
  useEffect,
  useRef,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  getCurrentUser,
} from "@/redux/slice/auth/authSlice";

import {
  createComment,
  getApprovedComments,
} from "@/redux/slice/comment/commentSlice";

import {
  addReadingHistory,
} from "@/redux/slice/readingHistory/readingHistorySlice";

import {
  likeBlog,
  resetLikeState,
  unlikeBlog,
} from "@/redux/slice/like/likeSlice";

import {
  clearBlogError,
  clearBlogSuccessMessage,
  clearSelectedBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  publishBlog,
  recordBlogView,
  rejectBlog,
  setSelectedBlogLikeState,
  submitBlog,
  unpublishBlog,
} from "@/redux/slice/blog/blogSlice";

import BlogComments from "./blogComments";
import BlogContent from "./blogContent";
import BlogFeaturedImage from "./blogFeaturedImage";
import BlogInteractionBar from "./blogInteractionBar";
import BlogMeta from "./blogMeta";
import BlogNotFound from "./blogNotFound";
import BlogRoleActions from "./blogRoleActions";
import BlogSidebar from "./blogSidebar";
import BlogViewHeader from "./blogViewHeader";
import BlogViewSkeleton from "./blogViewSkeleton";


// =================================
// PROPS
// =================================

interface BlogViewPageProps {
  id: string;

  context?:
    | "public"
    | "author"
    | "administration";
}


// =================================
// COMPONENT
// =================================

export default function BlogViewPage({
  id,
  context = "public",
}: BlogViewPageProps) {

  const dispatch =
    useAppDispatch();

  const router =
    useRouter();


  // =================================
  // PREVENT DUPLICATE VIEW RECORDING
  // =================================

  const hasRecordedView =
    useRef(false);


  // =================================
  // REDUX STATE
  // =================================

  const blogState =
    useAppSelector(
      (state) => state.blog,
    );

  const auth =
    useAppSelector(
      (state) => state.auth,
    );

  const comments =
    useAppSelector(
      (state) => state.comment,
    );

  const likes =
    useAppSelector(
      (state) => state.like,
    );


  const blog =
    blogState.selectedBlog;


  // =================================
  // ROLE
  // =================================

  const role =
    auth.user?.role ||
    (
      context === "administration"
        ? "administration"
        : context === "author"
          ? "author"
          : "user"
    );


  // =================================
  // CHECK BLOG OWNER
  // =================================

  const isOwner =
    Boolean(
      blog &&
      typeof blog.author !== "string" &&
      auth.user &&
      blog.author._id === auth.user._id,
    );


  // =================================
  // LOAD BLOG
  // COMMENTS
  // CURRENT USER
  // =================================

  useEffect(() => {

    // Reset when blog ID changes
    hasRecordedView.current =
      false;


    dispatch(
      getBlogById(id),
    );


    dispatch(
      getApprovedComments({
        blogId: id,

        page: 1,

        limit: 20,
      }),
    );


    if (
      !auth.authInitialized
    ) {

      dispatch(
        getCurrentUser(),
      );

    }


    return () => {

      dispatch(
        clearSelectedBlog(),
      );

      dispatch(
        clearBlogError(),
      );

      dispatch(
        clearBlogSuccessMessage(),
      );

      dispatch(
        resetLikeState(),
      );

    };

  }, [
    dispatch,
    id,
    auth.authInitialized,
  ]);


  // =================================
  // RECORD BLOG VIEW
  // =================================

  useEffect(() => {

    if (!blog) {
      return;
    }


    if (
      hasRecordedView.current
    ) {
      return;
    }


    hasRecordedView.current =
      true;


    dispatch(
      recordBlogView(
        blog._id,
      ),
    )
      .unwrap()
      .catch(
        (error) => {

          console.error(
            "Failed to record blog view:",
            error,
          );

          // Allow retry if request fails
          hasRecordedView.current =
            false;

        },
      );

  }, [
    blog,
    dispatch,
  ]);


  // =================================
  // ADD READING HISTORY
  // AUTHENTICATED USERS ONLY
  // =================================

  useEffect(() => {

    if (!blog) {
      return;
    }


    if (
      !auth.isAuthenticated
    ) {
      return;
    }


    dispatch(
      addReadingHistory({
        blogId: blog._id,
      }),
    );

  }, [
    blog,
    auth.isAuthenticated,
    dispatch,
  ]);


  // =================================
  // LOAD RELATED BLOGS
  // =================================

  useEffect(() => {

    if (!blog) {
      return;
    }


    const category =
      typeof blog.category === "string"
        ? blog.category
        : blog.category?._id;


    if (!category) {
      return;
    }


    dispatch(
      getBlogs({

        category,

        page: 1,

        limit: 4,

      }),
    );

  }, [
    blog,
    dispatch,
  ]);


  // =================================
  // BLOG ERROR
  // =================================

  useEffect(() => {

    if (
      !blogState.error
    ) {
      return;
    }


    toast.error(
      blogState.error,
    );


    dispatch(
      clearBlogError(),
    );

  }, [
    blogState.error,
    dispatch,
  ]);


  // =================================
  // GENERIC ACTION HANDLER
  // =================================

  const action = async (
    operation: Promise<unknown>,
  ) => {

    try {

      await operation;


      await dispatch(
        getBlogById(id),
      ).unwrap();

    } catch (error) {

      toast.error(

        typeof error === "string"
          ? error
          : "Action failed",

      );

    }

  };


  // =================================
  // SUBMIT BLOG
  // =================================

  const submit = () =>

    action(

      dispatch(
        submitBlog(id),
      ).unwrap(),

    );


  // =================================
  // PUBLISH BLOG
  // =================================

  const publish = () =>

    action(

      dispatch(
        publishBlog(id),
      ).unwrap(),

    );


  // =================================
  // REJECT BLOG
  // =================================

  const reject = (
    reason: string,
  ) =>

    action(

      dispatch(

        rejectBlog({

          id,

          rejectionReason:
            reason,

        }),

      ).unwrap(),

    );


  // =================================
  // UNPUBLISH BLOG
  // =================================

  const unpublish = () =>

    action(

      dispatch(
        unpublishBlog(id),
      ).unwrap(),

    );


  // =================================
  // DELETE BLOG
  // =================================

  const remove =
    async () => {

      if (

        !window.confirm(

          "Are you sure you want to delete this blog?",

        )

      ) {

        return;

      }


      try {

        await dispatch(
          deleteBlog(id),
        ).unwrap();


        router.push(

          role === "administration"
            ? "/dashboard/administration/blogs"
            : "/dashboard/author/my-blogs",

        );

      } catch (error) {

        toast.error(

          typeof error === "string"
            ? error
            : "Failed to delete blog",

        );

      }

    };


  // =================================
  // CREATE COMMENT
  // =================================

  const postComment = async (
    content: string,
  ) => {
    try {
      const result =
        await dispatch(
          createComment({
            blogId: id,
            content,
          }),
        ).unwrap();

      toast.success(result.message);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to send comment for review",
      );
    }
  };


  // =================================
  // TOGGLE LIKE
  // =================================

  const toggleLike =
    async () => {

      if (
        !auth.isAuthenticated
      ) {

        toast.info(
          "Please login to like this blog.",
        );

        return;

      }


      try {

        const result =
          await dispatch(

            blog?.isLiked
              ? unlikeBlog(id)
              : likeBlog(id),

          ).unwrap();


        dispatch(

          setSelectedBlogLikeState({

            likeCount:
              result.totalLikes,

            isLiked:
              result.isLiked,

          }),

        );

      } catch (error) {

        toast.error(

          typeof error === "string"
            ? error
            : "Unable to update like",

        );

      }

    };


  // =================================
  // LOADING
  // =================================

  if (

    blogState.loading &&
    !blog

  ) {

    return (
      <BlogViewSkeleton />
    );

  }


  // =================================
  // NOT FOUND
  // =================================

  if (!blog) {

    return (

      <BlogNotFound

        message={
          blogState.error ||
          undefined
        }

      />

    );

  }


  // =================================
  // RELATED BLOGS
  // =================================

  const relatedBlogs =
    blogState.blogs

      .filter(
        (item) => {

          const blogCategory =

            typeof blog.category ===
            "string"

              ? blog.category

              : blog.category?._id;


          const itemCategory =

            typeof item.category ===
            "string"

              ? item.category

              : item.category?._id;


          return (

            item._id !==
              blog._id &&

            blogCategory ===
              itemCategory

          );

        },
      )

      .slice(
        0,
        3,
      );


  // =================================
  // RENDER
  // =================================

  return (

    <main className="min-h-screen bg-[#09090b]">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">


        {/* =========================
            ARTICLE HEADER
        ========================= */}

        <div className="mx-auto max-w-6xl">

          <BlogViewHeader
            blog={blog}
          />


          <div className="mt-5">

            <BlogMeta
              blog={blog}
            />

          </div>

        </div>


        {/* =========================
            ROLE ACTIONS
        ========================= */}

        {context !== "public" && (

          <div className="mx-auto mt-6 max-w-5xl">

            <BlogRoleActions

              blog={blog}

              role={
                role === "administrator"
                  ? "administration"
                  : role
              }

              isOwner={isOwner}

              loading={
                blogState.loading
              }

              onSubmit={
                submit
              }

              onPublish={
                publish
              }

              onReject={
                reject
              }

              onUnpublish={
                unpublish
              }

              onDelete={
                remove
              }

            />

          </div>

        )}


        {/* =========================
            MAIN ARTICLE LAYOUT
        ========================= */}

        <div

          className="
            mx-auto
            mt-10
            grid
            max-w-6xl
            gap-10
            lg:grid-cols-[minmax(0,1fr)_280px]
          "

        >


          {/* =====================
              ARTICLE
          ===================== */}

          <article className="min-w-0">


            {/* Hero */}

            <BlogFeaturedImage
              blog={blog}
            />


            {/* Content */}

            <div className="mt-8">

              <BlogContent
                content={blog.content}
              />

            </div>


            {/* Interaction */}

            <div className="mt-8">

              <BlogInteractionBar

                blogId={blog._id}

                totalLikes={
                  blog.likeCount || 0
                }

                isLiked={
                  blog.isLiked || false
                }

                loading={
                  likes.loading ||
                  blogState.loading
                }

                onLike={
                  toggleLike
                }

                onUnlike={
                  toggleLike
                }

              />

            </div>


            {/* Comments */}

            <div className="mt-10">

              <BlogComments

                comments={
                  comments.comments
                }

                loading={
                  comments.loading
                }

                authenticated={
                  auth.isAuthenticated
                }

                onSubmit={
                  postComment
                }

              />

            </div>


            {/* =====================
                RELATED BLOGS
            ===================== */}

            {relatedBlogs.length > 0 && (

              <section className="mt-14 border-t border-white/10 pt-10">

                <div className="mb-5">

                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">

                    Continue reading

                  </p>


                  <h2 className="mt-1 text-2xl font-bold text-white">

                    You may also like

                  </h2>

                </div>


                <div className="grid gap-4 sm:grid-cols-3">

                  {relatedBlogs.map(
                    (related) => (

                      <Link

                        key={
                          related._id
                        }

                        href={
                          `/blogs/${related._id}`
                        }

                        className="
                          group
                          rounded-2xl
                          border
                          border-white/10
                          bg-[#111114]
                          p-5
                          transition
                          hover:-translate-y-0.5
                          hover:border-violet-500/30
                        "

                      >

                        <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-slate-300 transition group-hover:text-white">

                          {related.title}

                        </h3>


                        <span className="mt-4 block text-xs text-violet-400">

                          Read article →

                        </span>

                      </Link>

                    ),
                  )}

                </div>

              </section>

            )}

          </article>


          {/* =====================
              SIDEBAR
          ===================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <BlogSidebar
              blog={blog}
            />

          </aside>

        </div>

      </div>

    </main>

  );

}