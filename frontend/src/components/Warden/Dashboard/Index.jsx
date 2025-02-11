import React from "react";
import { Box, Grid, Card, Typography, Paper } from "@mui/material";
import TotalStudents from "./TotalStudents";
import TimeTemperature from "./TimeTemperature";
import BarChart from "./BarChart";
import FoodWastageStats from "./FoodWastageStats";
// Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("Error in BarChart:", error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box
//           sx={{
//             padding: 2,
//             backgroundColor: "#ffebee",
//             color: "#d32f2f",
//             borderRadius: "8px",
//             textAlign: "center",
//           }}
//         >
//           <strong>⚠ Error loading Bar Chart</strong>
//         </Box>
//       );
//     }

//     return this.props.children;
//   }
// }

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

            {/* Wrap BarChart in ErrorBoundary */}
            <Box sx={{ mb: 2, width: "100%" }}>
              <BarChart />
              {/* <ErrorBoundary>
                <BarChart />
              </ErrorBoundary> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
