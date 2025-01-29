import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";

const MenuForm = () => {
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [breakfast, setBreakfast] = useState(["Pancakes", "Coffee"]);
  const [snack, setSnack] = useState(["Cookies", "Fruit"]);
  const [lunch, setLunch] = useState(["Sandwich", "Soup"]);
  const [dinner, setDinner] = useState(["Pasta", "Salad"]);
  const [specialmeal, setSpecialmeal] = useState("Grilled Chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulate fetching the user's hostel from the backend or session
  const hostel = "Hostel A"; // Replace with the actual value fetched based on the user's details

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const menuData = {
      dayOfWeek,
      breakfast,
      snack,
      lunch,
      dinner,
      specialmeal,
      hostel,
    };

    setTimeout(() => {
      setSuccess("Menu added successfully!");
      console.log("Menu submitted:", menuData);
      setLoading(false);
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setDayOfWeek("Monday");
    setBreakfast(["Pancakes", "Coffee"]);
    setSnack(["Cookies", "Fruit"]);
    setLunch(["Sandwich", "Soup"]);
    setDinner(["Pasta", "Salad"]);
    setSpecialmeal("Grilled Chicken");
  };

  const theme = useTheme();
  const customColor = "#798bb8"; // Custom color

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        border: `1px solid ${customColor}`,
        marginTop: 4, // Added top margin for spacing
      }}
    >
      <h2 style={{ textAlign: "center", color: customColor }}>Add Menu</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Day of Week</InputLabel>
          <Select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            label="Day of Week"
            sx={{
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
              "& .MuiInputBase-root": {
                backgroundColor: "#f1f5fa",
              },
              "& .MuiInputLabel-root": {
                color: customColor,
              },
            }}
          >
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Breakfast"
          value={breakfast.join(", ")}
          onChange={(e) => setBreakfast(e.target.value.split(", "))}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
            },
            "& .MuiInputLabel-root": {
              color: customColor,
            },
          }}
        />

        <TextField
          label="Snack"
          value={snack.join(", ")}
          onChange={(e) => setSnack(e.target.value.split(", "))}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
            },
            "& .MuiInputLabel-root": {
              color: customColor,
            },
          }}
        />

        <TextField
          label="Lunch"
          value={lunch.join(", ")}
          onChange={(e) => setLunch(e.target.value.split(", "))}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
            },
            "& .MuiInputLabel-root": {
              color: customColor,
            },
          }}
        />

        <TextField
          label="Dinner"
          value={dinner.join(", ")}
          onChange={(e) => setDinner(e.target.value.split(", "))}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
            },
            "& .MuiInputLabel-root": {
              color: customColor,
            },
          }}
        />

        <TextField
          label="Special Meal"
          value={specialmeal}
          onChange={(e) => setSpecialmeal(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5fa",
              borderRadius: 1,
            },
            "& .MuiInputLabel-root": {
              color: customColor,
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            backgroundColor: customColor,
            "&:hover": {
              backgroundColor: "#5f6a92",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Menu"}
        </Button>
      </form>

      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      {success && (
        <div style={{ color: "green", marginTop: 10 }}>{success}</div>
      )}
    </Box>
  );
};

export default MenuForm;
