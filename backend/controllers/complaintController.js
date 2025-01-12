import studentModel from "../models/studentModel.js";
import complaintModel from "../models/complaintModel.js";

// Controller to post a complaint
export const postComplaint = async (req, res) => {
  try {
    // The userAuth middleware adds userId to req.body
    const { userId, typeOfComplaint, description } = req.body;

    // Fetch the student's details using the userId
    const student = await studentModel.findById(userId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (!typeOfComplaint || !description) {
      return res
        .status(404)
        .json({ success: false, message: "Missing details" });
    }

    // Create a new complaint using the fetched student details
    const newComplaint = new complaintModel({
      studentName: student.name,
      registrationNumber: student.registrationNumber,
      hostelName: student.hostelName,
      roomNumber: student.roomNumber,
      studentPhoneNumber: student.phoneNumber,
      studentEmail: student.email,
      typeOfComplaint,
      description,
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: savedComplaint,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Approving the complaint via student
export const approveComplaint = async (req, res) => {
  try {
    const { complaintId, studentApproval } = req.body; // Get the complaint ID and approval from the request body

    // Validate the input
    if (!complaintId || typeof studentApproval !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Complaint ID and student approval are required",
      });
    }

    // Find the complaint by ID
    const complaint = await complaintModel.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Ensure the complaint is already resolved before allowing approval
    if (complaint.complaintStatus !== "resolved") {
      return res.status(400).json({
        success: false,
        message: "Complaint is not resolved yet. Approval not allowed.",
      });
    }

    // Update the student approval field
    complaint.studentApproval = studentApproval;

    // Save the updated complaint
    const updatedComplaint = await complaint.save();

    res.status(200).json({
      success: true,
      message: "Student approval updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
