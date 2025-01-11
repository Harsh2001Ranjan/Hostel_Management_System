//import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import wardenModel from "../models/wardenModel.js";

// Controller function to log in a warden
export const loginWarden = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password } = req.body;

    // Validate input fields
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    // Check if the warden exists in the database
    const warden = await wardenModel.findOne({ email });
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // Verify the password
    // const isPasswordValid = await bcrypt.compare(password, warden.password);
    const isPasswordValid = password === warden.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: warden._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      warden: {
        id: warden._id,
        name: warden.name,
        email: warden.email,
        employeeId: warden.employeeId,
      },
      success: true,
    });
  } catch (error) {
    //console.error(error);
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Controller function to log out a warden
export const logoutWarden = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
