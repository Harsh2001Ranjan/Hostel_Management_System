import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
  },
  hostelName: {
    type: String,
    required: true,
    trim: true,
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true,
  },
  studentPhoneNumber: {
    type: Number,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  typeOfComplaint: {
    type: String,
    required: true,
    enum: [
      "electrician",
      "plumber",
      "carpenter",
      "watersupply",
      "required amenities",
      "staff behavior",
      "security",
      "pest control",
      "laundry",
      "drinking water",
      "night canteen",
      "any other type",
    ],
  },
  description: {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
  },
  complaintTime: {
    type: Date,
    default: Date.now,
  },
  complaintResolveTime: {
    type: Date,
    default: null,
  },
  complaintStatus: {
    type: String,
    enum: ["sent", "processing", "resolved", "ignored"],
    default: "sent",
  },
  studentApproval: {
    type: Boolean,
    default: true,
    required: function () {
      // Only require studentApproval if complaintStatus is "resolved"
      return this.complaintStatus === "resolved";
    },
  },
});

const complaintModel =
  mongoose.models.complaint || mongoose.model("Complaint", complaintSchema);

export default complaintModel;
