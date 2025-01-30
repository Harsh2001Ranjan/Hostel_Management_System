import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";

const CreateNoticeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Mock API call
    const isValid = Math.random() > 0.2; // Simulates success or failure
    if (isValid) {
      setSuccessMessage("Notice created successfully!");
      setFormData({
        title: "",
        content: "",
      });
    } else {
      setErrorMessage("Failed to create notice. Please try again.");
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
          color: "#000000", // Updated color
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Create a Notice
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
            <TextField
              fullWidth
              label="Notice Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                  borderColor: "#000000", // Updated color
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#000000", // Updated color
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                  borderColor: "#000000", // Updated color
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#000000", // Updated color
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#007bff", // Updated color
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#0056b3", // Updated color
                },
              }}
            >
              Create Notice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateNoticeForm;
