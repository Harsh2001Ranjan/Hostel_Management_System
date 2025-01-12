import express from "express";
import {
  loginWarden,
  logoutWarden,
  resetPassword,
  sendResetOTP,
} from "../controllers/wardenController.js";

const router = express.Router();

// Route for warden login
router.post("/login", loginWarden);

// Route for warden logout
router.post("/logout", logoutWarden);

// router for resting the otp
router.post("/send-reset-otp", sendResetOTP);
// router for resetting the password
router.post("/reset-password", resetPassword);

export default router;
