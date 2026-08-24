const router =
  require("express").Router();


const authController =
  require("../controllers/auth.controller");


const authMiddleware =
  require("../middleware/auth.middleware");


 
// PUBLIC ROUTES
 


// ---------------------------------
// FORGOT PASSWORD
// ---------------------------------

router.post(

  "/forgot-password",

  authController.resetPasswordLink

);


// ---------------------------------
// RESET PASSWORD
// ---------------------------------

router.post(

  "/reset-password",

  authController.resetPassword

);


// ---------------------------------
// SEND REGISTRATION OTP
// ---------------------------------

router.post(

  "/send-registration-otp",

  authController.sendRegistrationOtp

);


// ---------------------------------
// RESEND REGISTRATION OTP
// ---------------------------------

router.post(

  "/resend-registration-otp",

  authController.resendRegistrationOtp

);


// ---------------------------------
// VERIFY REGISTRATION OTP
// ---------------------------------

router.post(

  "/verify-registration-otp",

  authController.verifyRegistrationOtp

);


// ---------------------------------
// LOGIN
// ---------------------------------

router.post(

  "/login",

  authController.login

);


// ---------------------------------
// REFRESH ACCESS TOKEN
// ---------------------------------

router.post(

  "/refresh-token",

  authController.refreshToken

);


 
// PROTECTED ROUTES
 


// ---------------------------------
// GET CURRENT USER
// ---------------------------------

router.get(

  "/me",

  authMiddleware,

  authController.getCurrentUser

);


// ---------------------------------
// LOGOUT
// ---------------------------------

router.post(

  "/logout",

  authMiddleware,

  authController.logout

);


// ---------------------------------
// CHANGE PASSWORD
// ---------------------------------

router.patch(

  "/change-password",

  authMiddleware,

  authController.changePassword

);


module.exports =
  router;