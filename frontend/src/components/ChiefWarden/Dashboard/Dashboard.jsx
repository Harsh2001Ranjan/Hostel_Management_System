import React from "react";
import { Box, Grid } from "@mui/material";
import TotalStudents from "./TotalStudents";
import HostelRating from "./HostelRating";
import TimeTemperature from "./TimeTemperature";
import BarChart from "./BarChart";
import Teams from "./Teams";

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section: Overview Metrics */}
      <TotalStudents />

      {/* Middle Section: Hostel Ratings and Time/Temperature with Bar Chart */}
      <Grid container spacing={2} mt={2}>
        {/* Left Section: Hostel Ratings */}
        <Grid item xs={12} md={6}>
          <HostelRating />
        </Grid>

        {/* Right Section: Time and Temperature + Bar Chart */}
        <Grid item xs={12} md={6}>
          <TimeTemperature />
          <BarChart />
        </Grid>
      </Grid>

      {/* Bottom Section: Wardens */}
      <Box mt={2}>
        <Teams />
      </Box>
    </Box>
  );
};

export default Dashboard;
