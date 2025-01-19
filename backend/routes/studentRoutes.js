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
  escalateComplaint,
  postComplaint,
  viewStudentComplaints,
} from "../controllers/complaintController.js";
import { createLeaveApplication } from "../controllers/leaveApplicationController.js";
import { getMenu } from "../controllers/menuController.js";
import { markMealNotSkipped } from "../controllers/foodWastageController.js";

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
//router for posting complaint
router.post("/complaint", userAuth, postComplaint);
// Route to view all complaints for a student
router.get("/complaints", userAuth, viewStudentComplaints);
// Route to approve a complaint
router.patch("/complaints/:complaintId/approve", userAuth, approveComplaint);
// Route to escalate a complaint
router.patch("/complaints/:complaintId/escalate", userAuth, escalateComplaint);
//router for leave application
router.post("/create-leave-application", userAuth, createLeaveApplication);
// router for viewing today's menu
router.get("/viewMenu", userAuth, getMenu);
// Route for students to mark meals they won't skip
router.post("/mark-meal-not-skipped", userAuth, markMealNotSkipped);
export default router;
