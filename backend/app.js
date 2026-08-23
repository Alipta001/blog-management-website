require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const ConnectDB = require("./app/config/db");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const Limit = require("./app/utils/limite");
const morgan = require("morgan");

ConnectDB();
const app = express();
// Add this line in server.js / app.js
app.set('trust proxy', 1);

app.use(
  cors({
    origin: [
      "https://blog-management-website-three.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(Limit);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// templates and static files
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

//Routes
const authRoutes = require("./app/routes/auth.route");
app.use("/auth", authRoutes);
const blogRoutes = require("./app/routes/blog.route");
app.use("/blog", blogRoutes);
const categoryRoute = require("./app/routes/category.route");
app.use("/category", categoryRoute);
const commentRoute = require("./app/routes/comment.route");
app.use("/comment", commentRoute);
const likeRoute = require("./app/routes/like.route");
app.use("/like", likeRoute);
const notificationRoute = require("./app/routes/notification.route");
app.use("/notification", notificationRoute);
const readingHistoryRoute = require("./app/routes/readingHistory.route");
app.use("/readingHistory", readingHistoryRoute);
const tagRoute = require("./app/routes/tag.route");
app.use("/tag", tagRoute);
const userRoute = require("./app/routes/user.route");
app.use("/user", userRoute);
const analyticsRoutes = require("./app/routes/analytics.route");
app.use("/analytics", analyticsRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog Management API is running",
  });
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // Passes the 404 error to the global handler below
});

// 🚨 2. GLOBAL ERROR HANDLER (Must have 4 arguments!)
app.use((err, req, res, next) => {
  // Always log the error internally for debugging
  console.error("❌ App Error:", err.stack || err.message);

  // Set standard status code default to 500 if not specified
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show detailed error trace while working on localhost
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server is running on port ", `http://localhost:${PORT}`);
  }
});
