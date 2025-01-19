import mongoose from "mongoose";

// Poll Schema
const pollSchema = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        option: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warden",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Poll model
const pollModel = mongoose.models.poll || mongoose.model("Poll", pollSchema);

export default pollModel;
