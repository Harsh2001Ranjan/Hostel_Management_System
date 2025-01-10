import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel.js";

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
