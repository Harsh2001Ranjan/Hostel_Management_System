// src/components/landingPage/FeaturesSection.jsx
import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";

import InsightsIcon from "@mui/icons-material/Insights";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { motion } from "framer-motion";

const features = [
  {
    title: "Seamless User Management",
    description:
      "Effortlessly manage student registrations, warden assignments, and chief warden roles with an intuitive and user-friendly interface designed for efficiency.",
    icon: <InsightsIcon sx={{ fontSize: 50, color: "#1E90FF" }} />,
  },
  {
    title: "Dynamic Role-Based Access",
    description:
      "Ensure secure and personalized experiences for students, wardens, and chief wardens with dynamic layouts and role-based access controls.",
    icon: <PsychologyIcon sx={{ fontSize: 50, color: "#FF5733" }} />,
  },
  {
    title: "Centralized Notice Board",
    description:
      "Wardens and chief wardens can create, manage, and share important notices targeted to specific groups or hostels, all in one place.",
    icon: <SmartToyIcon sx={{ fontSize: 50, color: "#DC3545" }} />,
  },
  {
    title: "Comprehensive Reporting and Analytics",
    description:
      "Chief wardens can access detailed reports on hostel management, student data, and system activities to make informed decisions.",
    icon: <PieChartIcon sx={{ fontSize: 50, color: "#28A745" }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Box
      id="features-section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#0D0D0D",
        color: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Our Outstanding Features
        </Typography>
        <Grid container spacing={6}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: "#1A1A1A",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
                    },
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2,
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      textAlign: "center",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    // variant="body1"
                    sx={{
                      color: "#B0B0B0",
                      lineHeight: "1.8",
                      textAlign: "center",
                      fontSize: "0.96rem",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
