import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const PollForm = () => {
  // State for form inputs
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  // Demo values for userId and hostelName (you can replace these with actual data once connected to backend)
  const demoUserId = "demoUserId"; // Replace with actual user ID
  const demoHostelName = "Hostel A"; // Replace with actual hostel name

  // Handle input change for question
  const handleQuestionChange = (e) => setQuestion(e.target.value);

  // Handle input change for options
  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  // Add new option input
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // Remove an option input
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some((option) => !option)) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const pollData = {
        userId: demoUserId,
        question,
        options,
      };

      const response = await axios.post("/api/poll/create", pollData);

      if (response.status === 201) {
        setMessage("Poll created successfully!");
        setQuestion("");
        setOptions(["", ""]);
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      setMessage("Error creating poll.");
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: "#f4f6f9",
          border: "1px solid #798bb8", // Border around the form
          borderRadius: "8px", // Rounded corners
        }}
      >
        <Typography variant="h5" gutterBottom color="#798bb8" fontWeight="bold">
          Create a Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poll Question"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Enter the poll question"
                required
                variant="outlined"
                color="primary"
                size="medium"
              />
            </Grid>
            {options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                    placeholder={`Enter option ${index + 1}`}
                    required
                    variant="outlined"
                    color="primary"
                    size="medium"
                  />
                  {index > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeOption(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={addOption}
                startIcon={<AddIcon />}
                fullWidth
                sx={{
                  marginTop: 2,
                  border: "2px solid #798bb8", // Clear border with color
                  color: "#798bb8", // Text color
                  "&:hover": {
                    backgroundColor: "#798bb8", // Background color on hover
                    color: "white", // Text color on hover
                  },
                }}
              >
                Add Option
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Create Poll
              </Button>
            </Grid>
            {message && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color={message.includes("Error") ? "error" : "success"}
                >
                  {message}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PollForm;
