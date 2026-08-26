// "use client";

// import {
//   useEffect,
//   useRef,
// } from "react";

// import Link from "next/link";

// import {
//   useRouter,
// } from "next/navigation";

// import {
//   ArrowLeft,
// } from "lucide-react";

// import {
//   toast,
// } from "react-toastify";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "@/redux/hooks";

// import {
//   getCurrentUser,
// } from "@/redux/slice/auth/authSlice";

// import {
//   createComment,
//   getApprovedComments,
// } from "@/redux/slice/comment/commentSlice";

// import {
//   addReadingHistory,
// } from "@/redux/slice/readingHistory/readingHistorySlice";

// import {
//   likeBlog,
//   resetLikeState,
//   unlikeBlog,
// } from "@/redux/slice/like/likeSlice";

// import {
//   clearBlogError,
//   clearBlogSuccessMessage,
//   clearSelectedBlog,
//   deleteBlog,
//   getBlogById,
//   getBlogs,
//   publishBlog,
//   recordBlogView,
//   rejectBlog,
//   setSelectedBlogLikeState,
//   submitBlog,
//   unpublishBlog,
// } from "@/redux/slice/blog/blogSlice";

// import BlogComments from "./blogComments";
// import BlogContent from "./blogContent";
// import BlogContentImages from "./blogContentImages";
// import BlogFeaturedImage from "./blogFeaturedImage";
// import BlogInteractionBar from "./blogInteractionBar";
// import BlogMeta from "./blogMeta";
// import BlogNotFound from "./blogNotFound";
// import BlogRoleActions from "./blogRoleActions";
// import BlogSidebar from "./blogSidebar";
// import BlogViewHeader from "./blogViewHeader";
// import BlogViewSkeleton from "./blogViewSkeleton";

// // PROPS

// interface BlogViewPageProps {
//   id: string;

//   context?:
//     | "public"
//     | "author"
//     | "administration";
// }

// // COMPONENT

// export default function BlogViewPage({
//   id,
//   context = "public",
// }: BlogViewPageProps) {

//   const dispatch =
//     useAppDispatch();

//   const router =
//     useRouter();

//   // PREVENT DUPLICATE VIEW RECORDING

//   const hasRecordedView =
//     useRef(false);

//   // REDUX STATE

//   const blogState =
//     useAppSelector(
//       (state) => state.blog,
//     );

//   const auth =
//     useAppSelector(
//       (state) => state.auth,
//     );

//   const comments =
//     useAppSelector(
//       (state) => state.comment,
//     );

//   const likes =
//     useAppSelector(
//       (state) => state.like,
//     );

//   const blog =
//     blogState.selectedBlog;

//   // ROLE

//   const role =
//     auth.user?.role ||
//     (
//       context === "administration"
//         ? "administration"
//         : context === "author"
//           ? "author"
//           : "user"
//     );

//   // CHECK BLOG OWNER

//   const isOwner =
//     Boolean(
//       blog &&
//       typeof blog.author !== "string" &&
//       auth.user &&
//       blog.author._id === auth.user._id,
//     );

//   // LOAD BLOG
//   // COMMENTS
//   // CURRENT USER

//   useEffect(() => {

//     // Reset when blog ID changes
//     hasRecordedView.current =
//       false;

//     dispatch(
//       getBlogById(id),
//     );

//     dispatch(
//       getApprovedComments({
//         blogId: id,

//         page: 1,

//         limit: 20,
//       }),
//     );

//     if (
//       !auth.authInitialized
//     ) {

//       dispatch(
//         getCurrentUser(),
//       );

//     }

//     return () => {

//       dispatch(
//         clearSelectedBlog(),
//       );

//       dispatch(
//         clearBlogError(),
//       );

//       dispatch(
//         clearBlogSuccessMessage(),
//       );

//       dispatch(
//         resetLikeState(),
//       );

//     };

//   }, [
//     dispatch,
//     id,
//     auth.authInitialized,
//   ]);

//   // RECORD BLOG VIEW

//   useEffect(() => {

//     if (!blog) {
//       return;
//     }

//     if (
//       hasRecordedView.current
//     ) {
//       return;
//     }

//     hasRecordedView.current =
//       true;

