import jwt from "jsonwebtoken";
import wardenModel from "../models/wardenModel.js";
export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const authWarden = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Find the warden by ID
    const warden = await wardenModel.findById(userId);

    // Check if the warden exists
    if (!warden) {
      return res.status(404).json({
        success: false,
        message: "Warden not found or unauthorized",
      });
    }

    // Check if the user's role is "warden"
    if (warden.role !== "Warden") {
      return res.status(403).json({
        success: false,
        message: "Only warden allowed",
      });
    }

    // If valid, proceed to the next middleware
    next();
  } catch (error) {
    // Catch and handle any errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Middleware to verify chief warden
export const authChiefWarden = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Find the chief warden by ID
    const chiefWarden = await wardenModel.findById(userId);

    // Check if the chief warden exists
    if (!chiefWarden) {
      return res.status(404).json({
        success: false,
        message: "Chief Warden not found or unauthorized",
      });
    }

    // Check if the user's role is "chiefwarden"
    if (chiefWarden.role !== "ChiefWarden") {
      return res.status(403).json({
        success: false,
        message: "Only chief warden allowed",
      });
    }

    // If valid, proceed to the next middleware
    next();
  } catch (error) {
    // Catch and handle any errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export default userAuth;
