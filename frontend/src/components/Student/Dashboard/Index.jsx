import React from "react";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { GreetingSection } from "./GreetingSection"; // Import GreetingSection
import StudentDetails from "./StudentDetails"; // Import StudentDetails

// Mock student data
const studentName = "John Doe";

const Dashboard = () => {
  return (
    <Box sx={{ p: 4, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Greeting Section */}
      <GreetingSection studentName={studentName} />

      <Grid container spacing={4}>
        {/* Student Info Card */}
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <StudentDetails /> {/* Include the StudentDetails component */}
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
