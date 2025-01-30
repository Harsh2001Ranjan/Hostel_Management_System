import React from "react";
import { Card, Typography, Grid, Paper, CardMedia } from "@mui/material";
import { motion } from "framer-motion"; // Import Framer Motion
import breakfast from "../../../assets/breakfast2.jpg"; // Import Breakfast image
import snacks from "../../../assets/snacks1.jpg"; // Import Snacks image
import lunch from "../../../assets/dinner1.jpg"; // Import Lunch image
import dinner from "../../../assets/lunch.jpg"; // Import Dinner image

const FoodWastageStats = () => {
  const stats = [
    { label: "Breakfast", value: 30, image: breakfast },
    { label: "Lunch", value: 25, image: lunch },
  ];

  const statsBelow = [
    { label: "Snacks", value: 15, image: snacks },
    { label: "Dinner", value: 40, image: dinner },
  ];

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

      {/* Top Section: Breakfast & Lunch cards */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
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

      {/* Bottom Section: Snacks & Dinner cards */}
      <Grid container spacing={2} mt={2}>
        {statsBelow.map((stat, index) => (
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
