import express from "express";
import { loginWarden, logoutWarden } from "../controllers/wardenController.js";

const router = express.Router();

// Route for warden login
router.post("/login", loginWarden);

// Route for student logout
router.post("/logout", logoutWarden);

export default router;
