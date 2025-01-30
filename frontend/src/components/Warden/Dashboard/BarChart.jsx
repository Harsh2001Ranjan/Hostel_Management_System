import React, { useMemo, useRef } from "react";
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
import { motion, useInView } from "framer-motion";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ title = "Mess Ratings", chartData }) => {
  const ref = useRef(null); // Reference for the chart container
  const isInView = useInView(ref, { once: false, margin: "-50px" }); // Detects viewport entry/exit

  // Default chart data if none is provided
  const defaultData = {
    labels: ["Food Quality", "Service", "Cleanliness"],
    datasets: [
      {
        label: "Ratings",
        data: isInView ? [3, 4.2, 4.7] : [0, 0, 0], // Reset to zero when out of view
        backgroundColor: ["#3f51b5", "#f50057", "#4caf50"],
        borderRadius: 8,
        hoverBackgroundColor: ["#303f9f", "#d50057", "#388e3c"],
        borderWidth: 1.5,
      },
    ],
  };

  // Chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            font: {
              family: "'Roboto', sans-serif",
              weight: "bold",
              size: 14,
            },
            color: "#444",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleFont: { size: 14 },
          bodyFont: { size: 12 },
          bodyColor: "#fff",
          callbacks: {
            label: (tooltipItem) => `Rating: ${tooltipItem.raw}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: "#e0e0e0", drawBorder: false },
          ticks: { font: { size: 12, weight: "bold" }, color: "#555" },
        },
        y: {
          min: 0,
          max: 5,
          grid: { color: "#e0e0e0", drawBorder: false },
          ticks: {
            stepSize: 1,
            font: { size: 12, weight: "bold" },
            color: "#555",
          },
        },
      },
      animation: {
        duration: 1000, // Animation duration
        easing: "easeInOutQuart",
      },
    }),
    []
  );

  return (
    <Box
      ref={ref} // Attach the reference for viewport detection
      sx={{
        height: "100%",
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 2,
            fontFamily: "'Roboto', sans-serif",
          }}
          aria-label={title}
        >
          {title}
        </Typography>
      </motion.div>

      {/* Animated Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={
          isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }
        }
        transition={{ duration: 1, delay: 0.2 }}
        style={{ width: "100%", height: "300px", transformOrigin: "bottom" }}
      >
        <Bar data={chartData || defaultData} options={chartOptions} />
      </motion.div>
    </Box>
  );
};

export default BarChart;
