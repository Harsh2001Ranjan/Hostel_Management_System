import menuModel from "../models/menuModel.js";
import wardenModel from "../models/wardenModel.js";
import studentModel from "../models/studentModel.js";

// Controller to add a menu
export const addMenu = async (req, res) => {
  try {
    const { dayOfWeek, breakfast, snack, lunch, dinner, specialmeal } =
      req.body;
    const { userId } = req.body; // Get the warden's user ID from req.body (set by the userAuth middleware)

    // Find the warden by userId
    const warden = await wardenModel.findById(userId);
    if (!warden) {
      return res.status(404).json({
        success: false,
        message: "Warden not found or unauthorized",
      });
    }

    // Get the hostel associated with the warden
    const hostel = warden.hostelName;
    if (!hostel) {
      return res.status(400).json({
        success: false,
        message: "Hostel information not found for the warden",
      });
    }

    // Validate required fields
    if (!dayOfWeek) {
      return res.status(400).json({
        success: false,
        message: "dayOfWeek is a required field.",
      });
    }

    // Check if a menu already exists for the given day and hostel
    const existingMenu = await menuModel.findOne({ dayOfWeek, hostel });
    if (existingMenu) {
      return res.status(400).json({
        success: false,
        message: `Menu for ${dayOfWeek} already exists for hostel: ${hostel}.`,
      });
    }

    // Create a new menu
    const newMenu = new menuModel({
      dayOfWeek,
      breakfast,
      snack,
      lunch,
      dinner,
      specialmeal: specialmeal || null,
      hostel, // Automatically set from the warden's hostel
    });

    // Save the menu to the database
    await newMenu.save();

    res.status(201).json({
      success: true,
      message: "Menu added successfully.",
      menu: newMenu,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the menu.",
      error: error.message,
    });
  }
};

// Controller to update a menu
export const updateMenu = async (req, res) => {
  try {
    const { dayOfWeek, breakfast, snack, lunch, dinner, specialmeal } =
      req.body;
    const { userId } = req.body; // Get the warden's user ID from req.body (set by the userAuth middleware)

    // Find the warden by userId
    const warden = await wardenModel.findById(userId);
    if (!warden) {
      return res.status(404).json({
        success: false,
        message: "Warden not found or unauthorized",
      });
    }

    // Get the hostel associated with the warden
    const hostel = warden.hostelName;
    if (!hostel) {
      return res.status(400).json({
        success: false,
        message: "Hostel information not found for the warden",
      });
    }

    // Find the menu for the given day and hostel
    const menuToUpdate = await menuModel.findOne({ dayOfWeek, hostel });
    if (!menuToUpdate) {
      return res.status(404).json({
        success: false,
        message: `Menu for ${dayOfWeek} not found for hostel: ${hostel}.`,
      });
    }

    // Update the fields with the new values provided
    menuToUpdate.breakfast = breakfast || menuToUpdate.breakfast; // Only update if a new value is provided
    menuToUpdate.snack = snack || menuToUpdate.snack;
    menuToUpdate.lunch = lunch || menuToUpdate.lunch;
    menuToUpdate.dinner = dinner || menuToUpdate.dinner;
    menuToUpdate.specialmeal =
      specialmeal !== undefined ? specialmeal : menuToUpdate.specialmeal; // Update specialmeal only if a value is provided

    // Save the updated menu
    await menuToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Menu updated successfully.",
      menu: menuToUpdate,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the menu.",
      error: error.message,
    });
  }
};

// Controller to get the menu for a specific day and hostel
export const getMenu = async (req, res) => {
  const { dayOfWeek } = req.body; // Get the day from the request body (optional)
  const { userId } = req.body; // Get the logged-in user's ID from the request body

  try {
    // Get the current day of the week if dayOfWeek is not provided
    const currentDate = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = daysOfWeek[currentDate.getDay()]; // Get current day (0=Sunday, 6=Saturday)

    // Use the provided dayOfWeek or the current day if not provided
    const finalDayOfWeek = dayOfWeek || currentDay;

    // Validate the final dayOfWeek
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (!validDays.includes(finalDayOfWeek)) {
      return res.status(400).json({
        success: false,
        message: "Invalid day of the week",
      });
    }

    // Check if the user is a warden or student and fetch hostel accordingly
    let hostel;

    // Try fetching from the warden model
    const warden = await wardenModel.findById(userId);
    if (warden) {
      hostel = warden.hostelName; // Get hostel from warden
    } else {
      // Try fetching from the student model if not found in the warden model
      const student = await studentModel.findById(userId);
      if (student) {
        hostel = student.hostelName; // Get hostel from student
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    if (!hostel) {
      return res.status(400).json({
        success: false,
        message: "Hostel information not found",
      });
    }

    // Find the menu for the given hostel and dayOfWeek (either the provided or current day)
    const menu = await menuModel.findOne({
      hostel,
      dayOfWeek: finalDayOfWeek, // Use the final dayOfWeek (either provided or current)
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found for the specified day and hostel",
      });
    }

    // Return the menu details
    return res.status(200).json({
      success: true,
      message: "Menu retrieved successfully",
      data: menu,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
