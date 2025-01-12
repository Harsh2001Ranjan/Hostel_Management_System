import express from "express";
import {
  getWardenData,
  loginWarden,
  logoutWarden,
  resetPassword,
  sendResetOTP,
} from "../controllers/wardenController.js";
import userAuth from "../middleware/authMiddleware.js";
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
router.get("/get-warden-data", userAuth, getWardenData);

export default router;
