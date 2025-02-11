import React, { useRef, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchHostelAverageRatings } from "../../../redux/features/Dashboard/chiefWarden/barChartSlice"; // Adjust the path as needed

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const ref = useRef(null); // Reference for detecting viewport entry
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const dispatch = useDispatch();

  // Retrieve ratings data from the Redux slice
  const { ratings, loading, error } = useSelector((state) => state.ratings);

  // Fetch the average ratings when the component mounts
  useEffect(() => {
    dispatch(fetchHostelAverageRatings());
  }, [dispatch]);

  // Map fetched data to labels and chart data.
  // If no data is available, use fallback placeholders.
  const labels =
    ratings && ratings.length > 0
      ? ratings.map((item) => item._id)
      : ["Hostel X", "Hostel B", "Hostel C"];
  const dataValues =
    ratings && ratings.length > 0
      ? ratings.map((item) => Number(item.averageRating.toFixed(2)))
      : [0, 0, 0];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average Rating",
        data: isInView ? dataValues : [0, 0, 0], // Reset values when out of view
        backgroundColor: ["#3f51b5", "#f50057", "#4caf50"],
        borderRadius: 10,
        hoverBackgroundColor: ["#303f9f", "#d50057", "#388e3c"],
        borderWidth: 1,
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
          color: "#f0f0f0",
        },
      },
      y: {
        min: 0,
        max: 5,
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box
      ref={ref} // Attach reference for viewport detection
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: 2,
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
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
        >
          Average Mess Ratings for Hostels
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
        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        ) : (
          <Bar data={data} options={options} />
        )}
      </motion.div>
    </Box>
  );
};

export default BarChart;
