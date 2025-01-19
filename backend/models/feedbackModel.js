import mongoose from "mongoose";

// Feedback Schema
const feedbackSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    hostelName: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
      default: function () {
        // Get current date and format as YYYY-MM
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      },
      validate: {
        validator: function (value) {
          // Ensure the format is YYYY-MM
          return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
        },
        message: "Month must be in YYYY-MM format.",
      },
    },
    foodQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    service: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    cleanliness: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate feedback for the same student in the same month
feedbackSchema.index({ studentId: 1, month: 1 }, { unique: true });

// Create and export the Student model
const feedbackModel =
  mongoose.models.feedback || mongoose.model("Feedback", feedbackSchema);

export default feedbackModel;
