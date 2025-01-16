import leaveApplicationModel from "../models/leaveFormModel.js";
import studentModel from "../models/studentModel.js";
import transporter from "../config/nodemailer.js";
// Controller for request for Leave application
export const createLeaveApplication = async (req, res) => {
  try {
    const {
      userId,
      reasonOfLeave,
      leaveType,
      startDate,
      endDate,
      addressToGo,
    } = req.body;

    // Fetch student details from the Student model
    const student = await studentModel.findById(userId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check if there's already a pending leave application for this student
    const existingApplication = await leaveApplicationModel.findOne({
      student: userId,
      status: { $in: ["Pending", "Approved"] },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You already have a leave application that is either pending or approved. Please wait for its resolution before applying again.",
      });
    }

    // Calculate total days
    const totalDays =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;

    // Create the leave application
    const leaveApplication = await leaveApplicationModel.create({
      student: userId,
      reasonOfLeave,
      leaveType,
      startDate,
      endDate,
      totalDays,
      addressToGo,
    });

    res.status(201).json({ success: true, data: leaveApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Controller to Fetch All Leave Applications with Pending Status
export const getPendingLeaveApplications = async (req, res) => {
  try {
    // Fetch all leave applications with status "Pending"
    const pendingApplications = await leaveApplicationModel
      .find({ status: "Pending" })
      .populate("student");

    res.status(200).json({
      success: true,
      count: pendingApplications.length,
      data: pendingApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Controller to Fetch All Leave Applications with Approved Status
export const getApprovedLeaveApplications = async (req, res) => {
  try {
    // Fetch all leave applications with status "Approved"
    const approvedApplications = await leaveApplicationModel
      .find({ status: "Approved" })
      .populate("student");

    res.status(200).json({
      success: true,
      count: approvedApplications.length,
      data: approvedApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update the status of a leave application
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }
    if (status === "Rejected") {
      const leaveApplication = await leaveApplicationModel
        .findById(id)
        .populate("student", "email");
      const email = leaveApplication.student?.email;
      const mailoptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Leave Application Status",
        text: "Your leave application has been rejected.",
      };
      await transporter.sendMail(mailoptions);
      await leaveApplicationModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Leave application deleted successfully",
      });
    }
    if (status === "Approved") {
      const leaveApplication = await leaveApplicationModel
        .findById(id)
        .populate("student", "email parentEmail");
      const startDate = leaveApplication.startDate;
      const endDate = leaveApplication.endDate;
      const parentEmail = leaveApplication.student?.parentEmail;
      const email = leaveApplication.student?.email;
      const mailoptions = {
        from: process.env.SENDER_EMAIL,
        to: `${parentEmail},${email}`,
        subject: "Leave Application Status",
        text: `Leave application has been accepted. Leaving on date ${startDate} and returning on date ${endDate}.`,
      };
      await transporter.sendMail(mailoptions);
      res.status(200).json({
        success: true,
        message: "Leave application updated succesfully",
      });
    }
    const leaveApplication = await leaveApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leaveApplication) {
      return res
        .status(404)
        .json({ success: false, message: "Leave application not found" });
    }

    res.status(200).json({ success: true, data: leaveApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // Delete a leave application
// export const deleteLeaveApplication = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const leaveApplication = await leaveApplicationModel.findByIdAndDelete(id);
//     if (!leaveApplication) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Leave application not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Leave application deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Mark return details
export const markReturnDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leaveApplication = await leaveApplicationModel
      .findById(id)
      .populate("student", "parentEmail");

    if (!leaveApplication) {
      return res
        .status(404)
        .json({ success: false, message: "Leave application not found" });
    }
    // Sending Mail to parents
    const parentEmail = leaveApplication.student?.parentEmail;
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: parentEmail,
      subject: "Leave Application Return Details",
      text: "Your ward has returned to the hostel.",
    };

    await transporter.sendMail(mailoptions);
    await leaveApplicationModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Leave application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
