import express from "express";
import userAuth, { authChiefWarden } from "../middleware/authMiddleware.js";
import { addWarden } from "../controllers/wardenController.js";
import {
  getUnresolvedEscalatedComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

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

export default router;
