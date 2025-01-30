import React from "react";
import { Box, Grid, Card, Typography, Paper } from "@mui/material";
import TotalStudents from "./TotalStudents";
import TimeTemperature from "./TimeTemperature";
import BarChart from "./BarChart";
import FoodWastageStats from "./FoodWastageStats";

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section: Total Students */}
      <TotalStudents />

      {/* Middle Section: Time and Temperature + Bar Chart + Food Wastage Stats */}
      <Grid container spacing={2} mt={2}>
        {/* Left Section: Food Wastage Statistics */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Food Wastage Statistics */}
            <FoodWastageStats />
          </Box>
        </Grid>

        {/* Right Section: Time and Temperature + Bar Chart */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Time and Temperature at the top */}
            <Box sx={{ mb: 2, width: "100%" }}>
              <TimeTemperature />
            </Box>

            {/* Bar Chart just below Time and Temperature */}
            <Box sx={{ mb: 2, width: "100%" }}>
              <BarChart />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
