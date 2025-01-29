import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CssBaseline,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import back from "../../../assets/back.jpg"; // Your background image path

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const handleKeyDown = (event, currentIndex) => {
    // Handling Arrow navigation and Backspace/Delete key
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
        onChange(
          value.slice(0, currentIndex) + "" + value.slice(currentIndex + 1)
        );
      }
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    if (currentValue.length === 1) {
      onChange(
        value.slice(0, currentIndex) +
          currentValue +
          value.slice(currentIndex + 1)
      );
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
            value={value[index] ?? ""}
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
              maxWidth: "50px", // Adjust to ensure the boxes stay within view
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
  value: PropTypes.string.isRequired,
};

export default function OTPInput() {
  const [otp, setOtp] = React.useState("");
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("OTP Submitted:", otp);

    // Here you can add the logic to verify OTP, and if successful, navigate to the new page
    navigate("/login"); // Navigate to /setnewpassword after OTP is submitted
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
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font size
            }}
          >
            Enter OTP
          </Typography>
          <OTP
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={6}
          />
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
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive font size
            }}
            onClick={handleSubmit}
          >
            Submit OTP
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
