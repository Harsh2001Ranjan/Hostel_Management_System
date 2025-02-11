import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  LinearProgress,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchFeedbackAnalytics } from "../../../redux/features/Dashboard/chiefWarden/hostelWiseRating";

const HostelRatings = () => {
  const dispatch = useDispatch();
  const {
    data: analytics,
    loading,
    error,
  } = useSelector((state) => state.feedbackAnalytics);

  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(fetchFeedbackAnalytics());
  }, [dispatch]);

  useEffect(() => {
    let scrollInterval;
    if (!isHovered) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            top: 1,
            behavior: "smooth",
          });
        }
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const getRatingPercentage = (rating) => (Number(rating) / 5) * 100;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f9fafb, #e5e7eb)",
        borderRadius: 3,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "80vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
      ref={scrollContainerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography
        variant="h5"
        mb={3}
        sx={{ fontWeight: "bold", color: "#1f2937" }}
      >
        Hostel-Wise Mess Ratings
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : analytics && analytics.length === 0 ? (
        <Typography>No analytics data available.</Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent="center"
          sx={{ maxWidth: 1200 }}
        >
          {analytics &&
            analytics.map((hostel, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card
                  sx={{
                    minWidth: 300,
                    maxWidth: 350,
                    borderRadius: 3,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, color: "#111827" }}
                    >
                      {hostel.hostelName}
                    </Typography>

                    {hostel.averageRatings &&
                      Object.entries(hostel.averageRatings).map(
                        ([category, rating]) => (
                          <Box key={category} mb={2}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  textTransform: "capitalize",
                                  color: "#6b7280",
                                  fontWeight: "bold",
                                }}
                              >
                                {category.replace(/([A-Z])/g, " $1")}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#10b981", fontWeight: "bold" }}
                                >
                                  {rating}
                                </Typography>
                                <Star sx={{ fontSize: 16, color: "#f59e0b" }} />
                              </Box>
                            </Box>

                            <LinearProgress
                              variant="determinate"
                              value={getRatingPercentage(rating)}
                              sx={{
                                mt: 1,
                                height: 8,
                                borderRadius: 5,
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor:
                                    rating >= 4.5
                                      ? "#10b981"
                                      : rating >= 4
                                      ? "#3b82f6"
                                      : "#f87171",
                                },
                              }}
                            />
                          </Box>
                        )
                      )}
                    {index < analytics.length - 1 && <Divider sx={{ my: 2 }} />}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default HostelRatings;
