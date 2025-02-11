import leaveApplicationModel from "../models/leaveFormModel.js";
import studentModel from "../models/studentModel.js";
import transporter from "../config/nodemailer.js";
import wardenModel from "../models/wardenModel.js";
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

    res.status(201).json({
      success: true,
      message: "Your Leave form submitted successfully",
      data: leaveApplication,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Controller to Fetch All Leave Applications with Pending Status
export const getPendingLeaveApplications = async (req, res) => {
  try {
    // Fetch the logged-in warden's details using req.body.userId
    const warden = await wardenModel.findById(req.body.userId);
    // Fetch all leave applications with status "Pending"
    // const pendingApplications = await leaveApplicationModel
    //   .find({ status: "Pending" })
    //   .populate("student");
    // Fetch all leave applications with status "Pending" for the warden's hostel
    const pendingApplications = await leaveApplicationModel
      .find({ status: "Pending" })
      .populate({
        path: "student",
        match: { hostelName: warden.hostelName }, // Filter students by hostelName
      })
      .exec();

    // Filter out applications where the student does not match the hostelName
    const filteredApplications = pendingApplications.filter(
      (application) => application.student
    );

    res.status(200).json({
      success: true,
      count: filteredApplications.length,
      data: filteredApplications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Controller to Fetch All Leave Applications with Approved Status
export const getApprovedLeaveApplications = async (req, res) => {
  try {
    // Fetch the logged-in warden's details using req.body.userId
    const warden = await wardenModel.findById(req.body.userId);
    // Fetch all leave applications with status "Approved"
    // const approvedApplications = await leaveApplicationModel
    //   .find({ status: "Approved" })
    //   .populate("student");
    const approvedApplications = await leaveApplicationModel
      .find({ status: "Approved" })
      .populate({
        path: "student",
        match: { hostelName: warden.hostelName }, // Filter students by hostelName
      })
      .exec();

    // Filter out applications where the student does not match the hostelName
    const filteredApplications = approvedApplications.filter(
      (application) => application.student
    );

    res.status(200).json({
      success: true,
      count: filteredApplications.length,
      data: filteredApplications,
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
        .json({ success: false, message: "Invalid status value", data: null });
    }

    if (status === "Rejected") {
      const leaveApplication = await leaveApplicationModel
        .findById(id)
        .populate("student", "email");

      if (!leaveApplication) {
        return res.status(404).json({
          success: false,
          message: "Leave application not found",
          data: null,
        });
      }

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
        data: { _id: id, status: "Rejected" }, // Ensure consistent response
      });
    }

    if (status === "Approved") {
      const leaveApplication = await leaveApplicationModel
        .findById(id)
        .populate("student", "email parentEmail");

      if (!leaveApplication) {
        return res.status(404).json({
          success: false,
          message: "Leave application not found",
          data: null,
        });
      }

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
      await leaveApplicationModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    }
    return res.status(200).json({
      success: true,
      message: `Leave application ${status} successfully`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

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

    // Ensuring student data exists
    const parentEmail = leaveApplication.student?.parentEmail;
    if (!parentEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Parent email not found" });
    }

    // Sending Mail to parents
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: parentEmail,
      subject: "Leave Application Return Details",
      text: "Your ward has returned to the hostel.",
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // Deleting the leave application document
    await leaveApplicationModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Leave application deleted successfully",
    });
  } catch (error) {
    console.error("Error in markReturnDetails:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
