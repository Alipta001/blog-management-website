export const endPoints = {
  auth: {
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    // Registration OTP flow
    sendRegistrationOtp: "/auth/send-registration-otp",
    resendRegistrationOtp: "/auth/resend-registration-otp",
    verifyRegistrationOtp: "/auth/verify-registration-otp",
    // Authentication
    login: "/auth/login",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    me: "/auth/me",
    changePassword: "/auth/change-password",
  },

  blog: {
    getAllBlogs: "/blog",
    myBlogs: "/blog/my-blogs",
    recordBlogView: "/blog/:id/view",
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

    likeComment: "/comment/:id/like",

    pinComment: "/comment/:id/pin",

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

   
  // USER
   

  user: {
    // Profile
    getMyProfile: "/user/profile",
    updateMyProfile: "/user/profile/update",
    favoriteAuthors: "/user/favorite-authors",
    toggleFavoriteAuthor: "/user/favorite-authors/:id",

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
    getAuthorAnalytics: "/analytics/author",
  },

  facts: {
    getDailyFacts: "/facts",
  },
} as const;
