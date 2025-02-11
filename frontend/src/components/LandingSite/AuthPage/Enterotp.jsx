import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CssBaseline,
  Container,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyStudentAccount,
  resetVerifyState,
} from "../../../redux/features/authSlice"; // Ensure this path is correct
import back from "../../../assets/back.jpg"; // Your background image path

// Updated OTP component using an array for the OTP value
function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    if (targetInput) targetInput.focus();
  };

  const handleKeyDown = (event, currentIndex) => {
    if (event.key === "ArrowLeft" && currentIndex > 0) {
      event.preventDefault();
      focusInput(currentIndex - 1);
    } else if (event.key === "ArrowRight" && currentIndex < length - 1) {
      event.preventDefault();
      focusInput(currentIndex + 1);
    } else if (["Backspace", "Delete"].includes(event.key)) {
      event.preventDefault();
      if (value[currentIndex] === "" && currentIndex > 0) {
        focusInput(currentIndex - 1);
      } else {
        // Clear current digit
        const newOtp = [...value];
        newOtp[currentIndex] = "";
        onChange(newOtp);
      }
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    if (currentValue.length === 1) {
      const newOtp = [...value];
      newOtp[currentIndex] = currentValue;
      onChange(newOtp);
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <TextField
            value={value[index] || ""}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onChange={(event) => handleChange(event, index)}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            variant="outlined"
            inputProps={{
              style: {
                textAlign: "center",
                width: "40px",
                fontSize: "1.25rem",
              },
              maxLength: 1,
            }}
            sx={{
              flex: 1,
              minWidth: "35px",
              maxWidth: "50px",
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function EnterOTP() {
  // Initialize OTP as an array of 6 empty strings
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [email, setEmail] = React.useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract verification state from the auth slice
  const { verifyLoading, verifyError, verifySuccess } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otpString = otp.join("");

    dispatch(verifyStudentAccount({ email, otp: otpString }))
      .unwrap()
      .then((response) => {
        if (response.success) {
          // alert(response.message); // ✅ Show success message
          navigate("/login"); // ✅ Navigate only when success is true
        } else {
          throw new Error(response.message); // Force error handling
        }
      })
      .catch((err) => {
        console.error("Error in OTP verification:", err);
        //alert(err.message || "Verification failed"); // ✅ Show error message
      });
  };

  React.useEffect(() => {
    if (verifySuccess) {
      console.log("Verification successful. Navigating to /login");
      navigate("/login");
      dispatch(resetVerifyState());
    }
  }, [verifySuccess, navigate, dispatch]);

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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(209, 197, 197, 0.5)",
            padding: "2rem",
            borderRadius: 4,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            component="h6"
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Enter OTP
          </Typography>
          {/* Email Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              sx: {
                borderRadius: "16px",
                backgroundColor: theme.palette.background.default,
              },
            }}
          />
          {/* OTP Input */}
          <OTP
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={6}
          />

          {verifyError && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {verifyError}
            </Alert>
          )}

          {verifyLoading ? (
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
                "&:hover": { backgroundColor: theme.palette.primary.dark },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Submit OTP
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