//     dispatch(
//       recordBlogView(
//         blog._id,
//       ),
//     )
//       .unwrap()
//       .catch(
//         (error) => {

//           console.error(
//             "Failed to record blog view:",
//             error,
//           );

//           // Allow retry if request fails
//           hasRecordedView.current =
//             false;

//         },
//       );

//   }, [
//     blog,
//     dispatch,
//   ]);

//   // ADD READING HISTORY
//   // AUTHENTICATED USERS ONLY

//   useEffect(() => {

//     if (!blog) {
//       return;
//     }

//     if (
//       !auth.isAuthenticated
//     ) {
//       return;
//     }

//     dispatch(
//       addReadingHistory({
//         blogId: blog._id,
//       }),
//     );

//   }, [
//     blog,
//     auth.isAuthenticated,
//     dispatch,
//   ]);

//   // LOAD RELATED BLOGS

//   useEffect(() => {

//     if (!blog) {
//       return;
//     }

//     const category =
//       typeof blog.category === "string"
//         ? blog.category
//         : blog.category?._id;

//     if (!category) {
//       return;
//     }

//     dispatch(
//       getBlogs({

//         category,

//         page: 1,

//         limit: 4,

//       }),
//     );

//   }, [
//     blog,
//     dispatch,
//   ]);

//   // BLOG ERROR

//   useEffect(() => {

//     if (
//       !blogState.error
//     ) {
//       return;
//     }

//     toast.error(
//       blogState.error,
//     );

//     dispatch(
//       clearBlogError(),
//     );

//   }, [
//     blogState.error,
//     dispatch,
//   ]);

//   // GENERIC ACTION HANDLER

//   const action = async (
//     operation: Promise<unknown>,
//   ) => {

//     try {

//       await operation;

//       await dispatch(
//         getBlogById(id),
//       ).unwrap();

//     } catch (error) {

//       toast.error(

//         typeof error === "string"
//           ? error
//           : "Action failed",

//       );

//     }

//   };

//   // SUBMIT BLOG

//   const submit = () =>

//     action(

//       dispatch(
//         submitBlog(id),
//       ).unwrap(),

//     );

//   // PUBLISH BLOG

//   const publish = () =>

//     action(

//       dispatch(
//         publishBlog(id),
//       ).unwrap(),

//     );

//   // REJECT BLOG

//   const reject = (
//     reason: string,
//   ) =>

//     action(

//       dispatch(

//         rejectBlog({

//           id,

//           rejectionReason:
//             reason,

//         }),

//       ).unwrap(),

//     );

//   // UNPUBLISH BLOG

//   const unpublish = () =>

//     action(

//       dispatch(
//         unpublishBlog(id),
//       ).unwrap(),

//     );

//   // DELETE BLOG

//   const remove =
//     async () => {

//       if (

//         !window.confirm(

//           "Are you sure you want to delete this blog?",

//         )

//       ) {

//         return;

//       }

//       try {

//         await dispatch(
//           deleteBlog(id),
//         ).unwrap();

//         router.push(

//           role === "administration"
//             ? "/dashboard/administration/blogs"
//             : "/dashboard/author/my-blogs",

//         );

//       } catch (error) {

//         toast.error(

//           typeof error === "string"
//             ? error
//             : "Failed to delete blog",

//         );

//       }

//     };

//   // CREATE COMMENT

//   const postComment = async (
//     content: string,
//   ) => {
//     try {
//       const result =
//         await dispatch(
//           createComment({
//             blogId: id,
//             content,
//           }),
//         ).unwrap();

//       toast.success(result.message);
//     } catch (error) {
//       toast.error(
//         typeof error === "string"
//           ? error
//           : "Failed to send comment for review",
//       );
//     }
//   };

//   // TOGGLE LIKE

//   const toggleLike =
//     async () => {

//       if (
//         !auth.isAuthenticated
//       ) {

//         toast.info(
//           "Please login to like this blog.",
//         );

//         return;

//       }

//       try {

//         const result =
//           await dispatch(

//             blog?.isLiked
//               ? unlikeBlog(id)
//               : likeBlog(id),

//           ).unwrap();

//         dispatch(

//           setSelectedBlogLikeState({

//             likeCount:
//               result.totalLikes,

//             isLiked:
//               result.isLiked,

//           }),

//         );

