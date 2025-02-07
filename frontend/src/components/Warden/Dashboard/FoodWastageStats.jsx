import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { fetchFoodWastageStats } from "../../../redux/features/Mess/foodWastageSlice"; // Adjust the path as needed
import breakfast from "../../../assets/breakfast2.jpg";
import snacks from "../../../assets/snacks1.jpg";
import lunch from "../../../assets/dinner1.jpg";
import dinner from "../../../assets/lunch.jpg";

const FoodWastageStats = () => {
  const dispatch = useDispatch();
  const { loading, stats, error } = useSelector((state) => state.meal);

  useEffect(() => {
    dispatch(fetchFoodWastageStats());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (!stats) {
    return null;
  }

  // Prepare stats data based on the keys returned from your backend
  const statsData = [
    { label: "Breakfast", value: stats.breakfastNotSkipped, image: breakfast },
    { label: "Lunch", value: stats.lunchNotSkipped, image: lunch },
    { label: "Snacks", value: stats.snackNotSkipped, image: snacks },
    { label: "Dinner", value: stats.dinnerNotSkipped, image: dinner },
  ];

  // Split stats into two groups for layout (Top: Breakfast & Lunch, Bottom: Snacks & Dinner)
  const topStats = statsData.filter(
    (item) => item.label === "Breakfast" || item.label === "Lunch"
  );
  const bottomStats = statsData.filter(
    (item) => item.label === "Snacks" || item.label === "Dinner"
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        height: "97.9%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "17px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", flexShrink: 0 }}
        >
          Food Wastage Statistics
        </Typography>
      </motion.div>

      {/* Top Section: Breakfast & Lunch */}
      <Grid container spacing={2}>
        {topStats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  height: "100%",
                  borderRadius: "12px",
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  alt={stat.label}
                  image={stat.image}
                  sx={{
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="body1" sx={{ flex: 1, mt: 2 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ flexShrink: 0 }}>
                  {stat.value} students
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section: Snacks & Dinner */}
      <Grid container spacing={2} mt={2}>
        {bottomStats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  height: "100%",
                  borderRadius: "12px",
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  alt={stat.label}
                  image={stat.image}
                  sx={{
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="body1" sx={{ flex: 1, mt: 2 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ flexShrink: 0 }}>
                  {stat.value} students
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default FoodWastageStats;
