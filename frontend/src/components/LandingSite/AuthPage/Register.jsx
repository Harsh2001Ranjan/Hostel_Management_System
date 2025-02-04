import React, { useState, useEffect } from "react";
import back from "../../../assets/back.jpg";
import {
  Box,
  Button,
  CssBaseline,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerStudent } from "../../../redux/features/authSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        EcoTrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function RegistrationForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { isLoading, error, success } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      ...Object.fromEntries(formData.entries()),
      address: {
        state: formData.get("state"),
        district: formData.get("district"),
      },
    };

    console.log("Form Data:", data);

    if (!data.address.state || !data.address.district) {
      console.log("Address with state and district is required");
      return;
    }

    dispatch(registerStudent(data));
  };

  // Redirect to OTP page after successful registration
  useEffect(() => {
    if (success) {
      navigate("/enterotp");
    }
  }, [success, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(30%)",
          zIndex: -1,
        }}
      />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.39)",
            padding: "2rem",
            borderRadius: 4,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            component="h6"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Registration Form
          </Typography>

          {/* ✅ Display error message */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* ✅ Display success message */}
          {success && (
            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
              Registration successful! Redirecting...
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Name"
                  autoComplete="name"
                  variant="outlined"
                />
              </Grid>

              {/* Registration Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="registrationNumber"
                  label="Registration Number"
                  autoComplete="registration-number"
                  variant="outlined"
                />
              </Grid>

              {/* Hostel Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="hostelName"
                  label="Hostel Name"
                  variant="outlined"
                />
              </Grid>

              {/* Room Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="roomNumber"
                  label="Room Number"
                  variant="outlined"
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                />
              </Grid>

              {/* Parent's Phone Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="parentsPhoneNumber"
                  label="Parent's Phone Number"
                  type="tel"
                  variant="outlined"
                />
              </Grid>

              {/* State */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="state"
                  label="State"
                  variant="outlined"
                />
              </Grid>

              {/* District */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="district"
                  label="District"
                  variant="outlined"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                />
              </Grid>

              {/* Parent's Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="parentEmail"
                  label="Parent's Email Address"
                  type="email"
                  variant="outlined"
                />
              </Grid>

              {/* Current Year */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="currentYear"
                  label="Current Year"
                  type="number"
                  variant="outlined"
                  inputProps={{ min: 1, max: 4 }}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              {/* Repeat Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="repeatPassword"
                  label="Repeat Password"
                  type={showRepeatPassword ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowRepeatPassword}
                        edge="end"
                      >
                        {showRepeatPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, borderRadius: "16px", padding: "0.8rem" }}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="/login" variant="body2" sx={{ fontWeight: "bold" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </Box>
  );
}
