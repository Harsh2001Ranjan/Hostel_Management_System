import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Fastfood,
  Cake,
  BreakfastDining,
  DinnerDining,
  LocalDining,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  viewMenu,
  clearMessages,
} from "../../../redux/features/Mess/viewMenuSlice";

// Reusable component to display each menu category
const MenuCard = ({ title, items, Icon, iconColor, gradientColor }) => (
  <Card
    sx={{
      maxWidth: 345,
      boxShadow: 5,
      borderRadius: "16px",
      background: `linear-gradient(135deg, ${gradientColor[0]}, ${gradientColor[1]})`,
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
      <Icon sx={{ fontSize: 80, color: iconColor }} />
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
        {title}
      </Typography>
      <Divider sx={{ my: 2, bgcolor: "#007bff" }} />
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <Typography
            key={index}
            sx={{ fontSize: "1rem", color: "#555", mb: 0.5 }}
          >
            {item}
          </Typography>
        ))
      ) : (
        <Typography sx={{ fontSize: "1rem", color: "#aaa" }}>
          No items available
        </Typography>
      )}
    </CardContent>
  </Card>
);

const MenuDisplay = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Access Redux state from viewMenuSlice
  const { loading, menu, message, error } = useSelector(
    (state) => state.viewMenu
  );

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleFetchMenu = () => {
    // Dispatch the viewMenu action with the selected day. If empty, the backend will use the current day.
    dispatch(viewMenu(selectedDay || ""));
  };

  // Clear any messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 3, color: "#007bff" }}
      >
        Menu for {selectedDay || "Today"}
      </Typography>

      {/* Dropdown for selecting day */}
      <TextField
        select
        label="Select Day of the Week"
        fullWidth
        value={selectedDay}
        onChange={handleDayChange}
        required
        sx={{
          mb: 3,
          "& .MuiInputLabel-root": { color: "#007bff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#007bff" },
            "&:hover fieldset": { borderColor: "#0056b3" },
            "&.Mui-focused fieldset": { borderColor: "#0056b3" },
          },
        }}
      >
        {daysOfWeek.map((day, index) => (
          <MenuItem key={index} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleFetchMenu}
        sx={{
          bgcolor: "#007bff",
          color: "#fff",
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#0056b3",
            boxShadow: "0px 4px 8px rgba(0, 123, 255, 0.3)",
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Fetch Menu"}
      </Button>

      {message && (
        <Typography sx={{ mt: 2, color: "green", textAlign: "center" }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 2, color: "red", textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {/* Breakfast Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Breakfast"
            items={menu ? menu.breakfast : []}
            Icon={BreakfastDining}
            iconColor="#f57c00"
            gradientColor={["#f3f4f6", "#ffffff"]}
          />
        </Grid>

        {/* Snack Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Snack"
            items={menu ? menu.snack : []}
            Icon={Cake}
            iconColor="#8e24aa"
            gradientColor={["#f3f4f6", "#ffffff"]}
          />
        </Grid>

        {/* Lunch Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Lunch"
            items={menu ? menu.lunch : []}
            Icon={Fastfood}
            iconColor="#4caf50"
            gradientColor={["#f3f4f6", "#ffffff"]}
          />
        </Grid>

        {/* Dinner Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Dinner"
            items={menu ? menu.dinner : []}
            Icon={DinnerDining}
            iconColor="#3f51b5"
            gradientColor={["#f3f4f6", "#ffffff"]}
          />
        </Grid>
      </Grid>

      {/* Special Meal Section */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#333" }}>
          Special Meal for the Day
        </Typography>
        <Card
          sx={{
            maxWidth: 345,
            mx: "auto",
            boxShadow: 5,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 12px 24px rgba(0, 123, 255, 0.3)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <LocalDining sx={{ fontSize: 80, color: "#FF5722" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 1, fontWeight: 600, color: "#333" }}
            >
              {menu ? menu.specialmeal : "No special meal available"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MenuDisplay;
