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
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook and useSelector
import { resetPassword } from "../../../redux/features/authSlice"; // Import resetPassword action

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

export default function SetNewPassword() {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  const [showPassword, setShowPassword] = useState(false);

  // Extract isLoading and error state from the auth slice
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data); // Debugging purposes

    // Dispatch the resetPassword action
    dispatch(resetPassword(data))
      .unwrap()
      .then(() => {
        // After form submission, navigate to the login page
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
      });
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
            Set New Password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            {error && (
              <Alert
                severity="error"
                sx={{ width: "100%", marginBottom: "1rem" }}
              >
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
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

              {/* OTP */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="otp"
                  label="OTP"
                  type="text"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                />
              </Grid>

              {/* Role */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  required
                  name="role"
                  label="Select Role"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Warden">Warden</MenuItem>
                  <MenuItem value="ChiefWarden">ChiefWarden</MenuItem>
                </TextField>
              </Grid>

              {/* New Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="newPassword"
                  label="New Password"
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
            </Grid>
            {isLoading ? (
              <Box sx={{ mt: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
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
                Confirm
              </Button>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
