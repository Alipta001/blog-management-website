const mongoose = require("mongoose");

const Blog = require(
"../models/blog"
);

const Comment = require(
"../models/comment"
);

const Like = require(
"../models/like"
);

const ReadingHistory = require(
"../models/readingHistory"
);

class AnalyticsController {

constructor() {
this.getAuthorAnalytics =
  this.getAuthorAnalytics.bind(this);

}

// =================================
// GET DATE RANGE
// =================================

getDateRange(range) {

const now =
  new Date();

let startDate =
  new Date();


switch (range) {

  case "7d":

    startDate.setDate(
      now.getDate() - 6
    );

    break;


  case "30d":

    startDate.setDate(
      now.getDate() - 29
    );

    break;


  case "90d":

    startDate.setDate(
      now.getDate() - 89
    );

    break;


  case "all":

    return null;


  default:

    startDate.setDate(
      now.getDate() - 29
    );

    break;

}


startDate.setHours(
  0,
  0,
  0,
  0
);


return startDate;

}

// =================================
// GET AUTHOR ANALYTICS
//
// GET /analytics/author
// GET /analytics/author?range=7d
// GET /analytics/author?range=30d
// GET /analytics/author?range=90d
// GET /analytics/author?range=all
// =================================

async getAuthorAnalytics(
req,
res,
next
) {

try {

  const authorId =
    new mongoose.Types.ObjectId(
      req.user.id
    );


  const {
    range = "30d",
  } = req.query;


  const allowedRanges = [
    "7d",
    "30d",
    "90d",
    "all",
  ];


  if (
    !allowedRanges.includes(
      range
    )
  ) {

    return res.status(400).json({
      success: false,

      message:
        "Invalid analytics range",
    });

  }


  const startDate =
    this.getDateRange(
      range
    );


  const [
    stats,
    blogStatus,
    topBlogs,
    performance,
  ] =
    await Promise.all([

      this.getAuthorStats(
        authorId,
        startDate
      ),

      this.getBlogStatus(
        authorId
      ),

      this.getTopBlogs(
        authorId
      ),

      this.getPerformanceData(
        authorId,
        startDate
      ),

    ]);


  return res.status(200).json({

    success: true,

    message:
      "Analytics fetched successfully",

    data: {

      range,

      stats,

      blogStatus,

      topBlogs,

      performance,

    },

  });

} catch (error) {

  next(error);

}

}

// =================================
// AUTHOR STATISTICS
// =================================

async getAuthorStats(
authorId,
startDate
) {

const blogFilter = {

  author: authorId,

  isDeleted: false,

};


const blogs =
  await Blog.find(
    blogFilter
  )
    .select(
      "_id views status"
    )
    .lean();


const blogIds =
  blogs.map(
    (blog) =>
      blog._id
  );


if (!blogIds.length) {

  return {

    totalBlogs: 0,

    publishedBlogs: 0,

    totalViews: 0,

    totalLikes: 0,

    totalComments: 0,

    uniqueReaders: 0,

  };

}


const publishedBlogs =
  blogs.filter(
    (blog) =>
      blog.status ===
      "published"
  ).length;


const totalViews =
  blogs.reduce(
    (
      total,
      blog
    ) =>
      total +
      (blog.views || 0),

    0
  );


const dateFilter =
  startDate
    ? {
        createdAt: {
          $gte: startDate,
        },
      }
    : {};


const [
  totalLikes,
  totalComments,
  uniqueReadersResult,
] =
  await Promise.all([


    // =============================
    // TOTAL LIKES
    // =============================

    Like.countDocuments({

      blog: {
        $in: blogIds,
      },

      ...dateFilter,

    }),


    // =============================
    // TOTAL COMMENTS
    // =============================

    Comment.countDocuments({

      blog: {
        $in: blogIds,
      },

      ...dateFilter,

    }),


    // =============================
    // UNIQUE READERS
    // =============================

    ReadingHistory.aggregate([

      {
        $match: {

          blog: {
            $in: blogIds,
          },

          ...(startDate
            ? {
                viewedAt: {
                  $gte: startDate,
                },
              }
            : {}),

        },
      },

      {
        $group: {

          _id:
            "$user",

        },
      },

      {
        $count:
          "count",
      },

    ]),

  ]);


const uniqueReaders =
  uniqueReadersResult[0]
    ?.count || 0;


return {

  totalBlogs:
    blogs.length,

  publishedBlogs,

  totalViews,

  totalLikes,

  totalComments,

  uniqueReaders,

};
}

// =================================
// BLOG STATUS DISTRIBUTION
// =================================

async getBlogStatus(
authorId
) {

const results =
  await Blog.aggregate([

    {
      $match: {

        author: authorId,

        isDeleted: false,

      },
    },

    {
      $group: {

        _id:
          "$status",

        value: {
          $sum: 1,
        },

      },
    },

  ]);


const statusMap = {

  draft: 0,

  pending: 0,

  published: 0,

  rejected: 0,

  unpublished: 0,

};


results.forEach(
  (item) => {

    statusMap[
      item._id
    ] =
      item.value;

  }
);


return [

  {
    name:
      "Published",

    status:
      "published",

    value:
      statusMap.published,
  },

  {
    name:
      "Draft",

    status:
      "draft",

    value:
      statusMap.draft,
  },

  {
    name:
      "Pending",

    status:
      "pending",

    value:
      statusMap.pending,
  },

  {
    name:
      "Rejected",

    status:
      "rejected",

    value:
      statusMap.rejected,
  },

  {
    name:
      "Unpublished",

    status:
      "unpublished",

    value:
      statusMap.unpublished,
  },

];

}

// =================================
// TOP BLOGS
// =================================

async getTopBlogs(
authorId
) {

const blogs =
  await Blog.aggregate([

    {
      $match: {

        author: authorId,

        isDeleted: false,

      },
    },


    // =============================
    // LIKE COUNT
    // =============================

    {
      $lookup: {

        from:
          "likes",

        let: {
          blogId:
            "$_id",
        },

        pipeline: [

          {
            $match: {

              $expr: {

                $eq: [
                  "$blog",
                  "$$blogId",
                ],

              },

            },
          },

          {
            $count:
              "count",
          },

        ],

        as:
          "likeData",

      },
    },


    // =============================
    // COMMENT COUNT
    // =============================

    {
      $lookup: {

        from:
          "comments",

        let: {
          blogId:
            "$_id",
        },

        pipeline: [

          {
            $match: {

              $expr: {

                $eq: [
                  "$blog",
                  "$$blogId",
                ],

              },

            },
          },

          {
            $count:
              "count",
          },

        ],

        as:
          "commentData",

      },
    },


    // =============================
    // UNIQUE READERS
    // =============================

    {
      $lookup: {

        from:
          "readinghistories",

        let: {
          blogId:
            "$_id",
        },

        pipeline: [

          {
            $match: {

              $expr: {

                $eq: [
                  "$blog",
                  "$$blogId",
                ],

              },

            },
          },

          {
            $group: {

              _id:
                "$user",

            },
          },

          {
            $count:
              "count",
          },

        ],

        as:
          "readerData",

      },
    },


    // =============================
    // PROJECT
    // =============================

    {
      $project: {

        title: 1,

        slug: 1,

        status: 1,

        featuredImage: 1,

        views: 1,

        publishedAt: 1,


        likes: {

          $ifNull: [

            {
              $arrayElemAt: [
                "$likeData.count",
                0,
              ],
            },

            0,

          ],

        },


        comments: {

          $ifNull: [

            {
              $arrayElemAt: [
                "$commentData.count",
                0,
              ],
            },

            0,

          ],

        },


        readers: {

          $ifNull: [

            {
              $arrayElemAt: [
                "$readerData.count",
                0,
              ],
            },

            0,

          ],

        },

      },
    },


    // =============================
    // PERFORMANCE SCORE
    // =============================

    {
      $addFields: {

        score: {

          $add: [

            "$views",

            {
              $multiply: [
                "$likes",
                5,
              ],
            },

            {
              $multiply: [
                "$comments",
                3,
              ],
            },

          ],

        },

      },
    },


    {
      $sort: {

        score: -1,

        views: -1,

      },
    },


    {
      $limit: 5,
    },

  ]);


return blogs;

}

// =================================
// PERFORMANCE DATA
//
// LIKES
// COMMENTS
// UNIQUE READERS
// =================================

async getPerformanceData(
authorId,
startDate
) {
const blogs =
  await Blog.find({

    author: authorId,

    isDeleted: false,

  })
    .select(
      "_id"
    )
    .lean();


const blogIds =
  blogs.map(
    (blog) =>
      blog._id
  );


if (!blogIds.length) {

  return [];

}


const dateMatch =
  startDate
    ? {
        $gte: startDate,
      }
    : null;


const [
  likes,
  comments,
  readers,
] =
  await Promise.all([


    // =============================
    // LIKES BY DATE
    // =============================

    Like.aggregate([

      {
        $match: {

          blog: {
            $in: blogIds,
          },

          ...(dateMatch
            ? {
                createdAt:
                  dateMatch,
              }
            : {}),

        },
      },

      {
        $group: {

          _id: {

            $dateToString: {

              format:
                "%Y-%m-%d",

              date:
                "$createdAt",

            },

          },

          count: {
            $sum: 1,
          },

        },
      },

    ]),


    // =============================
    // COMMENTS BY DATE
    // =============================

    Comment.aggregate([

      {
        $match: {

          blog: {
            $in: blogIds,
          },

          ...(dateMatch
            ? {
                createdAt:
                  dateMatch,
              }
            : {}),

        },
      },

      {
        $group: {

          _id: {

            $dateToString: {

              format:
                "%Y-%m-%d",

              date:
                "$createdAt",

            },

          },

          count: {
            $sum: 1,
          },

        },
      },

    ]),


    // =============================
    // UNIQUE READERS BY DATE
    // =============================

    ReadingHistory.aggregate([

      {
        $match: {

          blog: {
            $in: blogIds,
          },

          ...(startDate
            ? {
                viewedAt: {
                  $gte:
                    startDate,
                },
              }
            : {}),

        },
      },

      {
        $group: {

          _id: {

            date: {

              $dateToString: {

                format:
                  "%Y-%m-%d",

                date:
                  "$viewedAt",

              },

            },

            user:
              "$user",

          },

        },
      },

      {
        $group: {

          _id:
            "$_id.date",

          count: {
            $sum: 1,
          },

        },
      },

    ]),

  ]);


const performanceMap =
  {};


const ensureDate =
  (date) => {

    if (
      !performanceMap[
        date
      ]
    ) {

      performanceMap[
        date
      ] = {

        date,

        likes: 0,

        comments: 0,

        readers: 0,

      };

    }

  };


// =============================
// LIKES
// =============================

likes.forEach(
  (item) => {

    ensureDate(
      item._id
    );

    performanceMap[
      item._id
    ].likes =
      item.count;

  }
);


// =============================
// COMMENTS
// =============================

comments.forEach(
  (item) => {

    ensureDate(
      item._id
    );

    performanceMap[
      item._id
    ].comments =
      item.count;

  }
);


// =============================
// READERS
// =============================

readers.forEach(
  (item) => {

    ensureDate(
      item._id
    );

    performanceMap[
      item._id
    ].readers =
      item.count;

  }
);


return Object
  .values(
    performanceMap
  )
  .sort(
    (a, b) =>
      new Date(
        a.date
      ) -
      new Date(
        b.date
      )
  );

}

}

module.exports =
new AnalyticsController();
