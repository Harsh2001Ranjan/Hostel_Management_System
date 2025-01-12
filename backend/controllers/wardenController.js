import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import wardenModel from "../models/wardenModel.js";
import transporter from "../config/nodemailer.js";

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
// Send password reset OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const warden = await wardenModel.findOne({ email });
    if (!warden) {
      return res.json({ success: false, message: "warden not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    warden.resetOtp = otp;
    warden.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await warden.save();
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: warden.email,
      subject: "Password reset OTP",
      text: `Your OTP is ${otp} to reset your password`,
    };
    await transporter.sendMail(mailoptions);
    res.json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
//Reset user password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const warden = await wardenModel.findOne({ email });
    if (!warden) {
      return res.json({ success: false, message: "warden not found" });
    }
    if (warden.resetOtp === "" || warden.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (warden.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    warden.password = hashedPassword;
    warden.resetOtp = "";
    warden.resetOtpExpireAt = 0;
    await warden.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
