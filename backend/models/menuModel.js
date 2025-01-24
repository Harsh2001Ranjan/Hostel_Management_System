import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
    default: "Monday",
  },
  breakfast: {
    type: [String], // Array of strings to store multiple food items
    required: true,
    default: ["Default Breakfast"],
  },
  snack: {
    type: [String], // Array of strings to store multiple snack items
    required: true,
    default: ["Default Snack"], // Default value for snacks
  },
  lunch: {
    type: [String], // Array of strings to store multiple food items
    required: true,
    default: ["Default Lunch"],
  },
  dinner: {
    type: [String], // Array of strings to store multiple food items
    required: true,
    default: ["Default Dinner"],
  },
  specialmeal: {
    type: String, // Single string to store special meal
  },
  hostel: {
    type: String,
    required: true, // Hostel name
  },
});

// Create and export the menu model
const menuModel = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default menuModel;
