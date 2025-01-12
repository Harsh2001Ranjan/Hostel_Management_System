import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";
import transporter from "../config/nodemailer.js";

// Controller function to register a student
export const registerStudent = async (req, res) => {
  try {
    // Destructuring the request body
    const {
      name,
      registrationNumber,
      hostelName,
      roomNumber,
      phoneNumber,
      parentsPhoneNumber,
      address,
      password,
      repeatPassword,
      email,
      currentYear,
    } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!registrationNumber)
      return res
        .status(400)
        .json({ message: "Registration number is required" });
    if (!hostelName)
      return res.status(400).json({ message: "Hostel name is required" });
    if (!roomNumber)
      return res.status(400).json({ message: "Room number is required" });
    if (!phoneNumber)
      return res.status(400).json({ message: "Phone number is required" });
    if (!parentsPhoneNumber)
      return res
        .status(400)
        .json({ message: "Parent's phone number is required" });
    if (!address || !address.state || !address.district)
      return res
        .status(400)
        .json({ message: "Address with state and district is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
    if (!repeatPassword)
      return res.status(400).json({ message: "Repeat password is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!currentYear)
      return res.status(400).json({ message: "Current year is required" });

    // Validate password and repeatPassword match
    if (password !== repeatPassword) {
      return res
        .status(400)
        .json({ message: "Password and repeat password do not match" });
    }
    // Check if student with the same registration number or email already exists
    const existingStudent = await studentModel.findOne({
      $or: [{ registrationNumber }, { email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message:
          "Student with this registration number or email already exists",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student document
    const newStudent = new studentModel({
      name,
      registrationNumber,
      hostelName,
      roomNumber,
      phoneNumber,
      parentsPhoneNumber,
      address,
      password: hashedPassword,
      email,
      currentYear,
    });

    // Save the new student to the database
    await newStudent.save();

    // Send success response
    // res.status(201).json({
    //   message: "Student registered successfully",
    //   student: newStudent,
    // });
    const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //sending welcome email
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "welcome to HMS",
      text: `welcome to HMS website. Your account has been created with email id: ${email}`,
    };

    await transporter.sendMail(mailoptions);

    return res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
      success: true,
    });
  } catch (error) {
    // console.error(error);
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Controller function to log in a student
export const loginStudent = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password } = req.body;

    // Validate input fields
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    // Check if the student exists in the database
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
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
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
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
// Controller function to log out a student
export const logoutStudent = (req, res) => {
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
// Send Varification OTP to the student's Email
export const sendVerifyOtpToStudent = async (req, res) => {
  try {
    const { userId } = req.body;
    const student = await studentModel.findById(userId);
    if (student.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    student.verifyOtp = otp;
    student.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    await student.save();
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: student.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp} to verify your account`,
    };
    await transporter.sendMail(mailoptions);
    res.json({
      success: true,
      message: "Verification OTP sent to your email.",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Verification of OTP controller
export const verifyStudentAccount = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Detials" });
  }
  try {
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }
    if (student.verifyOtp === "" || student.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (student.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }
    student.isAccountVerified = true;
    student.verifyOtp = "";
    student.verifyOtpExpireAt = 0;
    await student.save();
    res.json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// // check for authentication if already logged in or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Send password reset OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    student.resetOtp = otp;
    student.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await student.save();
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: student.email,
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
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }
    if (student.resetOtp === "" || student.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (student.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    student.resetOtp = "";
    student.resetOtpExpireAt = 0;
    await student.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// creating getStudentData function to get the data of the student
export const getStudentData = async (req, res) => {
  try {
    const { userId } = req.body;
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }
    res.json({
      success: true,
      studentData: {
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
        hostel: student.hostelName,
        room: student.roomNumber,
        year: student.currentYear,
        phoneNumber: student.phoneNumber,
        parentsPhoneNumber: student.parentsPhoneNumber,
        address: student.address,
        isAccountVerified: student.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
