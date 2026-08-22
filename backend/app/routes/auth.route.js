// const router = require("express").Router();

// const authController =
//   require("../controllers/auth.controller");

// const authMiddleware =
//   require("../middleware/auth.middleware");


// // REGISTER
// router.post(
//   "/register",
//   authController.register
// );


// // LOGIN
// router.post(
//   "/login",
//   authController.login
// );


// // LOGOUT
// router.post(
//   "/logout",
//   authMiddleware,
//   authController.logout
// );



// // CHANGE PASSWORD
// router.patch(
//   "/change-password",
//   authMiddleware,
//   authController.changePassword
// );


// module.exports = router;



const router =
  require("express").Router();


const authController =
  require("../controllers/auth.controller");


const authMiddleware =
  require("../middleware/auth.middleware");


// =================================
// PUBLIC ROUTES
// =================================

router.post(
  "/register",
  authController.register
);


router.post(
  "/login",
  authController.login
);


router.post(
  "/refresh-token",
  authController.refreshToken
);


// =================================
// PROTECTED ROUTES
// =================================

router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);


router.patch(
  "/change-password",
  authMiddleware,
  authController.changePassword
);


module.exports =
  router;