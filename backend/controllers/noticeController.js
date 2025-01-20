import { jsPDF } from "jspdf";
import noticeModel from "../models/noticeModel.js";
import wardenModel from "../models/wardenModel.js";
import studentModel from "../models/studentModel.js";
// Create Notice Controller
export const createNotice = async (req, res) => {
  try {
    const { title, content, userId, visibleToStudents } = req.body;
    const user = await wardenModel.findById(userId);
    // Create the notice
    const notice = new noticeModel({
      title,
      content,
      createdBy: user.role, // Warden ID (obtained from JWT or session)
      hostel: user.role === "Warden" ? user.hostelName : undefined, // Only apply hostel for Warden
      visibleToStudents: user.role === "ChiefWarden" ? visibleToStudents : true, // Only ChiefWarden can make it visible to students
    });

    // Save the notice
    await notice.save();

    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create notice" });
  }
};
// Download Notice as PDF
export const downloadNoticePDF = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const notice = await noticeModel.findById(noticeId);

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    const doc = new jsPDF();
    doc.text(`Title: ${notice.title}`, 10, 10);
    doc.text(`Content: ${notice.content}`, 10, 20);
    doc.text(`Created By: ${notice.createdBy}`, 10, 30);
    doc.text(`Date: ${notice.createdAt}`, 10, 40);

    const pdfOutput = doc.output("arraybuffer");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=notice-${noticeId}.pdf`
    );
    res.send(Buffer.from(pdfOutput));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
export const getChiefWardenNotices = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await wardenModel.findById(userId);
    let notices;
    if (user) {
      notices = await noticeModel.find({ createdBy: "ChiefWarden" });
    } else {
      //const user = await studentModel.findById(userId);
      // Students can see ChiefWarden notices if marked for student visibility
      notices = await noticeModel.find({
        createdBy: "ChiefWarden", // Ensuring they are not created by the current student
        visibleToStudents: true, // Notices marked for student visibility
      });
    }
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
};

// Controller for Warden Notices
export const getWardenNotices = async (req, res) => {
  try {
    const { userId } = req.body;
    let notices;
    const user = await wardenModel.findById(userId);
    if (user) {
      notices = await noticeModel.find({ hostel: user.hostelName });
    } else {
      const user = await studentModel.findById(userId);
      notices = await noticeModel.find({ hostel: user.hostelName });
    }

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
};
