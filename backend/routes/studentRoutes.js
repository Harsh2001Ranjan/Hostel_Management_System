import express from "express";
import {
  registerStudent,
  loginStudent,
  logoutStudent,
  sendVerifyOtpToStudent,
  verifyStudentAccount,
  isAuthenticated,
  sendResetOTP,
  resetPassword,
  getStudentData,
} from "../controllers/studentController.js";
import userAuth from "../middleware/authMiddleware.js";
import {
  approveComplaint,
  postComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// Route for student registration
router.post("/register", registerStudent);

// Route for student login
router.post("/login", loginStudent);

// Route for student logout
router.post("/logout", logoutStudent);
// Send OTP to mail to verify the mail
router.post("/send-verify-otp", userAuth, sendVerifyOtpToStudent);
// verify account using otp
router.post("/verify-account", userAuth, verifyStudentAccount);
// authentication router
router.post("/is-auth", userAuth, isAuthenticated);
// router for resting the otp
router.post("/send-reset-otp", sendResetOTP);
// router for resetting the password
router.post("/reset-password", resetPassword);
// router for getting student data
router.get("/get-student-data", userAuth, getStudentData);
//router for posing complaint
router.post("/complaints", userAuth, postComplaint);
//router for student approval of resolved complaint
router.post("/complaint/approve", userAuth, approveComplaint);

export default router;
