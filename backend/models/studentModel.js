import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespaces
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true, // Ensures no two students have the same registration number
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
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Validates a 10-digit phone number
  },
  parentsPhoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Validates a 10-digit phone number
  },
  address: {
    state: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Ensures a minimum length of 8 characters
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z]+\.[0-9]{8}@mnnit\.ac\.in$/, // Regex for the specific email format
    trim: true,
  },

  currentYear: {
    type: Number,
    required: true,
    min: 1, // Assuming the year is between 1 and 4
    max: 4,
  },

  //   {
  //     timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  //   }
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

// Create and export the Student model
const studentModel =
  mongoose.models.student || mongoose.model("Student", studentSchema);

export default studentModel;
