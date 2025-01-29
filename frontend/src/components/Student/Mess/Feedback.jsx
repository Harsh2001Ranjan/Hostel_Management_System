import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Slider,
} from "@mui/material";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    foodQuality: 3,
    service: 3,
    cleanliness: 3,
    comment: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSliderChange = (e, newValue, name) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Simulate form submission
    const isValid = Math.random() > 0.2; // Simulates success or failure
    if (isValid) {
      setSuccessMessage("Feedback submitted successfully!");
      setFormData({
        foodQuality: 3,
        service: 3,
        cleanliness: 3,
        comment: "",
      });
    } else {
      setErrorMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: "8px",
        bgcolor: "#f8f9fa",
        border: "1px solid #e0e0e0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "#212121",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Submit Your Feedback
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontStyle: "italic",
          color: "#555",
          marginBottom: "20px",
        }}
      >
        Your voice matters, and your feedback shapes our progress.
      </Typography>

      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#f8d7da",
            color: "#842029",
          }}
        >
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#d1e7dd",
            color: "#0f5132",
          }}
        >
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Food Quality Rating with Slider */}
          <Grid item xs={12}>
            <Typography variant="h6">Food Quality</Typography>
            <Slider
              value={formData.foodQuality}
              onChange={(e, newValue) =>
                handleSliderChange(e, newValue, "foodQuality")
              }
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={5}
              sx={{
                width: "100%",
                mt: 1,
                transition: "all 0.3s ease",
                "& .MuiSlider-thumb": {
                  transition: "all 0.3s ease",
                  bgcolor: "#FF5733", // Orange color for thumb
                },
                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  bgcolor: "#FF5733", // Orange color for rail
                },
                "& .MuiSlider-track": {
                  bgcolor: "#FF5733", // Orange color for track
                },
              }}
            />
          </Grid>

          {/* Service Rating with Slider */}
          <Grid item xs={12}>
            <Typography variant="h6">Service</Typography>
            <Slider
              value={formData.service}
              onChange={(e, newValue) =>
                handleSliderChange(e, newValue, "service")
              }
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={5}
              sx={{
                width: "100%",
                mt: 1,
                transition: "all 0.3s ease",
                "& .MuiSlider-thumb": {
                  transition: "all 0.3s ease",
                  bgcolor: "#4CAF50", // Green color for thumb
                },
                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  bgcolor: "#4CAF50", // Green color for rail
                },
                "& .MuiSlider-track": {
                  bgcolor: "#4CAF50", // Green color for track
                },
              }}
            />
          </Grid>

          {/* Cleanliness Rating with Slider */}
          <Grid item xs={12}>
            <Typography variant="h6">Cleanliness</Typography>
            <Slider
              value={formData.cleanliness}
              onChange={(e, newValue) =>
                handleSliderChange(e, newValue, "cleanliness")
              }
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={5}
              sx={{
                width: "100%",
                mt: 1,
                transition: "all 0.3s ease",
                "& .MuiSlider-thumb": {
                  transition: "all 0.3s ease",
                  bgcolor: "#2196F3", // Blue color for thumb
                },
                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  bgcolor: "#2196F3", // Blue color for rail
                },
                "& .MuiSlider-track": {
                  bgcolor: "#2196F3", // Blue color for track
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Comments"
              name="comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              multiline
              rows={4}
              sx={{
                fontSize: "1rem",
                borderRadius: "6px",
                mt: 2,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#007bff",
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#0056b3",
                },
              }}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FeedbackForm;
