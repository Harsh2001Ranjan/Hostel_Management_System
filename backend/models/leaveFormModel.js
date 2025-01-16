import mongoose from "mongoose";
// Leave Application Schema
const leaveApplicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  reasonOfLeave: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  leaveType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  addressToGo: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 300,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending",
  },
  returnDetails: {
    isReturned: {
      type: Boolean,
      default: false,
    },
    // returnDate: {
    //   type: Date,
    //   default: null,
    // },
  },
});
// Create and export the leaveApplicationModel model
const leaveApplicationModel =
  mongoose.models.leaveApplication ||
  mongoose.model("LeaveApplication", leaveApplicationSchema);

export default leaveApplicationModel;
