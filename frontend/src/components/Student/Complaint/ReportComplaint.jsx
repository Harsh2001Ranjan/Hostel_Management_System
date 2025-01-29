import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    typeOfComplaint: "",
    description: "",
    studentName: "",
    registrationNumber: "",
    hostelName: "",
    roomNumber: "",
    studentPhoneNumber: "",
    studentEmail: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the complaint form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Check if all required fields are filled
    if (!formData.typeOfComplaint || !formData.description) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    // Simulate a POST request to the backend (you should replace it with your actual API URL)
    try {
      const response = await fetch("YOUR_API_URL_HERE/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Complaint submitted successfully!");
        setFormData({
          typeOfComplaint: "",
          description: "",
          studentName: "",
          registrationNumber: "",
          hostelName: "",
          roomNumber: "",
          studentPhoneNumber: "",
          studentEmail: "",
        });
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("Error occurred while submitting the complaint.");
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
        Post Your Complaint
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
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type of Complaint</InputLabel>
              <Select
                label="Type of Complaint"
                name="typeOfComplaint"
                value={formData.typeOfComplaint}
                onChange={handleChange}
              >
                <MenuItem value="electrician">Electrician</MenuItem>
                <MenuItem value="plumber">Plumber</MenuItem>
                <MenuItem value="carpenter">Carpenter</MenuItem>
                <MenuItem value="watersupply">Water Supply</MenuItem>
                <MenuItem value="required amenities">
                  Required Amenities
                </MenuItem>
                <MenuItem value="staff behavior">Staff Behavior</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="pest control">Pest Control</MenuItem>
                <MenuItem value="laundry">Laundry</MenuItem>
                <MenuItem value="drinking water">Drinking Water</MenuItem>
                <MenuItem value="night canteen">Night Canteen</MenuItem>
                <MenuItem value="night canteen">Mess</MenuItem>
                <MenuItem value="any other type">Any Other Type</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Complaint Description"
              variant="outlined"
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
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
              Submit Complaint
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ComplaintForm;
