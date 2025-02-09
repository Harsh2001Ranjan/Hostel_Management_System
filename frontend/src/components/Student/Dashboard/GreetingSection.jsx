import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { WavingHand } from "@mui/icons-material";

export const GreetingSection = () => {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // Retrieve user information from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setStudentName(user.name);
    }
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Hello, Name, and Waving Icon Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ fontWeight: "bold" }}
        >
          Hello,
        </Typography>
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ fontWeight: "normal" }}
        >
          {studentName || "Guest"}
        </Typography>
        <WavingHand
          sx={{ fontSize: 40, color: "gold", transform: "rotate(-10deg)" }}
        />
      </Box>

      {/* Welcome Message Below */}
      <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
        Nice to have you back, what an exciting day!
      </Typography>
    </Box>
  );
};
