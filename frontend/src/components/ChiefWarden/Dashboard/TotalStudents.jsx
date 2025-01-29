import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const OverviewMetrics = () => {
  const metrics = [
    { label: "Total Students", value: 500, color: "#3b82f6" },
    { label: "On Leave", value: 50, color: "#f87171" },
    { label: "Present", value: 450, color: "#10b981" },
  ];

  const [animatedValues, setAnimatedValues] = useState(
    metrics.map(() => 0) // Start all values from 0
  );

  useEffect(() => {
    metrics.forEach((metric, index) => {
      let start = 0;
      const step = Math.ceil(metric.value / 50); // Control speed of counting
      const interval = setInterval(() => {
        start += step;
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.min(start, metric.value);
          return newValues;
        });
        if (start >= metric.value) clearInterval(interval);
      }, 20); // Speed up counting to 20ms for faster effect
    });
  }, []);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={3}
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        borderRadius: 3,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card
            sx={{
              minWidth: 200,
              p: 2,
              borderRadius: 2,
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              textAlign: "center",
            }}
          >
            <CardContent>
              {/* Animated Circular Progress with multiple spins */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 1080 }} // Spins 3 times (360 * 3)
                transition={{ duration: 1.5, ease: "easeInOut" }} // Faster rotation speed
              >
                <CircularProgress
                  variant="determinate"
                  value={(animatedValues[index] / metrics[0].value) * 100}
                  size={90}
                  thickness={4.5}
                  sx={{
                    color: metric.color,
                    mb: 2,
                  }}
                />
              </motion.div>

              {/* Animated Metric Value */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                {animatedValues[index]}
              </Typography>

              {/* Metric Label */}
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#6b7280",
                  mt: 1,
                  textTransform: "uppercase",
                  fontWeight: "medium",
                }}
              >
                {metric.label}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
};

export default OverviewMetrics;
