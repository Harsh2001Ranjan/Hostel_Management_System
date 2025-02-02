import React, { useState } from "react";
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

    // Validation: Ensure state and district are provided
    if (!data.address.state || !data.address.district) {
      console.log("Address with state and district is required");
      return;
    }

    // Dispatch registration action
    dispatch(registerStudent(data));

    // Redirect to OTP page after successful registration
    if (success) {
      navigate("/enterotp");
    }
  };

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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                  inputProps={{
                    min: 1,
                    max: 4,
                  }}
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
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
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
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
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
              sx={{
                mt: 3,
                borderRadius: "16px",
                padding: "0.8rem",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Register
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
