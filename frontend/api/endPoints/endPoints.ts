export const endPoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    me: "/auth/me",
    changePassword: "/auth/change-password",
  },

  blog: {
    getAllBlogs: "/blog",
    myBlogs: "/blog/my-blogs",
    adminBlogs: "/blog/administration/all",
    getBlogById: "/blog/:id",
    create: "/blog/create",
    updateBlog: "/blog/:id/update",
    submitBlog: "/blog/:id/submit",
    publishBlog: "/blog/:id/publish",
    rejectBlog: "/blog/:id/reject",
    unpublishBlog: "/blog/:id/unpublish",
    deleteBlog: "/blog/:id/delete",
  },

  category: {
    getCategories: "/category",
    getCategoriesById: "/category/:id",

    createCategory: "/category/create",
    updateCategory: "/category/:id/update",
    activateCategory: "/category/:id/activate",
    deactivateCategory: "/category/:id/deactivate",
    deleteCategory: "/category/:id/delete",
  },

  comment: {
    getApprovedCommentOfBlog: "/comment/blog/:blogId",

    createComment: "/comment/blog/:blogId/create",

    updateOwnComment: "/comment/:id/update",

    deleteOwnComment: "/comment/:id/delete",

    moderateComment: "/comment/:id/moderate",

    getCommentsForAuthor: "/comment/author",

    getAllCommentsForAdministration: "/comment/administration",
  },

  like: {
    blogLikeCount: "/like/:blogId/like-count",
    getBlogLikeStatus: "/like/:blogId/status",
    likeBlog: "/like/:blogId/like",
    unlikeBlog: "/like/:blogId/unlike",
  },

  notification: {
    getMyNotifications: "/notification",
    getMyNotification: "/notification",
    markAsRead: "/notification/:id/read",
    markAllAsRead: "/notification/read-all",
    deleteNotification: "/notification/:id/delete",
  },

  readingHistory: {
    addReadingHistory: "/readingHistory/:blogId",
    getMyReadingHistory: "/readingHistory",
    clearReadingHistory: "/readingHistory",
  },

  tag: {
    getTags: "/tag",
    getTagById: "/tag/:id",

    createTag: "/tag",
    updateTag: "/tag/:id",
    deleteTag: "/tag/:id",
  },

  // =================================
  // USER
  // =================================

  user: {
    // Profile
    getMyProfile: "/user/profile",
    updateMyProfile: "/user/profile/update",

    // Administration user management
    getUsers: "/user/all-user",
    getUserById: "/user/:id",
    updateUser: "/user/:id/update",
    activateUser: "/user/:id/activate",
    deactivateUser: "/user/:id/deactivate",
    blockUser: "/user/:id/block",
    deleteUser: "/user/:id/delete",
  },
  
  //Analytics
  analytics: {
  getAuthorAnalytics:
    "/analytics/author",

},
} as const;
