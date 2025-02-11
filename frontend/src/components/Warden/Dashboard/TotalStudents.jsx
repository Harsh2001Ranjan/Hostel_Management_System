import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetrics } from "../../../redux/features/Dashboard/warden/stu_count"; // Import Redux action
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const OverviewMetrics = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.metrics);

  const [animatedValues, setAnimatedValues] = useState([]);

  useEffect(() => {
    dispatch(fetchMetrics()); // Fetch metrics on mount
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const { totalStudents, onLeave, present } = data;
      const metrics = [totalStudents, onLeave, present];

      metrics.forEach((value, index) => {
        let start = 0;
        const step = Math.ceil(value / 50);
        const interval = setInterval(() => {
          start += step;
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.min(start, value);
            return newValues;
          });
          if (start >= value) clearInterval(interval);
        }, 20);
      });
    }
  }, [data]);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" p={3}>
        {error}
      </Typography>
    );

  const metrics = [
    {
      label: "Total Students",
      value: data?.totalStudents || 0,
      color: "#3b82f6",
    },
    { label: "On Leave", value: data?.onLeave || 0, color: "#f87171" },
    { label: "Present", value: data?.present || 0, color: "#10b981" },
  ];

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
              {/* Animated Circular Progress */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 1080 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
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
