import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const AddWardenForm = () => {
  const [wardenData, setWardenData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    hostelName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    setWardenData({ ...wardenData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/warden/add", wardenData);
      setSuccessMessage("Warden added successfully!"); // Set success message
      toast.success(response.data.message);
      setWardenData({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        hostelName: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add warden");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Paper
        elevation={6}
        sx={{ padding: 4, backgroundColor: "#f7f7f7", borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#007bff", // Custom color for better visibility
            fontWeight: "bold", // Bold font for better emphasis
            textAlign: "center",
          }}
        >
          Add New Warden
        </Typography>
        {successMessage && (
          <Alert
            severity="success"
            sx={{
              marginBottom: 2,
              backgroundColor: "#d1ecf1", // Custom background color
              color: "#0c5460", // Custom text color
              fontWeight: "bold", // Custom font weight
            }}
          >
            {successMessage}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { marginBottom: 2 },
            backgroundColor: "#ffffff", // Custom form background color
            padding: 2, // Custom padding for better spacing
            borderRadius: 1, // Custom border radius for rounded corners
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={wardenData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="employeeId"
                value={wardenData.employeeId}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={wardenData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={wardenData.phoneNumber}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hostel Name"
                name="hostelName"
                value={wardenData.hostelName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={wardenData.password}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              marginTop: 3,
              backgroundColor: "#007bff", // Custom button color
              "&:hover": { backgroundColor: "#0056b3" }, // Custom hover color
              fontWeight: "bold", // Bold font for button
            }}
          >
            Add Warden
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddWardenForm;
