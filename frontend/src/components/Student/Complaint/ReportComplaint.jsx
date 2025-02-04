import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  submitComplaint,
  resetSuccess,
} from "../../../redux/features/complaintSlice";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    typeOfComplaint: "",
    description: {
      text: "",
    },
  });

  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.complaints || {}
  );

  // Reset success message and form data after some time
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetSuccess());
        setFormData({ typeOfComplaint: "", description: { text: "" } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "description") {
      setFormData((prevData) => ({
        ...prevData,
        description: { text: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit the complaint form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.typeOfComplaint || !formData.description.text) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      await dispatch(submitComplaint(formData));
    } catch (error) {
      console.error("Error submitting complaint: ", error);
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Complaint submitted successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type of Complaint</InputLabel>
              <Select
                name="typeOfComplaint"
                value={formData.typeOfComplaint}
                onChange={handleChange}
                required
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
                <MenuItem value="mess">Mess</MenuItem>
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
              value={formData.description.text}
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
              fullWidth
              sx={{
                bgcolor: "#007bff",
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#0056b3" },
              }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Complaint"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ComplaintForm;
