const Notification =
  require("../models/notification");


class NotificationController {

  // =================================
  // GET MY NOTIFICATIONS
  // =================================

  async getMyNotifications(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        isRead,
      } = req.query;


      const filter = {
        recipient: req. user.id,
      };


      // Filter by read/unread status
      if (isRead !== undefined) {
        filter.isRead =
          isRead === "true";
      }


      const skip =
        (Number(page) - 1) *
        Number(limit);


      const [
        notifications,
        total,
        unreadCount,
      ] =
        await Promise.all([

          Notification.find(filter)
            .populate(
              "sender",
              "name profileImage"
            )
            .populate(
              "blog",
              "title slug"
            )
            .populate(
              "comment",
              "content"
            )
            .sort({
              createdAt: -1,
            })
            .skip(skip)
            .limit(Number(limit)),


          Notification.countDocuments(
            filter
          ),


          // Total unread notifications
          Notification.countDocuments({
            recipient: req. user.id,
            isRead: false,
          }),

        ]);


      return res.status(200).json({
        success: true,

        data: {
          notifications,

          unreadCount,

          pagination: {
            total,

            page:
              Number(page),

            limit:
              Number(limit),

            totalPages:
              Math.ceil(
                total /
                Number(limit)
              ),
          },
        },
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // MARK ONE NOTIFICATION AS READ
  // =================================

  async markAsRead(req, res, next) {
    try {

      const readAt =
        new Date();


      const notification =
        await Notification.findOneAndUpdate(
          {
            _id: req.params.id,

            recipient:
              req. user.id,
          },

          {
            isRead: true,

            readAt,
          },

          {
            new: true,

            runValidators: true,
          }
        )
          .populate(
            "sender",
            "name profileImage"
          )
          .populate(
            "blog",
            "title slug"
          )
          .populate(
            "comment",
            "content"
          );


      if (!notification) {
        return res.status(404).json({
          success: false,

          message:
            "Notification not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "Notification marked as read",

        data: notification,
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // MARK ALL NOTIFICATIONS AS READ
  // =================================

  async markAllAsRead(req, res, next) {
    try {

      // Generate one timestamp on backend
      const readAt =
        new Date();


      const result =
        await Notification.updateMany(
          {
            recipient:
              req. user.id,

            isRead: false,
          },

          {
            $set: {
              isRead: true,

              readAt,
            },
          }
        );


      return res.status(200).json({
        success: true,

        message:
          "All notifications marked as read",

        data: {

          // Actual timestamp generated
          // by backend
          readAt,

          modifiedCount:
            result.modifiedCount,

        },
      });

    } catch (error) {
      next(error);
    }
  }



  // =================================
  // DELETE NOTIFICATION
  // =================================

  async deleteNotification(
    req,
    res,
    next
  ) {
    try {

      const notification =
        await Notification.findOneAndDelete({
          _id:
            req.params.id,

          recipient:
            req. user.id,
        });


      if (!notification) {
        return res.status(404).json({
          success: false,

          message:
            "Notification not found",
        });
      }


      return res.status(200).json({
        success: true,

        message:
          "Notification deleted successfully",

        data: {
          id:
            notification._id,
        },
      });

    } catch (error) {
      next(error);
    }
  }

}


module.exports =
  new NotificationController();