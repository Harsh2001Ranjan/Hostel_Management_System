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
  wardenIgnoreReason: {
    type: String, // Reason provided by the warden for ignoring the complaint
    trim: true,
  },
  escalation: {
    escalatedBy: {
      type: String,
      enum: ["student", "warden"],
    },
    escalateReason: {
      type: String, // Reason for escalation provided by the student or warden
      trim: true,
    },
    escalationTime: {
      type: Date,
    },
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: function () {
        return this.studentApproval === true;
      },
    },
    comments: {
      type: String,
      trim: true,
    },
    feedbackTime: {
      type: Date,
    },
  },
  // studentApproval: {
  //   type: Boolean,
  //   default: null,
  //   required: function () {
  //     // Only require studentApproval if complaintStatus is "resolved"
  //     return this.complaintStatus === "resolved";
  //   },
  // },
  studentApproval: {
    type: Boolean,
    default: null,
  },
});

// Pre-save hook to ensure studentApproval is only set when status is "resolved"
complaintSchema.pre("save", function (next) {
  if (
    this.studentApproval !== null &&
    this.complaintStatus !== "resolved" &&
    !this.escalation.escalatedBy
  ) {
    return next(
      new Error(
        "studentApproval can only be set when complaintStatus is 'resolved'"
      )
    );
  }
  next();
});
const complaintModel =
  mongoose.models.complaint || mongoose.model("Complaint", complaintSchema);

export default complaintModel;
