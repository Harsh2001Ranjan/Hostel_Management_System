import express from "express";
import userAuth, { authChiefWarden } from "../middleware/authMiddleware.js";
import { addWarden, getMetrics } from "../controllers/wardenController.js";
import {
  getUnresolvedEscalatedComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { getPreviousMonthAnalytics } from "../controllers/feedbackController.js";
import {
  createNotice,
  downloadNoticePDF,
  getChiefWardenNotices,
} from "../controllers/noticeController.js";

const router = express.Router();
// Route to add a new warden (accessible only by Chief Warden)
router.post("/add-warden", userAuth, authChiefWarden, addWarden);

// Route to get all unresolved escalated complaints
router.get(
  "/complaints/escalated/unresolved",
  userAuth,
  authChiefWarden,
  getUnresolvedEscalatedComplaints
);
// Route to update the status of a complaint
router.patch(
  "/complaints/escalated/:complaintId/status",
  userAuth,
  authChiefWarden,
  updateComplaintStatus
);
// Route to fetch previous month analytics for chief warden
router.post(
  "/feedback-analytics",
  userAuth,
  authChiefWarden,
  getPreviousMonthAnalytics
);
// Route to create a new notice
router.post("/create-notice", userAuth, authChiefWarden, createNotice);

// Route to download a notice as a PDF
router.get(
  "/download-notice/:id",
  userAuth,
  authChiefWarden,
  downloadNoticePDF
);
// Route to get notices created by ChiefWarden
router.get(
  "/chiefwarden-notice",
  userAuth,
  authChiefWarden,
  getChiefWardenNotices
);
// Route to get students count
router.get(
  "/students-count-Chiefwarden",
  userAuth,
  authChiefWarden,
  getMetrics
);
export default router;
