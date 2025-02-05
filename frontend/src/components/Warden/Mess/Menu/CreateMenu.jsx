import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addMenu,
  clearMessages,
} from "../../../../redux/features/Mess/addMenuSlice";

const MenuForm = () => {
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [breakfast, setBreakfast] = useState(["Pancakes", "Coffee"]);
  const [snack, setSnack] = useState(["Cookies", "Fruit"]);
  const [lunch, setLunch] = useState(["Sandwich", "Soup"]);
  const [dinner, setDinner] = useState(["Pasta", "Salad"]);
  const [specialmeal, setSpecialmeal] = useState("Grilled Chicken");

  const dispatch = useDispatch();

  // Use Redux state for loading, message, and error
  const { loading, message, error } = useSelector((state) => state.menu);

  const handleSubmit = (e) => {
    e.preventDefault();
    const menuData = {
      dayOfWeek,
      breakfast,
      snack,
      lunch,
      dinner,
      specialmeal,
    };
    dispatch(addMenu(menuData));
  };

  // Clear messages after a delay
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  // Optionally reset the form on success
  const resetForm = () => {
    setDayOfWeek("Monday");
    setBreakfast(["Pancakes", "Coffee"]);
    setSnack(["Cookies", "Fruit"]);
    setLunch(["Sandwich", "Soup"]);
    setDinner(["Pasta", "Salad"]);
    setSpecialmeal("Grilled Chicken");
  };

  useEffect(() => {
    if (message) {
      resetForm();
    }
  }, [message]);

  const theme = useTheme();
  const customColor = "#798bb8";

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
        marginTop: 4,
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
      {message && (
        <div style={{ color: "green", marginTop: 10 }}>{message}</div>
      )}
    </Box>
  );
};

export default MenuForm;
