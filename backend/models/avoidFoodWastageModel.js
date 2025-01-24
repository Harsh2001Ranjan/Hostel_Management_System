import mongoose from "mongoose";

const foodWastageSchema = new mongoose.Schema({
  hostel: {
    type: String, // Store hostel name or ID directly
    required: true,
  },
  breakfastNotSkipped: {
    type: Number,
    required: true,
    default: 0, // Initially, no one skips breakfast
  },
  snackNotSkipped: {
    type: Number,
    required: true,
    default: 0,
  },
  lunchNotSkipped: {
    type: Number,
    required: true,
    default: 0,
  },
  dinnerNotSkipped: {
    type: Number,
    required: true,
    default: 0,
  },
});

const foodWastageModel =
  mongoose.models.foodWastage ||
  mongoose.model("FoodWastage", foodWastageSchema);

export default foodWastageModel;
