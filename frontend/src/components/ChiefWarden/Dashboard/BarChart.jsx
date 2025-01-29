import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion"; // Import Framer Motion

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Hostel A", "Hostel B", "Hostel C"],
    datasets: [
      {
        label: "Average Rating",
        data: [4.5, 4.2, 4.7],
        backgroundColor: ["#3f51b5", "#f50057", "#4caf50"],
        borderRadius: 10, // Adds round corners for bars
        hoverBackgroundColor: ["#303f9f", "#d50057", "#388e3c"], // Hover effects
        borderWidth: 1, // Adds border to the bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Avg. Rating: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#f0f0f0", // Light grid color for modern design
        },
      },
      y: {
        min: 0,
        max: 5, // Rating scale from 0 to 5
        grid: {
          color: "#f0f0f0", // Light grid color for modern design
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: "#f5f5f5", // Light background color for the card
        borderRadius: "10px",
        boxShadow: 2, // Adds subtle shadow to the container
      }}
    >
      {/* Animate the title using Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 2,
            fontFamily: "'Roboto', sans-serif", // Use a modern font
          }}
        >
          Average Mess Ratings for Hostels
        </Typography>
      </motion.div>

      {/* Animate the Bar Chart using Framer Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Bar data={data} options={options} />
      </motion.div>
    </Box>
  );
};

export default BarChart;
