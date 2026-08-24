const ReadingHistory =
  require("../models/readingHistory");

const Blog =
  require("../models/blog");


class ReadingHistoryController {

   
  // ADD / UPDATE READING HISTORY
   

  async addReadingHistory(req, res, next) {
    try {
      const { blogId } = req.params;


      // Check whether the blog exists
      // and is publicly available
      const blog =
        await Blog.findOne({
          _id: blogId,
          status: "published",
          isDeleted: false,
        });


      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }


      // Generate timestamp on backend
      const viewedAt =
        new Date();


      // If the  user already read this blog,
      // update the existing history record.
      // Otherwise create a new one.
      const history =
        await ReadingHistory.findOneAndUpdate(
          {
             user: req. user.id,
            blog: blogId,
          },

          {
            $set: {
              viewedAt,
            },
          },

          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        );


      return res.status(200).json({
        success: true,

        message:
          "Reading history updated successfully",

        data: history,
      });

    } catch (error) {
      next(error);
    }
  }



   
  // GET MY READING HISTORY
   

  async getMyReadingHistory(
    req,
    res,
    next
  ) {
    try {
      let {
        page = 1,
        limit = 10,
      } = req.query;


      page =
        Math.max(
          1,
          Number(page) || 1
        );


      limit =
        Math.min(
          Math.max(
            1,
            Number(limit) || 10
          ),
          100
        );


      const skip =
        (page - 1) *
        limit;


      const filter = {
         user: req. user.id,
      };


      const [history, total] =
        await Promise.all([

          ReadingHistory.find(filter)

            .populate({
              path: "blog",

              select:
                "title description slug category tags author publishedAt views",

              populate: {
                path: "author",

                select:
                  "name profileImage",
              },
            })

            .sort({
              viewedAt: -1,
            })

            .skip(skip)

            .limit(limit),

          ReadingHistory.countDocuments(
            filter
          ),

        ]);


      /*
        A blog might have been deleted or
        unpublished after being added to
        reading history.

        Remove those invalid/null blog
        references from the response.
      */

      const validHistory =
        history.filter(
          (item) => item.blog
        );


      return res.status(200).json({
        success: true,

        data: {
          history:
            validHistory,

          pagination: {
            total,

            page,

            limit,

            totalPages:
              Math.ceil(
                total / limit
              ),
          },
        },
      });

    } catch (error) {
      next(error);
    }
  }



   
  // CLEAR MY READING HISTORY
   

  async clearReadingHistory(
    req,
    res,
    next
  ) {
    try {

      const result =
        await ReadingHistory.deleteMany({
           user: req. user.id,
        });


      return res.status(200).json({
        success: true,

        message:
          "Reading history cleared successfully",

        data: {
          deletedCount:
            result.deletedCount,
        },
      });

    } catch (error) {
      next(error);
    }
  }

}


module.exports =
  new ReadingHistoryController();