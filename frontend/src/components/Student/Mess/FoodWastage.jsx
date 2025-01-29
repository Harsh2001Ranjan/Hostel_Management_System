import React, { useState } from "react";
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

const MarkMealNotSkipped = () => {
  const [meals, setMeals] = useState({
    breakfast: true,
    snack: true,
    lunch: true,
    dinner: true,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleMealToggle = (mealType) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: !prevMeals[mealType],
    }));
  };

  const handleMarkMeals = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    setTimeout(() => {
      const markedMeals = Object.keys(meals).filter((meal) => meals[meal]);
      if (markedMeals.length > 0) {
        setSuccessMessage(`${markedMeals.join(", ")} marked as not skipped!`);
      } else {
        setErrorMessage("No meals selected to mark!");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4, color: "#007bff" }}
      >
        Mark Meal as Not Skipped
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
                {/* Meal Icon */}
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

                {/* Meal Title */}
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

                {/* Meal Description */}
                <Typography
                  sx={{ fontSize: "1rem", color: "#555", mb: 2 }}
                  component="p"
                >
                  Example: {meal.charAt(0).toUpperCase() + meal.slice(1)} Menu
                </Typography>

                {/* Checkbox */}
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

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleMarkMeals}
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
          "Mark Selected Meals Not Skipped"
        )}
      </Button>

      {/* Success or Error Messages */}
      {successMessage && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
            {successMessage}
          </Typography>
        </Box>
      )}
      {errorMessage && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#F44336", fontWeight: 600 }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MarkMealNotSkipped;