//       } catch (error) {

//         toast.error(

//           typeof error === "string"
//             ? error
//             : "Unable to update like",

//         );

//       }

//     };

//   // LOADING

//   if (

//     blogState.loading &&
//     !blog

//   ) {

//     return (
//       <BlogViewSkeleton />
//     );

//   }

//   // NOT FOUND

//   if (!blog) {

//     return (

//       <BlogNotFound

//         message={
//           blogState.error ||
//           undefined
//         }

//       />

//     );

//   }

//   // RELATED BLOGS

//   const relatedBlogs =
//     blogState.blogs

//       .filter(
//         (item) => {

//           const blogCategory =

//             typeof blog.category ===
//             "string"

//               ? blog.category

//               : blog.category?._id;

//           const itemCategory =

//             typeof item.category ===
//             "string"

//               ? item.category

//               : item.category?._id;

//           return (

//             item._id !==
//               blog._id &&

//             blogCategory ===
//               itemCategory

//           );

//         },
//       )

//       .slice(
//         0,
//         3,
//       );

//   // RENDER

//   return (

//     <main className="min-h-screen bg-[#09090b]">

//       <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

//         {/*                      ====
//             ARTICLE HEADER
//                              ==== */}

//         <div className="mx-auto max-w-6xl">

//           <BlogViewHeader
//             blog={blog}
//           />

//           <div className="mt-5">

//             <BlogMeta
//               blog={blog}
//             />

//           </div>

//         </div>

//         {/*
//             ROLE ACTIONS
//                               */}

//         {context !== "public" && (

//           <div className="mx-auto mt-6 max-w-5xl">

//             <BlogRoleActions

//               blog={blog}

//               role={
//                 role === "administrator"
//                   ? "administration"
//                   : role
//               }

//               isOwner={isOwner}

//               loading={
//                 blogState.loading
//               }

//               onSubmit={
//                 submit
//               }

//               onPublish={
//                 publish
//               }

//               onReject={
//                 reject
//               }

//               onUnpublish={
//                 unpublish
//               }

//               onDelete={
//                 remove
//               }

//             />

//           </div>

//         )}

//         {/*                      ====
//             MAIN ARTICLE LAYOUT
//                              ==== */}

//         <div

//           className="
//             mx-auto
//             mt-10
//             grid
//             max-w-6xl
//             gap-10
//             lg:grid-cols-[minmax(0,1fr)_280px]
//           "

//         >

//           {/*
//               ARTICLE
//                                 */}

//           <article className="min-w-0">

//             {/* Hero */}

//             <BlogFeaturedImage
//               blog={blog}
//             />

//             <BlogContentImages
//               images={blog.contentImages}
//               title={blog.title}
//             />

//             {/* Content */}

//             <div className="mt-8">

//               <BlogContent
//                 content={blog.content}
//               />

//             </div>

//             {/* Interaction */}

//             <div className="mt-8">

//               <BlogInteractionBar

//                 blogId={blog._id}

//                 totalLikes={
//                   blog.likeCount || 0
//                 }

//                 isLiked={
//                   blog.isLiked || false
//                 }

//                 loading={
//                   likes.loading ||
//                   blogState.loading
//                 }

//                 onLike={
//                   toggleLike
//                 }

//                 onUnlike={
//                   toggleLike
//                 }

//               />

//             </div>

//             {/* Comments */}

//             <div className="mt-10">

//               <BlogComments

//                 comments={
//                   comments.comments
//                 }

//                 loading={
//                   comments.loading
//                 }

//                 authenticated={
//                   auth.isAuthenticated
//                 }

//                 onSubmit={
//                   postComment
//                 }

//               />

//             </div>

//             {/*
//                 RELATED BLOGS
//                                   */}

//             {relatedBlogs.length > 0 && (

//               <section className="mt-14 border-t border-white/10 pt-10">

//                 <div className="mb-5">

//                   <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">

//                     Continue reading

//                   </p>

//                   <h2 className="mt-1 text-2xl font-bold text-white">

//                     You may also like

//                   </h2>

//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-3">

//                   {relatedBlogs.map(
//                     (related) => (

//                       <Link

//                         key={
//                           related._id
//                         }

//                         href={
//                           `/dashboard/administration/blogs/${related._id}`
//                         }

