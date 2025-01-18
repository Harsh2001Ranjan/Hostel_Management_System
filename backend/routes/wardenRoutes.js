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
const router = express.Router();

// Route for warden login
router.post("/login", loginWarden);

// Route for warden logout
router.post("/logout", logoutWarden);

// router for resting the otp
router.post("/send-reset-otp", userAuth, sendResetOTP);
// router for resetting the password
router.post("/reset-password", userAuth, resetPassword);
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
export default router;
