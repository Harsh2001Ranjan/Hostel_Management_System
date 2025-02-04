// import React from "react";
// import back from "../../../assets/back.jpg";
// import {
//   Box,
//   Button,
//   CssBaseline,
//   Container,
//   Grid,
//   TextField,
//   Typography,
//   Link,
//   MenuItem,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { useDispatch } from "react-redux";
// import { sendOtp } from "../../../redux/features/authSlice"; // Import sendOtp thunk

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="#">
//         EcoTrack
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function SendOtpForm() {
//   const theme = useTheme();
//   const navigate = useNavigate(); // Initialize navigate
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const data = Object.fromEntries(formData.entries());
//     console.log("Form Data:", data); // Debugging purposes

//     // Dispatch the sendOtp action
//     dispatch(sendOtp(data))
//       .then(() => {
//         // Navigate to /setnewpassword page when the OTP is sent successfully
//         navigate("/setnewpassword");
//       })
//       .catch((err) => {
//         console.error("Error sending OTP:", err);
//       });
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: `url(${back})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           filter: "brightness(30%)",
//           zIndex: -1,
//         }}
//       />
//       <Container component="main" maxWidth="md">
//         <CssBaseline />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             backgroundColor: "rgba(255, 255, 255, 0.39)",
//             padding: "2rem",
//             borderRadius: 4,
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography
//             component="h6"
//             variant="h4"
//             gutterBottom
//             sx={{ fontWeight: "bold" }}
//           >
//             Send OTP
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 2 }}
//           >
//             <Grid container spacing={2} justifyContent="center">
//               {/* Email */}
//               <Grid item xs={12} sm={8} md={6} lg={20}>
//                 <TextField
//                   fullWidth
//                   required
//                   name="email"
//                   label="Email Address"
//                   type="email"
//                   variant="outlined"
//                   InputProps={{
//                     sx: {
//                       borderRadius: "16px",
//                       backgroundColor: theme.palette.background.default,
//                     },
//                   }}
//                   sx={{
//                     width: "100%", // Full width on mobile, adjustable on desktop
//                     maxWidth: "600px", // Limit the max width on desktop (adjust as needed)
//                   }}
//                 />
//               </Grid>

//               {/* Role */}
//               <Grid item xs={12} sm={8} md={6} lg={20}>
//                 <TextField
//                   select
//                   fullWidth
//                   required
//                   name="role"
//                   label="Select Role"
//                   variant="outlined"
//                   InputProps={{
//                     sx: {
//                       borderRadius: "16px",
//                       backgroundColor: theme.palette.background.default,
//                     },
//                   }}
//                   sx={{
//                     width: "100%", // Full width on mobile, adjustable on desktop
//                     maxWidth: "600px", // Limit the max width on desktop (adjust as needed)
//                   }}
//                 >
//                   <MenuItem value="Student">Student</MenuItem>
//                   <MenuItem value="Warden">Warden</MenuItem>
//                   <MenuItem value="ChiefWarden">ChiefWarden</MenuItem>
//                 </TextField>
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 borderRadius: "16px",
//                 padding: "0.8rem",
//                 backgroundColor: theme.palette.primary.main,
//                 "&:hover": {
//                   backgroundColor: theme.palette.primary.dark,
//                 },
//                 width: "100%", // Full width button for better responsiveness
//               }}
//             >
//               Send OTP
//             </Button>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </Box>
//   );
// }
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
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../../redux/features/authSlice";

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

export default function SendOtpForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth); // Extract error state
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);

    dispatch(sendOtp(data))
      .unwrap()
      .then((response) => {
        setSuccessMessage(response.message); // Display success message
        if (!error) {
          navigate("/setnewpassword");
        }
      })
      .catch((err) => {
        console.error("Error sending OTP:", err);
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
            Send OTP
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
            {successMessage && (
              <Alert
                severity="success"
                sx={{ width: "100%", marginBottom: "1rem" }}
              >
                {successMessage}
              </Alert>
            )}
            <Grid container spacing={2} justifyContent="center">
              {/* Email */}
              <Grid item xs={12} sm={8} md={6} lg={20}>
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
                  sx={{
                    width: "100%", // Full width on mobile, adjustable on desktop
                    maxWidth: "600px", // Limit the max width on desktop (adjust as needed)
                  }}
                />
              </Grid>

              {/* Role */}
              <Grid item xs={12} sm={8} md={6} lg={20}>
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
                  sx={{
                    width: "100%", // Full width on mobile, adjustable on desktop
                    maxWidth: "600px", // Limit the max width on desktop (adjust as needed)
                  }}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Warden">Warden</MenuItem>
                  <MenuItem value="ChiefWarden">ChiefWarden</MenuItem>
                </TextField>
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
                  width: "100%", // Full width button for better responsiveness
                }}
              >
                Send OTP
              </Button>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
