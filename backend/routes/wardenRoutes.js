import express from "express";
import {
  getWardenData,
  loginWarden,
  logoutWarden,
  resetPassword,
  sendResetOTP,
} from "../controllers/wardenController.js";
import userAuth, { authWarden } from "../middleware/authMiddleware.js";
import {
  getApprovedLeaveApplications,
  getPendingLeaveApplications,
  markReturnDetails,
  updateLeaveStatus,
} from "../controllers/leaveApplicationController.js";
import {
  escalateComplaint,
  getComplaintsForWarden,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import {
  getCurrentMonthFeedback,
  getPreviousMonthAnalytics,
} from "../controllers/feedbackController.js";
import {
  createPoll,
  deletePoll,
  getPollResults,
  getWardenPolls,
} from "../controllers/pollController.js";
import { addMenu, getMenu, updateMenu } from "../controllers/menuController.js";
import { getFoodWastageStats } from "../controllers/foodWastageController.js";
import {
  createNotice,
  downloadNoticePDF,
  getChiefWardenNotices,
  getWardenNotices,
} from "../controllers/noticeController.js";
const router = express.Router();

// Route for warden login
router.post("/login", loginWarden);

// Route for warden logout
router.post("/logout", logoutWarden);

// router for resting the otp
router.post("/send-reset-otp", sendResetOTP);
// router for resetting the password
router.post("/reset-password", resetPassword);
// router for getting warden data
router.get("/get-warden-data", userAuth, authWarden, getWardenData);
// router for getting PendingLeaveApplications
router.get(
  "/get-pending-leave-applications",
  userAuth,
  authWarden,
  getPendingLeaveApplications
);
// router for  getting ApprovedLeaveApplications
router.get(
  "/get-approved-leave-applications",
  userAuth,
  authWarden,
  getApprovedLeaveApplications
);
// router for posting updateLeaveStatus
//router.put("/update-leaveStatus", userAuth, authWarden, updateLeaveStatus);
router.put(
  "/update-leaveStatus/:id/status",
  userAuth,
  authWarden,
  updateLeaveStatus
);

// router for posting markReturnDetails
router.post(
  "/mark-return-details/:id",
  userAuth,
  authWarden,
  markReturnDetails
);
// Route to get complaints assigned to a specific warden
router.get("/complaints", userAuth, authWarden, getComplaintsForWarden);
// Route to update the status of a complaint
router.patch(
  "/complaints/:complaintId/status",
  userAuth,
  authWarden,
  updateComplaintStatus
);
// Route to escalate a complaint
router.patch(
  "/complaints/:complaintId/escalate",
  userAuth,
  authWarden,
  escalateComplaint
);
// Route to fetch current month feedback for a warden's hostel
router.get("/feedback", userAuth, authWarden, getCurrentMonthFeedback);
// Route to fetch previous month analytics for warden
router.get(
  "/feedback-analytics",
  userAuth,
  authWarden,
  getPreviousMonthAnalytics
);
// Route to create a poll (warden)
router.post("/create-poll", userAuth, authWarden, createPoll);
// Route to delete a poll (warden)
router.delete("/delete-poll/:pollId", userAuth, authWarden, deletePoll);
// Route to get all polls created by the warden
router.get("/get-polls", userAuth, authWarden, getWardenPolls);
// Route to get poll results (warden)
router.get("/results/:pollId", userAuth, authWarden, getPollResults);
// router for adding a menu
router.post("/addMenu", userAuth, authWarden, addMenu);
// Update Menu Route
router.put("/updateMenu", userAuth, authWarden, updateMenu);
// router for viewing today's menu
router.get("/viewMenu", userAuth, authWarden, getMenu);
// Route for warden to view food wastage statistics
router.get("/food-wastage-stats", userAuth, authWarden, getFoodWastageStats);
// Route to create a new notice
router.post("/create-notice", userAuth, authWarden, createNotice);

// Route to download a notice as a PDF
router.get("/download-notice/:id", userAuth, authWarden, downloadNoticePDF);
// Route to get notices created by ChiefWarden
router.get("/chiefwarden-notice", userAuth, authWarden, getChiefWardenNotices);
// Route to get notices created by Warden
router.get("/warden-notice", userAuth, authWarden, getWardenNotices);
export default router;
