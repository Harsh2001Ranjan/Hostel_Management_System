import pollModel from "../models/pollModel.js";
import studentModel from "../models/studentModel.js";
import wardenModel from "../models/wardenModel.js";

// Create Poll (warden)
export const createPoll = async (req, res) => {
  try {
    const { userId, question, options } = req.body;

    // Check if the user is a warden
    const warden = await wardenModel.findById(userId);
    const { hostelName } = warden;

    // Create the poll
    const pollData = {
      hostelName,
      question,
      options,
      createdBy: userId,
    };

    const poll = await pollModel.create(pollData);

    res.status(201).json({
      message: "Poll created successfully.",
      poll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete Poll (warden)
export const deletePoll = async (req, res) => {
  try {
    const { userId } = req.body;
    const { pollId } = req.params;

    // Check if the user is a warden
    const warden = await wardenModel.findById(userId);

    // Find the poll and check if the warden created it
    const poll = await pollModel.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    if (poll.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete polls you created." });
    }
    console.log(pollId);
    // Delete the poll
    await pollModel.deleteOne({ _id: pollId });
    console.log("Poll deleted successfully.");

    res.status(200).json({ message: "Poll deleted successfully." });
  } catch (error) {
    console.log(error);
    console.error("Error deleting poll:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Get all polls created by the warden
export const getWardenPolls = async (req, res) => {
  try {
    const { userId } = req.body; // Assume warden's ID is extracted from the middleware

    // Fetch all polls created by the warden
    const polls = await pollModel.find({ createdBy: userId });

    if (!polls || polls.length === 0) {
      return res.status(404).json({ message: "No polls found." });
    }

    // Send response with all polls created by the warden
    res.status(200).json({
      message: "Polls fetched successfully.",
      polls: polls.map((poll) => ({
        pollId: poll._id,
        question: poll.question,
        options: poll.options,
        createdAt: poll.createdAt,
        totalReactions: poll.reactions.length,
      })),
    });
  } catch (error) {
    console.error("Error fetching warden's polls:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Get Polls for Students (student hasn't reacted yet)
export const getPollsForStudent = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the student
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Get polls for student's hostel that the student hasn't reacted to
    const polls = await pollModel.find({
      hostelName: student.hostelName,
      "reactions.studentId": { $ne: userId },
    });

    res.status(200).json({
      message: "Polls fetched successfully.",
      polls,
    });
  } catch (error) {
    console.error("Error fetching polls for student:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Get Poll Results (warden)
export const getPollResults = async (req, res) => {
  try {
    const { userId } = req.body;
    const { pollId } = req.params;

    // Find the poll
    const poll = await pollModel.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    // Check if the warden is authorized to view the poll results
    if (poll.createdBy.toString() !== userId) {
      return res.status(403).json({
        error: "You are not authorized to view the results of this poll.",
      });
    }

    // Calculate results
    const results = {};
    poll.options.forEach((option) => {
      results[option] = 0; // Initialize the count for each option
    });

    poll.reactions.forEach((reaction) => {
      if (results[reaction.option] !== undefined) {
        results[reaction.option]++;
      }
    });

    // Respond with the poll results
    res.status(200).json({
      message: "Poll results fetched successfully.",
      poll: {
        question: poll.question,
        options: poll.options,
      },
      results,
    });
  } catch (error) {
    console.error("Error fetching poll results:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
//poll result for student
export const getStudentPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;

    // Find the poll
    const poll = await pollModel.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    // Calculate results
    const results = {};
    poll.options.forEach((option) => {
      results[option] = 0; // Initialize count for each option
    });

    poll.reactions.forEach((reaction) => {
      if (results[reaction.option] !== undefined) {
        results[reaction.option]++;
      }
    });

    // Respond with the poll results
    res.status(200).json({
      message: "Poll results fetched successfully.",
      poll: {
        question: poll.question,
        options: poll.options,
      },
      results,
    });
  } catch (error) {
    console.error("Error fetching poll results:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// React to a Poll (student)
export const reactToPoll = async (req, res) => {
  try {
    const { userId, option } = req.body;
    const { pollId } = req.params;

    // Check if the student exists
    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Find the poll
    const poll = await pollModel.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    // Check if the option is valid
    if (!poll.options.includes(option)) {
      return res.status(400).json({ error: "Invalid option." });
    }

    // Check if the student has already reacted
    const existingReaction = poll.reactions.find(
      (reaction) => reaction.studentId.toString() === userId
    );

    if (existingReaction) {
      return res
        .status(409)
        .json({ error: "You have already reacted to this poll." });
    }

    // Add the reaction
    poll.reactions.push({ studentId: userId, option });
    await poll.save();

    res.status(200).json({
      message: "Poll reacted successfully.",
      poll,
    });
  } catch (error) {
    console.error("Error reacting to poll:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