//                         className="
//                           group
//                           rounded-2xl
//                           border
//                           border-white/10
//                           bg-[#111114]
//                           p-5
//                           transition
//                           hover:-translate-y-0.5
//                           hover:border-violet-500/30
//                         "

//                       >

//                         <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-slate-300 transition group-hover:text-white">

//                           {related.title}

//                         </h3>

//                         <span className="mt-4 block text-xs text-violet-400">

//                           Read article →

//                         </span>

//                       </Link>

//                     ),
//                   )}

//                 </div>

//               </section>

//             )}

//           </article>

//           {/*
//               SIDEBAR
//                                 */}

//           <aside className="lg:sticky lg:top-24 lg:self-start">

//             <BlogSidebar
//               blog={blog}
//             />

//           </aside>

//         </div>

//       </div>

//     </main>

//   );

// }

"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";

import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

import { getCurrentUser } from "@/redux/slice/auth/authSlice";

import {
  createComment,
  getApprovedComments,
  toggleCommentLike,
  toggleCommentPin,
} from "@/redux/slice/comment/commentSlice";

import { addReadingHistory } from "@/redux/slice/readingHistory/readingHistorySlice";

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
import BlogContentImages from "./blogContentImages";
import BlogFeaturedImage from "./blogFeaturedImage";
import BlogInteractionBar from "./blogInteractionBar";
import BlogMeta from "./blogMeta";
import BlogNotFound from "./blogNotFound";
import BlogRoleActions from "./blogRoleActions";
import BlogSidebar from "./blogSidebar";
import BlogViewHeader from "./blogViewHeader";
import BlogViewSkeleton from "./blogViewSkeleton";

interface BlogViewPageProps {
  id: string;

  context?: "public" | "author" | "administration";
}

export default function BlogViewPage({
  id,
  context = "public",
}: BlogViewPageProps) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  // =========================================
  // PREVENT DUPLICATE VIEW RECORDING
  // =========================================

  const hasRecordedView = useRef(false);

  // =========================================
  // REDUX STATE
  // =========================================

  const blogState = useAppSelector((state) => state.blog);

  const auth = useAppSelector((state) => state.auth);

  const comments = useAppSelector((state) => state.comment);

  const likes = useAppSelector((state) => state.like);

  const blog = blogState.selectedBlog;
  const [isFavoriteAuthor, setIsFavoriteAuthor] = useState(false);
  const [favoriteAuthorLoading, setFavoriteAuthorLoading] = useState(false);

  const blogAuthorId =
    blog && typeof blog.author !== "string" ? blog.author._id : null;

  useEffect(() => {
    if (!auth.isAuthenticated || !blogAuthorId) {
      setIsFavoriteAuthor(false);
      return;
    }

    AxiosInstance.get(endPoints.user.favoriteAuthors)
      .then((response) => {
        const authors = response.data.data.authors || [];
        setIsFavoriteAuthor(
          authors.some((author: { _id: string }) => author._id === blogAuthorId),
        );
      })
      .catch(() => setIsFavoriteAuthor(false));
  }, [auth.isAuthenticated, blogAuthorId]);

  // =========================================
  // ROLE
  // =========================================

  const role =
    auth.user?.role ||
    (context === "administration"
      ? "administration"
      : context === "author"
        ? "author"
        : "user");

  // =========================================
  // CHECK BLOG OWNER
  // =========================================

  const isOwner = Boolean(
    blog &&
    typeof blog.author !== "string" &&
    auth.user &&
    blog.author._id === auth.user._id,
  );

  // =========================================
  // LOAD BLOG / COMMENTS / USER
  // =========================================

  useEffect(() => {
    hasRecordedView.current = false;

    dispatch(getBlogById(id));

    dispatch(
      getApprovedComments({
        blogId: id,
        page: 1,
        limit: 20,
      }),
    );

    if (!auth.authInitialized && context !== "public") {
      dispatch(getCurrentUser());
    }

    return () => {
      dispatch(clearSelectedBlog());

      dispatch(clearBlogError());

      dispatch(clearBlogSuccessMessage());

      dispatch(resetLikeState());
    };
  }, [auth.authInitialized, context, dispatch, id]);

  // =========================================
  // RECORD BLOG VIEW
  // =========================================

  useEffect(() => {
    if (!blog) {
      return;
    }

    if (hasRecordedView.current) {
      return;
    }

    hasRecordedView.current = true;

    dispatch(recordBlogView(blog._id))
      .unwrap()
      .catch((error) => {
        console.error("Failed to record blog view:", error);

        hasRecordedView.current = false;
      });
  }, [blog, dispatch]);

  // =========================================
  // ADD READING HISTORY
  // =========================================

  useEffect(() => {
    if (!blog) {
      return;
    }

    if (!auth.isAuthenticated) {
      return;
    }

    dispatch(
      addReadingHistory({
        blogId: blog._id,
      }),
    );
  }, [blog, auth.isAuthenticated, dispatch]);

  // =========================================
  // LOAD RELATED BLOGS
  // =========================================

  useEffect(() => {
    if (!blog) {
      return;
    }

    const category =
      typeof blog.category === "string" ? blog.category : blog.category?._id;

    if (!category) {
      return;
    }

    dispatch(
      getBlogs({
        category,

        page: 1,

        limit: 6,
      }),
    );
  }, [blog, dispatch]);

  // =========================================
  // BLOG ERROR
  // =========================================

  useEffect(() => {
    if (!blogState.error) {
      return;
    }

    toast.error(blogState.error);

    dispatch(clearBlogError());
  }, [blogState.error, dispatch]);

  // =========================================
  // GENERIC ACTION HANDLER
  // =========================================

  const action = async (operation: Promise<unknown>) => {
    try {
      await operation;

      await dispatch(getBlogById(id)).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Action failed");
    }
  };

  // =========================================
  // BLOG ACTIONS
  // =========================================

  const submit = () => action(dispatch(submitBlog(id)).unwrap());

  const publish = () => action(dispatch(publishBlog(id)).unwrap());

  const reject = (reason: string) =>
    action(
      dispatch(
        rejectBlog({
          id,

          rejectionReason: reason,
        }),
      ).unwrap(),
    );

  const unpublish = () => action(dispatch(unpublishBlog(id)).unwrap());

  // =========================================
  // DELETE BLOG
  // =========================================

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      await dispatch(deleteBlog(id)).unwrap();

      router.push(
        role === "administration"
          ? "/dashboard/administration/blogs"
          : "/dashboard/author/my-blogs",
      );
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to delete blog");
    }
  };

  // =========================================
  // CREATE COMMENT
  // =========================================

  const postComment = async (content: string, parentComment?: string) => {
    try {
      const result = await dispatch(
        createComment({
          blogId: id,
          content,
          parentComment,
        }),
      ).unwrap();

      toast.success(result.message);
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to send comment for review",
      );
    }
  };

  const likeComment = async (commentId: string) => {
    if (!auth.isAuthenticated) {
      toast.info("Please login to like comments.");
      return;
    }
    try {
      await dispatch(toggleCommentLike(commentId)).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update comment like");
    }
  };

  const pinComment = async (commentId: string) => {
    try {
      await dispatch(toggleCommentPin(commentId)).unwrap();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update pinned comment");
    }
  };

  // =========================================
  // TOGGLE LIKE
  // =========================================

  const toggleLike = async () => {
    if (!auth.isAuthenticated) {
      toast.info("Please login to like this blog.");

      return;
    }

    try {
      const result = await dispatch(
        blog?.isLiked ? unlikeBlog(id) : likeBlog(id),
      ).unwrap();

      dispatch(
        setSelectedBlogLikeState({
          likeCount: result.totalLikes,

          isLiked: result.isLiked,
        }),
      );
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update like");
    }
  };

  const toggleFavoriteAuthor = async () => {
    if (!blogAuthorId) return;
    if (!auth.isAuthenticated) {
      toast.info("Please login to add favourite authors.");
      return;
    }

    setFavoriteAuthorLoading(true);
    try {
      const response = await AxiosInstance.patch(
        endPoints.user.toggleFavoriteAuthor.replace(":id", blogAuthorId),
      );
      setIsFavoriteAuthor(response.data.data.isFavorite);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to update favourite author",
      );
    } finally {
      setFavoriteAuthorLoading(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (blogState.loading && !blog) {
    return <BlogViewSkeleton />;
  }

  // =========================================
  // NOT FOUND
  // =========================================

  if (!blog) {
    return <BlogNotFound message={blogState.error || undefined} />;
  }

  // =========================================
  // RELATED BLOGS
  // =========================================

  const relatedBlogs = blogState.blogs

    .filter((item) => {
      const blogCategory =
        typeof blog.category === "string" ? blog.category : blog.category?._id;

      const itemCategory =
        typeof item.category === "string" ? item.category : item.category?._id;

      return item._id !== blog._id && blogCategory === itemCategory;
    })

    .slice(0, 3);

  // =========================================
  // BACK LINK
  // =========================================

  const backHref =
    context === "administration"
      ? "/dashboard/administration/blogs"
      : context === "author"
        ? "/dashboard/author/my-blogs"
        : "/blogs";

  const blogHref = (blogId: string) => {
    if (context === "administration") {
      return `/dashboard/administration/blogs/${blogId}`;
    }

    if (context === "author") {
      return `/dashboard/author/my-blogs/${blogId}`;
    }

    return `/blogs/${blogId}`;
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <main
      className="
        min-h-screen
        bg-slate-50/50
        text-slate-900
        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          py-6
          sm:px-6
          lg:px-8
          lg:py-10
        "
      >
        {/* =====================================
            BACK BUTTON
        ====================================== */}

        <div className="mx-auto max-w-6xl">
          <Link
            href={backHref}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              text-slate-600
              dark:text-slate-400
              transition
              hover:text-slate-900
              dark:hover:text-white
            "
          >
            <ArrowLeft
              className="
                h-4
                w-4
                transition-transform
                group-hover:-translate-x-1
              "
            />
            Back to blogs
          </Link>
        </div>

        {/* =====================================
            ARTICLE HEADER
        ====================================== */}

        <section
          className="
            mx-auto
            mt-8
            max-w-6xl
            border-b
            border-slate-200
            pb-10
            pt-6
            dark:border-slate-800
            sm:p-10
            lg:p-14
          "
        >
          <BlogViewHeader blog={blog} />

          <div className="mt-8">
            <BlogMeta blog={blog} />
          </div>
        </section>

        {/* =====================================
            ROLE ACTIONS
        ====================================== */}

        {context !== "public" && (
          <div
            className="
              mx-auto
              mt-6
              max-w-6xl
            "
          >
            <BlogRoleActions
              blog={blog}
              role={role === "administrator" ? "administration" : role}
              isOwner={isOwner}
              loading={blogState.loading}
              onSubmit={submit}
              onPublish={publish}
              onReject={reject}
              onUnpublish={unpublish}
              onDelete={remove}
            />
          </div>
        )}

        {/* =====================================
            MAIN ARTICLE LAYOUT
        ====================================== */}

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
          {/* =====================================
              ARTICLE
          ====================================== */}

          <article className="min-w-0">
            {/* FEATURED IMAGE */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900/60
                dark:shadow-none
              "
            >
              <BlogFeaturedImage blog={blog} />
            </div>

            {/* CONTENT IMAGES */}

            <BlogContentImages images={blog.contentImages} title={blog.title} />

            {/* ARTICLE CONTENT */}

            <div className="mt-8">
              <BlogContent content={blog.content} />
            </div>

            {/* READING END DIVIDER */}

            <div
              className="
                my-10
                flex
                items-center
                gap-4
              "
            >
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-violet-200
                  bg-violet-50
                  dark:border-violet-500/20
                  dark:bg-violet-500/10
                "
              >
                <BookOpen className="h-4 w-4 text-violet-400" />
              </div>

              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* =====================================
                INTERACTION
            ====================================== */}

            
              <BlogInteractionBar
                blogId={blog._id}
                totalLikes={blog.likeCount || 0}
                isLiked={blog.isLiked || false}
                loading={likes.loading || blogState.loading}
                onLike={toggleLike}
                onUnlike={toggleLike}
                isFavoriteAuthor={isFavoriteAuthor}
                favoriteAuthorLoading={favoriteAuthorLoading}
                onToggleFavoriteAuthor={toggleFavoriteAuthor}
              />

            {/* =====================================
    AUTHOR
===================================== */}

            {/* =====================================
    COMMENTS
===================================== */}

            <div
              className="
    mt-12
    border-t
    border-slate-200
    dark:border-slate-800
    pt-10
  "
            >
              <BlogComments
                comments={comments.comments}
                loading={comments.loading}
                authenticated={auth.isAuthenticated}
                isAuthor={isOwner}
                onLike={likeComment}
                onPin={pinComment}
                onSubmit={postComment}
              />
            </div>

            {/* =====================================
                RELATED BLOGS
            ====================================== */}

            {relatedBlogs.length > 0 && (
              <section
                className="
                  mt-16
                  border-t
                  border-slate-200
                  dark:border-slate-800
                  pt-12
                "
              >
                {/* Section Header */}

                <div
                  className="
                    mb-8
                    flex
                    flex-wrap
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-violet-400
                      "
                    >
                      Continue exploring
                    </p>

                    <h2
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                        sm:text-3xl
                      "
                    >
                      You may also like
                    </h2>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-500
                      "
                    >
                      More articles from the same category.
                    </p>
                  </div>

                  <Link
                    href={backHref}
                    className="
                      hidden
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-violet-400
                      transition
                      hover:text-violet-300
                      sm:inline-flex
                    "
                  >
                    Explore more
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Related Blog Cards */}

                <div
                  className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                >
                  {relatedBlogs.map((related) => {
                    const relatedCategory =
                      typeof related.category === "string"
                        ? "Blog"
                        : related.category?.name || "Blog";

                    const relatedImage = related.featuredImage?.url;

                    return (
                      <Link
                        key={related._id}
                        href={blogHref(related._id)}
                        className="
                            group
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:border-violet-500/30
                            hover:shadow-md
                            dark:border-slate-800
                            dark:bg-slate-900/60
                            dark:hover:shadow-none
                          "
                      >
                        {/* Image */}

                        <div
                          className="
                              relative
                              aspect-[16/9]
                              overflow-hidden
                              bg-slate-100
                              dark:bg-slate-900
                            "
                        >
                          {relatedImage ? (
                            <Image
                              src={relatedImage}
                              alt={related.title}
                              fill
                              sizes="
                                  (max-width: 640px) 100vw,
                                  (max-width: 1024px) 50vw,
                                  33vw
                                "
                              className="
                                  object-cover
                                  transition
                                  duration-700
                                  group-hover:scale-105
                                "
                            />
                          ) : (
                            <div
                              className="
                                  flex
                                  h-full
                                  items-center
                                  justify-center
                                "
                            >
                              <BookOpen
                                className="
                                    h-8
                                    w-8
                                    text-violet-400/50
                                  "
                              />
                            </div>
                          )}

                          <div
                            className="
                                absolute
                                inset-0
                                blog-image-overlay
                                bg-transparent
                                dark:bg-gradient-to-t
                                dark:from-black/50
                                dark:via-transparent
                                dark:to-transparent
                              "
                          />
                        </div>

                        {/* Content */}

                        <div className="p-5">
                          <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-3
                              "
                          >
                            <span
                              className="
                                  text-xs
                                  font-medium
                                  text-violet-400
                                "
                            >
                              {relatedCategory}
                            </span>

                            {related.readingTime && (
                              <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-xs
                                    text-slate-500
                                  "
                              >
                                <Clock3 className="h-3 w-3" />
                                {related.readingTime} min
                              </span>
                            )}
                          </div>

                          <h3
                            className="
                                mt-3
                                line-clamp-3
                                text-base
                                font-semibold
                                leading-6
                                text-slate-900
                                dark:text-slate-200
                                transition
                                group-hover:text-slate-700
                                dark:group-hover:text-white
                              "
                          >
                            {related.title}
                          </h3>

                          <div
                            className="
                                mt-5
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-violet-400
                              "
                          >
                            Read article
                            <ArrowUpRight
                              className="
                                  h-4
                                  w-4
                                  transition-transform
                                  group-hover:translate-x-0.5
                                  group-hover:-translate-y-0.5
                                "
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </article>

          {/* =====================================
              SIDEBAR
          ====================================== */}

          <aside
            className="
              order-first
              lg:sticky
              lg:top-24
              lg:self-start
              lg:order-none
            "
          >
            <BlogSidebar blog={blog} />
          </aside>
        </div>
      </div>
    </main>
  );
}
