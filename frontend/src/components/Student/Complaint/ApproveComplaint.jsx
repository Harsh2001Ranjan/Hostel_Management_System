import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Rating,
  Paper,
  Divider,
} from "@mui/material";
import { CheckCircle, Cancel, Feedback } from "@mui/icons-material";

const ApproveComplaint = () => {
  const [studentApproval, setStudentApproval] = useState(null);
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleApprovalChange = (event) => {
    setStudentApproval(event.target.value === "true");
    setFeedbackSubmitted(false); // Reset feedback submission state
  };

  const handleSubmit = () => {
    if (studentApproval && (!rating || rating < 1 || rating > 5)) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }

    setFeedbackSubmitted(true);
    alert("Feedback submitted successfully!");
    // Handle actual submission logic
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          maxWidth: 600,
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 3,
          }}
        >
          <Feedback fontSize="large" color="primary" />
          <Typography variant="h4" fontWeight="bold" color="primary">
            Approve Complaint
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 3 }} />

        <FormLabel
          component="legend"
          sx={{ fontWeight: "bold", color: "#333", marginBottom: 2 }}
        >
          Student Approval
        </FormLabel>
        <RadioGroup row onChange={handleApprovalChange}>
          <FormControlLabel
            value="true"
            control={<Radio color="success" />}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="success" />
                Approve
              </Box>
            }
          />
          <FormControlLabel
            value="false"
            control={<Radio color="error" />}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Cancel color="error" />
                Reject
              </Box>
            }
          />
        </RadioGroup>

        {studentApproval && (
          <Box sx={{ marginTop: 3 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Feedback
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Please rate the resolution and provide additional comments.
            </Typography>

            <Rating
              name="feedback-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              sx={{ marginBottom: 2 }}
              size="large"
            />
            <TextField
              label="Comments"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share your thoughts about the resolution..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            marginTop: 4,
            backgroundColor: "#007bff",
            color: "#ffffff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
          disabled={
            studentApproval === null || (feedbackSubmitted && studentApproval)
          }
        >
          {feedbackSubmitted ? "Feedback Submitted" : "Submit Feedback"}
        </Button>
      </Paper>
    </Box>
  );
};

export default ApproveComplaint;
