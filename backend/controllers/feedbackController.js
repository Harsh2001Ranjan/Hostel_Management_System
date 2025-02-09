import feedbackModel from "../models/feedbackModel.js";
import studentModel from "../models/studentModel.js";
import wardenModel from "../models/wardenModel.js";

export const submitFeedback = async (req, res) => {
  try {
    // Extract userId from req.body
    const { userId, foodQuality, service, cleanliness, comment } = req.body;

    // Find the student using the userId
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    const { hostelName } = student;

    // Create feedback data
    const feedbackData = {
      studentId: userId,
      hostelName,
      foodQuality,
      service,
      cleanliness,
      comment,
    };

    // Save feedback
    const feedback = await feedbackModel.create(feedbackData);

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate feedback submission
      return res.status(409).json({
        error: "Feedback for this month has already been submitted.",
      });
    }
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
//to show all current month feedbacks to warden
export const getCurrentMonthFeedback = async (req, res) => {
  try {
    const { userId } = req.body; // Warden ID should be provided in the request body

    // Find the warden's hostel name
    const warden = await wardenModel.findById(userId);
    if (!warden) {
      return res.status(404).json({ error: "Warden not found." });
    }

    const { hostelName } = warden;

    // Get the current month in YYYY-MM format
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    // Retrieve feedback for the warden's hostel for the current month
    const feedbacks = await feedbackModel.find({
      hostelName,
      month: currentMonth,
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({
        message: `No feedback found for ${hostelName} for the month ${currentMonth}.`,
      });
    }

    res.status(200).json({
      message: `Feedback for ${hostelName} for the month ${currentMonth}.`,
      feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
//to get previousMonthAnalytics to warden and chiefWarden

export const getPreviousMonthAnalytics = async (req, res) => {
  try {
    const { userId } = req.body; // User ID from the request body

    // Fetch the user (warden or chiefwarden) from the database
    const user = await wardenModel.findById(userId);
    const { role } = user;

    // Calculate previous month in YYYY-MM format
    const now = new Date();
    const year =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() === 0 ? 12 : now.getMonth();
    const previousMonth = `${year}-${String(month).padStart(2, "0")}`;

    let feedbacks;
    if (role === "Warden") {
      // Fetch the hostel name for the warden
      const { hostelName } = user;

      // Fetch feedback for the specific hostel
      feedbacks = await feedbackModel.find({
        hostelName,
        month: previousMonth,
      });

      if (feedbacks.length === 0) {
        return res.status(404).json({
          message: `No feedback found for ${hostelName} for the month ${previousMonth}.`,
        });
      }

      // Calculate average ratings for warden's hostel
      const totalFeedbacks = feedbacks.length;
      const averages = feedbacks.reduce(
        (acc, feedback) => {
          acc.foodQuality += feedback.foodQuality;
          acc.service += feedback.service;
          acc.cleanliness += feedback.cleanliness;
          return acc;
        },
        { foodQuality: 0, service: 0, cleanliness: 0 }
      );

      const averageRatings = {
        foodQuality: (averages.foodQuality / totalFeedbacks).toFixed(2),
        service: (averages.service / totalFeedbacks).toFixed(2),
        cleanliness: (averages.cleanliness / totalFeedbacks).toFixed(2),
      };

      return res.status(200).json({
        message: `Feedback analytics for ${hostelName} for the month ${previousMonth}.`,
        averageRatings,
      });
    } else if (role === "ChiefWarden") {
      // Fetch all feedback for all hostels
      feedbacks = await feedbackModel.find({ month: previousMonth });

      if (feedbacks.length === 0) {
        return res.status(404).json({
          message: `No feedback found for any hostel for the month ${previousMonth}.`,
        });
      }

      // Group feedbacks by hostelName
      const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
        if (!acc[feedback.hostelName]) {
          acc[feedback.hostelName] = [];
        }
        acc[feedback.hostelName].push(feedback);
        return acc;
      }, {});

      // Calculate average ratings for each hostel
      const analytics = Object.keys(groupedFeedbacks).map((hostelName) => {
        const feedbacksForHostel = groupedFeedbacks[hostelName];
        const totalFeedbacks = feedbacksForHostel.length;
        const averages = feedbacksForHostel.reduce(
          (acc, feedback) => {
            acc.foodQuality += feedback.foodQuality;
            acc.service += feedback.service;
            acc.cleanliness += feedback.cleanliness;
            return acc;
          },
          { foodQuality: 0, service: 0, cleanliness: 0 }
        );

        return {
          hostelName,
          averageRatings: {
            foodQuality: (averages.foodQuality / totalFeedbacks).toFixed(2),
            service: (averages.service / totalFeedbacks).toFixed(2),
            cleanliness: (averages.cleanliness / totalFeedbacks).toFixed(2),
          },
        };
      });

      return res.status(200).json({
        message: `Feedback analytics for all hostels for the month ${previousMonth}.`,
        analytics,
      });
    } else {
      return res.status(400).json({ error: "Invalid user role." });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
//////////////////////////////////////////////////////////////////

export const getPreviousMonthAverageRatings = async (req, res) => {
  try {
    // Calculate the previous month
    const now = new Date();
    const year =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() === 0 ? 12 : now.getMonth();
    const previousMonth = `${year}-${String(month).padStart(2, "0")}`;

    // Aggregate feedback data: match previous month, compute per-document average,
    // then group by hostelName to get overall averages.
    const ratings = await feedbackModel.aggregate([
      {
        $match: { month: previousMonth },
      },
      {
        $addFields: {
          avgRating: {
            $divide: [
              { $add: ["$foodQuality", "$service", "$cleanliness"] },
              3,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$hostelName",
          averageRating: { $avg: "$avgRating" },
        },
      },
    ]);

    // Return the aggregated data as a JSON response
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    console.error("Error calculating average ratings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
///////////////////////////////////////////////////////
// export const getPreviousMonthHostelRatings = async (req, res) => {
//   try {
//     // Get the previous month in YYYY-MM format
//     const now = new Date();
//     const year =
//       now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
//     const month = now.getMonth() === 0 ? 12 : now.getMonth();
//     const previousMonth = `${year}-${String(month).padStart(2, "0")}`;

//     const result = await feedbackModel.aggregate([
//       {
//         $match: { month: previousMonth }, // Filter feedback for the previous month
//       },
//       {
//         $group: {
//           _id: "$hostel", // Group by hostel name
//           avgFoodQuality: { $avg: "$foodQuality" },
//           avgService: { $avg: "$service" },
//           avgCleanliness: { $avg: "$cleanliness" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           hostel: "$_id",
//           foodQuality: { $round: ["$avgFoodQuality", 2] },
//           service: { $round: ["$avgService", 2] },
//           cleanliness: { $round: ["$avgCleanliness", 2] },
//         },
//       },
//     ]);

//     if (result.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No feedback data available for the previous month" });
//     }

//     res.status(200).json({ previousMonth, ratings: result });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };
