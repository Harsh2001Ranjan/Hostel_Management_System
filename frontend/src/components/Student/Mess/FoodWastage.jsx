import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  BreakfastDining,
  Cake,
  LunchDining,
  DinnerDining,
} from "@mui/icons-material";
import { markMealNotSkipped } from "../../../redux/features/Mess/foodWastageSlice"; // Adjust the path as needed

const MarkMealNotSkipped = () => {
  const [meals, setMeals] = useState({
    breakfast: false,
    snack: false,
    lunch: false,
    dinner: false,
  });

  const [localMessage, setLocalMessage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.meal);

  const handleMealToggle = (mealType) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: !prevMeals[mealType],
    }));
  };

  const handleMarkMeals = async () => {
    const markedMeals = Object.keys(meals).filter((meal) => meals[meal]); // Get selected meals

    if (markedMeals.length === 0) {
      setLocalMessage("No meals selected to mark!");
      return;
    }

    try {
      // Dispatching only the array of meals
      const result = await dispatch(
        markMealNotSkipped({ meals: markedMeals })
      ).unwrap();
      setLocalMessage(result.message);
    } catch (err) {
      setLocalMessage(err.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4, color: "#007bff" }}
      >
        Mark Meal that will be Skipped
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {["breakfast", "snack", "lunch", "dinner"].map((meal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 5,
                borderRadius: "16px",
                bgcolor: "linear-gradient(135deg, #f3f4f6, #ffffff)",
                m: 2,
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 24px rgba(0, 123, 255, 0.3)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                {meal === "breakfast" && (
                  <BreakfastDining sx={{ fontSize: 80, color: "#f57c00" }} />
                )}
                {meal === "snack" && (
                  <Cake sx={{ fontSize: 80, color: "#8e24aa" }} />
                )}
                {meal === "lunch" && (
                  <LunchDining sx={{ fontSize: 80, color: "#4caf50" }} />
                )}
                {meal === "dinner" && (
                  <DinnerDining sx={{ fontSize: 80, color: "#3f51b5" }} />
                )}

                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mt: 2,
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#333",
                  }}
                >
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Typography>

                <Divider sx={{ my: 2, bgcolor: "#007bff" }} />

                <Typography
                  sx={{ fontSize: "1rem", color: "#555", mb: 2 }}
                  component="p"
                >
                  Example: {meal.charAt(0).toUpperCase() + meal.slice(1)} Menu
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={meals[meal]}
                      onChange={() => handleMealToggle(meal)}
                      color="primary"
                    />
                  }
                  label="Select Meal"
                  sx={{ color: "#007bff", fontWeight: 600 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleMarkMeals}
        disabled={loading}
        sx={{
          bgcolor: "#007bff",
          color: "#fff",
          py: 1.5,
          fontSize: "1.1rem",
          fontWeight: 700,
          borderRadius: "12px",
          mt: 3,
          "&:hover": {
            bgcolor: "#0056b3",
            boxShadow: "0px 6px 12px rgba(0, 123, 255, 0.4)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={28} sx={{ color: "#fff" }} />
        ) : (
          "Mark "
        )}
      </Button>

      {localMessage && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
            {localMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MarkMealNotSkipped;
