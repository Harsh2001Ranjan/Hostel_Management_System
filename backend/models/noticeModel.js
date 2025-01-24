import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Warden",
  //     required: true,
  //   },
  createdBy: {
    type: String,
    required: true,
  },
  hostel: {
    type: String, // Applied only for notices created by warden
    required: function () {
      return this.createdBy.role === "Warden"; // Only required if Warden creates it
    },
  },
  visibleToStudents: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noticeModel =
  mongoose.models.notice || mongoose.model("Notice", noticeSchema);
export default noticeModel;
