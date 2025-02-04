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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/features/authSlice"; // Import the loginUser async thunk

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

export default function LoginForm() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password, role }))
      .unwrap()
      .then((response) => {
        if (response.student && response.student.role === "Student") {
          navigate("/dashboard");
        } else if (response.warden && response.warden.role === "Warden") {
          navigate("/wardendashboard");
        } else if (response.warden && response.warden.role === "ChiefWarden") {
          navigate("/chiefdashboard");
        }
      })
      .catch((err) => {
        // Error handling is managed by redux slice
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
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              color: theme.palette.primary.main,
              transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
              "&:hover": {
                color: theme.palette.primary.dark, // Darker shade on hover
                transform: "scale(1.2)", // Slightly enlarge on hover
              },
            }}
          >
            <HomeIcon sx={{ fontSize: 32 }} />
          </IconButton>

          <Typography
            component="h6"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Login
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: "16px",
                      backgroundColor: theme.palette.background.default,
                    },
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Role */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  required
                  name="role"
                  label="Select Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
              Login
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link
                  href="/reset"
                  variant="body2"
                  sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
