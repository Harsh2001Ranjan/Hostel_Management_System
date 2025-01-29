import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const Wardens = () => {
  const wardens = [
    { name: "Warden A", hostelName: "Hostel A" },
    { name: "Warden B", hostelName: "Hostel B" },
    { name: "Warden C", hostelName: "Hostel C" },
  ];

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 3,
        boxShadow: 2,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 3,
          fontFamily: "'Roboto', sans-serif",
          textAlign: "center",
        }}
      >
        Wardens List
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {wardens.map((warden, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                  >
                    {warden.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                    {warden.hostelName}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wardens;
