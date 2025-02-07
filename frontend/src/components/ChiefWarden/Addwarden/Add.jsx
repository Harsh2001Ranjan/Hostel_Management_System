import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addWarden, clearState } from "../../../redux/features/addWardenSlice";

const AddWardenForm = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.warden || {}
  );

  console.log("Redux state:", { loading, error, successMessage });

  const [wardenData, setWardenData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    hostelName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearState());
        if (successMessage) {
          setWardenData({
            name: "",
            employeeId: "",
            email: "",
            phoneNumber: "",
            hostelName: "",
            password: "",
          });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleChange = (e) => {
    setWardenData({
      ...wardenData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWarden(wardenData));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: "#f7f7f7",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#007bff",
            fontWeight: "bold",
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
              backgroundColor: "#d1ecf1",
              color: "#0c5460",
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { marginBottom: 2 },
            backgroundColor: "#ffffff",
            padding: 2,
            borderRadius: 1,
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
                        onClick={() => setShowPassword((prev) => !prev)}
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
            disabled={loading}
            sx={{
              marginTop: 3,
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Add Warden"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddWardenForm;
