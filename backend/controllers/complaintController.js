import studentModel from "../models/studentModel.js";
import complaintModel from "../models/complaintModel.js";
import transporter from "../config/nodemailer.js";
import wardenModel from "../models/wardenModel.js";

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
//to fetch all complaints of the student
export const viewStudentComplaints = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming `userId` is passed in the request body.

    // Fetch the student based on userId
    const student = await studentModel.findById(userId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Fetch complaints for the student using their registration number
    const complaints = await complaintModel.find({
      registrationNumber: student.registrationNumber,
      studentApproval: null,
    });

    if (complaints.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No complaints found for this student.",
        complaints: [],
      });
    }

    // Return the complaints
    return res.status(200).json({
      success: true,
      message: "Complaints fetched successfully.",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching complaints.",
      error: error.message,
    });
  }
};
// Approving the complaint via student
export const approveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { studentApproval, feedback } = req.body; // Get approval, and optional feedback

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

    if (studentApproval) {
      // If the student provides feedback along with approval, validate and save it
      if (feedback) {
        const { rating, comments } = feedback;

        if (!rating || rating < 1 || rating > 5) {
          return res.status(400).json({
            success: false,
            message: "Rating is required and must be between 1 and 5.",
          });
        }

        complaint.feedback = {
          rating,
          comments,
          feedbackTime: new Date(),
        };
      } else {
        // If no feedback is provided, prompt for it
        return res.status(200).json({
          success: true,
          message: "Student approval updated. Please provide feedback.",
          complaint,
        });
      }
    } else {
      // If approval is not given, clear any existing feedback
      complaint.feedback = null;
    }

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

// Controller to get all complaints with status "sent" and "processing" for the warden's hostel
export const getComplaintsForWarden = async (req, res) => {
  try {
    // Fetch the logged-in warden's details using req.body.userId
    const warden = await wardenModel.findById(req.body.userId);

    // Fetch complaints with "sent" or "processing" status for the given hostel
    const complaints = await complaintModel.find({
      hostelName: warden.hostelName,
      complaintStatus: { $in: ["sent", "processing"] },
    });

    // If no complaints are found
    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaints found for the specified criteria",
      });
    }

    // Return the complaints
    res.status(200).json({
      success: true,
      message: "Complaints retrieved successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving complaints",
      error: error.message,
    });
  }
};
// Controller to update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params; // Get complaint ID from URL parameters
    const { complaintStatus, wardenIgnoreReason } = req.body; // Other data from the request body

    // Validate the input
    if (!complaintStatus) {
      return res.status(400).json({
        success: false,
        message: "Complaint status is required",
      });
    }

    // Ensure the status is valid
    const validStatuses = ["sent", "processing", "resolved", "ignored"];
    if (!validStatuses.includes(complaintStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint status",
      });
    }

    // If the status is "ignored," ensure the reason is provided
    if (complaintStatus === "ignored" && !wardenIgnoreReason) {
      return res.status(400).json({
        success: false,
        message: "Reason for ignoring the complaint is required",
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

    // Update the complaint status
    complaint.complaintStatus = complaintStatus;

    // If the status is "ignored," set the ignore reason
    if (complaintStatus === "ignored") {
      complaint.wardenIgnoreReason = wardenIgnoreReason;
    } else {
      // Clear the ignore reason if the status is not "ignored"
      complaint.wardenIgnoreReason = null;
    }

    // Save the updated complaint
    const updatedComplaint = await complaint.save();

    if (["resolved", "ignored"].includes(complaintStatus)) {
      const subject =
        complaintStatus === "resolved"
          ? "Your complaint has been resolved"
          : "Your complaint has been ignored";
      const text =
        complaintStatus === "resolved"
          ? "Dear Student, your complaint has been successfully resolved. If you have any feedback, please let us know."
          : `Dear Student, your complaint has been ignored. Reason: ${wardenIgnoreReason}. For further assistance, contact your warden.`;

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: complaint.studentEmail,
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the complaint status",
      error: error.message,
    });
  }
};

export const escalateComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { escalateReason } = req.body;
    const { userId } = req.body; // Get userId from authentication middleware

    if (!escalateReason) {
      return res.status(400).json({
        success: false,
        message: "Complaint ID and escalate reason are required.",
      });
    }

    // Fetch the user details based on userId
    let escalatedBy = null;

    // Check if the user is a student
    const student = await studentModel.findById(userId);
    if (student) {
      escalatedBy = "student";
    }

    // Check if the user is a warden
    const warden = await wardenModel.findById(userId);
    if (warden) {
      escalatedBy = "warden";
    }

    if (!escalatedBy) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized user. User must be a student or a warden.",
      });
    }

    // Find the complaint
    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }
    // Check if the complaint has already been escalated
    if (complaint.escalation?.escalatedBy) {
      return res.status(400).json({
        success: false,
        message: "This complaint has already been escalated.",
      });
    }

    // Student escalation conditions
    //let canEscalate = false; // Flag to track escalation permission
    if (escalatedBy === "student") {
      if (
        complaint.complaintStatus === "ignored" ||
        (complaint.complaintStatus === "resolved" &&
          complaint.studentApproval === false)
      ) {
        // canEscalate = true; // Mark escalation as allowed
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Students can only escalate ignored or unresolved complaints.",
        });
      }
    }

    // Warden escalation logic (no restrictions)
    if (escalatedBy === "warden") {
      // canEscalate = true; // Mark escalation as allowed
    }

    // Update the complaint details
    complaint.complaintStatus = "sent"; // Reset status to sent
    complaint.escalation = {
      escalatedBy,
      escalateReason,
      escalationTime: new Date(),
    };

    // Save the updated complaint
    const updatedComplaint = await complaint.save();

    const chiefWarden = await wardenModel.findOne({ role: "ChiefWarden" });
    const chiefEmail = chiefWarden.email;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: chiefEmail,
      subject: "Complaint Escalation Notification",
      text: `Dear Chief Warden,\n\nA complaint has been escalated.\n\nDetails:\n- Complaint ID: ${complaintId}\n- Escalated By: ${escalatedBy}\n- Escalation Reason: ${complaint.escalation.escalateReason}\n\nPlease review and address the complaint.\n\nRegards,\nHostel Management System`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Complaint escalated successfully.",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while escalating the complaint.",
      error: error.message,
    });
  }
};
//to fetch unresolved escalated complaint for chiefwarden
export const getUnresolvedEscalatedComplaints = async (req, res) => {
  try {
    // Fetch complaints with non-resolved status and valid escalation
    const unresolvedEscalatedComplaints = await complaintModel.find({
      "escalation.escalatedBy": { $exists: true },
      complaintStatus: { $ne: "resolved" },
    });

    // If no unresolved escalated complaints are found
    if (unresolvedEscalatedComplaints.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No unresolved escalated complaints found.",
        complaints: [],
      });
    }

    // Return the unresolved escalated complaints
    res.status(200).json({
      success: true,
      message: "Unresolved escalated complaints fetched successfully.",
      complaints: unresolvedEscalatedComplaints,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching unresolved escalated complaints.",
      error: error.message,
    });
  }
};
