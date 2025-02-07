import foodWastageModel from "../models/avoidFoodWastageModel.js";
import studentModel from "../models/studentModel.js"; // Student model
import wardenModel from "../models/wardenModel.js"; // warden model
// Controller to mark a meal as not skipped for a student
// export const markMealNotSkipped = async (req, res) => {
//   const { userId, meal } = req.body; // Get  userID of student and meal from the request body

//   try {
//     // Validate the meal input
//     const validMeals = ["breakfast", "snack", "lunch", "dinner"];
//     if (!validMeals.includes(meal)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid meal specified",
//       });
//     }

//     // Get the student data
//     const student = await studentModel.findById(userId);
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     // Get the hostel of the student
//     //const { hostelName } = student;

//     // Find the foodWastage document for the hostel
//     const foodWastage = await foodWastageModel.findOne({
//       hostel: student.hostelName,
//     });
//     if (!foodWastage) {
//       return res.status(404).json({
//         success: false,
//         message: "Food wastage data not found for this hostel",
//       });
//     }

//     // Increment the count for the specified meal
//     const mealField = `${meal}NotSkipped`;
//     foodWastage[mealField] = foodWastage[mealField] + 1; // Increment the count for not skipping the meal
//     await foodWastage.save();

//     return res.status(200).json({
//       success: true,
//       message: `${
//         meal.charAt(0).toUpperCase() + meal.slice(1)
//       } marked as not skipped`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
// /////////////////////////////////////////
export const markMealNotSkipped = async (req, res) => {
  const { userId, meals } = req.body; // Get student ID and meals array

  try {
    // Validate meal input
    const validMeals = ["breakfast", "snack", "lunch", "dinner"];
    if (
      !Array.isArray(meals) ||
      meals.some((meal) => !validMeals.includes(meal))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal(s) specified",
      });
    }

    // Get the student data
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Find the foodWastage document for the hostel
    const foodWastage = await foodWastageModel.findOne({
      hostel: student.hostelName,
    });
    if (!foodWastage) {
      return res.status(404).json({
        success: false,
        message: "Food wastage data not found for this hostel",
      });
    }

    // Prevent duplicate marking
    if (foodWastage.studentsMarked.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already marked your meals for today",
      });
    }

    console.log("Updating food wastage counts...");

    // Increment meal counters
    meals.forEach((meal) => {
      const mealField = `${meal}NotSkipped`;
      foodWastage[mealField] += 1;
    });

    // Add student ID to prevent duplicate marking
    foodWastage.studentsMarked.push(userId);

    await foodWastage.save();

    return res.status(200).json({
      success: true,
      message: "Meals marked as not skipped successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////niche sahii haiii
// export const markMealNotSkipped = async (req, res) => {
//   const { userId, meal } = req.body; // Get student ID and meal

//   try {
//     // Validate meal input
//     const validMeals = ["breakfast", "snack", "lunch", "dinner"];
//     if (!validMeals.includes(meal)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid meal specified",
//       });
//     }

//     // Get the student data
//     const student = await studentModel.findById(userId);
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     // Find the foodWastage document for the hostel
//     const foodWastage = await foodWastageModel.findOne({
//       hostel: student.hostelName,
//     });

//     if (!foodWastage) {
//       return res.status(404).json({
//         success: false,
//         message: "Food wastage data not found for this hostel",
//       });
//     }

//     // Prevent duplicate marking
//     if (foodWastage.studentsMarked.includes(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already marked your meal for today",
//       });
//     }
//     console.log("food wastage Controller chala hai");
//     // Increment meal count
//     const mealField = `${meal}NotSkipped`;
//     foodWastage[mealField] += 1;

//     // Add student ID to prevent duplicate marking
//     foodWastage.studentsMarked.push(userId);

//     await foodWastage.save();

//     return res.status(200).json({
//       success: true,
//       message: `${
//         meal.charAt(0).toUpperCase() + meal.slice(1)
//       } marked as not skipped`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller to show the number of students not skipping a meal for a given hostel
export const getFoodWastageStats = async (req, res) => {
  const { userId } = req.body; // Get the warden's ID from the request body

  try {
    // Get the warden and their hostel
    const warden = await wardenModel.findById(userId);
    if (!warden) {
      return res.status(404).json({
        success: false,
        message: "Warden not found",
      });
    }

    // Find the food wastage record for the hostel
    const foodWastage = await foodWastageModel.findOne({
      hostel: warden.hostelName,
    });
    if (!foodWastage) {
      return res.status(404).json({
        success: false,
        message: "Food wastage data not found for this hostel",
      });
    }

    // Return the data to the warden
    return res.status(200).json({
      success: true,
      message: "Food wastage stats retrieved successfully",
      data: foodWastage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// This function will be called to reset the meal counts at 8 PM every day
// export const resetFoodWastageCounts = async () => {
//   try {
//     // Get the list of hostels from the student collection
//     const hostels = await studentModel.distinct("hostelName");

//     // For each hostel, reset the food wastage counts
//     for (const hostel of hostels) {
//       let foodWastage = await foodWastageModel.findOne({ hostel });

//       // If a record exists for this hostel, update it, else create a new record
//       if (foodWastage) {
//         // Update the existing record with total students count
//         foodWastage.breakfastNotSkipped = 0;
//         foodWastage.snackNotSkipped = 0;
//         foodWastage.lunchNotSkipped = 0;
//         foodWastage.dinnerNotSkipped = 0;
//         await foodWastage.save();
//       } else {
//         // If no record exists for this hostel, create a new one
//         foodWastage = new foodWastageModel({
//           hostel,
//           breakfastNotSkipped: 0,
//           snackNotSkipped: 0,
//           lunchNotSkipped: 0,
//           dinnerNotSkipped: 0,
//         });
//         await foodWastage.save();
//       }
//     }

//     console.log("Food wastage counts reset successfully.");
//   } catch (error) {
//     console.error("Error resetting food wastage counts:", error);
//   }
// };
/////////////////////////////////////////////
export const resetFoodWastageCounts = async () => {
  try {
    // Get the list of hostels from the student collection
    const hostels = await studentModel.distinct("hostelName");

    // Reset food wastage counts for each hostel
    for (const hostel of hostels) {
      let foodWastage = await foodWastageModel.findOne({ hostel });

      if (foodWastage) {
        // Reset meal counts and studentsMarked
        foodWastage.breakfastNotSkipped = 0;
        foodWastage.snackNotSkipped = 0;
        foodWastage.lunchNotSkipped = 0;
        foodWastage.dinnerNotSkipped = 0;
        foodWastage.studentsMarked = []; // Clear list of marked students

        await foodWastage.save();
      } else {
        // Create a new record if not exists
        foodWastage = new foodWastageModel({
          hostel,
          breakfastNotSkipped: 0,
          snackNotSkipped: 0,
          lunchNotSkipped: 0,
          dinnerNotSkipped: 0,
          studentsMarked: [],
        });
        await foodWastage.save();
      }
    }

    console.log("Food wastage counts reset successfully.");
  } catch (error) {
    console.error("Error resetting food wastage counts:", error);
  }
};
