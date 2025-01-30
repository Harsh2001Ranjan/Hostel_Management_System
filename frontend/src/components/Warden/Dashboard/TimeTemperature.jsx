import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThermostatIcon from "@mui/icons-material/Thermostat";

const TimeAndTemperature = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const temperature = "25°C";

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      sx={{
        width: 300, // Reduced width for a compact look
        mx: "auto", // Center horizontally
        mt: 3, // Add some top margin
        borderRadius: 3,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #e3f2fd, #f9fafb)", // Gradient background
        p: 2,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#3b82f6",
            mb: 2,
          }}
        >
          Time & Temperature
        </Typography>

        {/* Time and Temperature Section */}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Time Section */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <AccessTimeIcon sx={{ fontSize: 30, color: "#3b82f6", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ color: "#64748b" }}>
              Current Time
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1e293b",
                mt: 0.5,
              }}
            >
              {currentTime}
            </Typography>
          </Grid>

          {/* Divider */}
          <Grid item xs={12}>
            <Divider sx={{ mx: 2, backgroundColor: "#d1d5db" }} />
          </Grid>

          {/* Temperature Section */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <ThermostatIcon sx={{ fontSize: 30, color: "#f87171", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ color: "#64748b" }}>
              Temperature
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1e293b",
                mt: 0.5,
              }}
            >
              {temperature}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TimeAndTemperature;
