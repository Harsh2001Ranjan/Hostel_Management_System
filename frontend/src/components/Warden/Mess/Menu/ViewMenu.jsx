import React, { useState } from "react";
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
} from "@mui/material";
import {
  Fastfood,
  Cake,
  BreakfastDining,
  DinnerDining,
  LocalDining,
} from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; // Add this import for Alert
const MenuCard = ({ title, items, Icon, iconColor, gradientColor }) => (
  <Card
    sx={{
      maxWidth: 345,
      boxShadow: 5,
      borderRadius: "16px",
      bgcolor: `linear-gradient(135deg, ${gradientColor[0]}, ${gradientColor[1]})`,
      m: 2,
      height: "100%",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 12px 24px rgba(121, 139, 184, 0.3)",
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
      <Divider sx={{ my: 2, bgcolor: "#798bb8" }} />
      {items.length > 0 ? (
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
  const [menuData, setMenuData] = useState({
    breakfast: ["Pancakes", "Toast", "Coffee"],
    snack: ["Cookies", "Fruit", "Chips"],
    lunch: ["Grilled Chicken", "Salad", "Rice"],
    dinner: ["Pasta", "Garlic Bread", "Soup"],
    specialmeal: "Vegetarian Feast",
  });

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [formData, setFormData] = useState({
    breakfast: "",
    snack: "",
    lunch: "",
    dinner: "",
    specialmeal: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayChange = (event) => {
    setDayOfWeek(event.target.value);
  };

  const handleFetchMenu = () => {
    console.log(`Fetching menu for: ${dayOfWeek}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleUpdateMenu = () => {
    console.log(
      "Updating menu for:",
      dayOfWeek,
      "with the following data:",
      formData
    );

    // Update only the menu for the selected day
    setMenuData((prevData) => ({
      ...prevData,
      [dayOfWeek.toLowerCase()]: {
        breakfast:
          formData.breakfast.split(",") ||
          prevData[dayOfWeek.toLowerCase()].breakfast,
        snack:
          formData.snack.split(",") || prevData[dayOfWeek.toLowerCase()].snack,
        lunch:
          formData.lunch.split(",") || prevData[dayOfWeek.toLowerCase()].lunch,
        dinner:
          formData.dinner.split(",") ||
          prevData[dayOfWeek.toLowerCase()].dinner,
        specialmeal:
          formData.specialmeal || prevData[dayOfWeek.toLowerCase()].specialmeal,
      },
    }));

    setNotificationOpen(true); // Show the success notification
  };
  //   const handleUpdateMenu = async () => {
  //     // Construct formData with the correct selected day
  //     const updatedMenu = {
  //       dayOfWeek,
  //       breakfast: formData.breakfast.split(","),
  //       snack: formData.snack.split(","),
  //       lunch: formData.lunch.split(","),
  //       dinner: formData.dinner.split(","),
  //       specialmeal: formData.specialmeal,
  //     };

  //     try {
  //       // Send request to backend to update the menu for the selected day
  //       const response = await axios.post('/api/updateMenu', updatedMenu);
  //       console.log('Menu updated successfully', response.data);
  //       setNotificationOpen(true);
  //     } catch (error) {
  //       console.error('Error updating menu', error);
  //     }
  //   };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 3, color: "#798bb8" }}
      >
        Menu for {dayOfWeek || "Today"}
      </Typography>

      {/* Dropdown to select day */}
      <TextField
        select
        label="Select Day of the Week"
        fullWidth
        value={dayOfWeek}
        onChange={handleDayChange}
        required
        sx={{
          mb: 3,
          "& .MuiInputLabel-root": {
            color: "#798bb8",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#798bb8",
            },
            "&:hover fieldset": {
              borderColor: "#5a6c94",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5a6c94",
            },
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
          bgcolor: "#798bb8",
          color: "#fff",
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#5a6c94",
            boxShadow: "0px 4px 8px rgba(121, 139, 184, 0.3)",
          },
        }}
      >
        Fetch Menu
      </Button>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {/* Breakfast Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Breakfast"
            items={menuData.breakfast}
            Icon={BreakfastDining}
            iconColor="#ff9800"
            gradientColor={["#e9edf5", "#ffffff"]}
          />
        </Grid>

        {/* Snack Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Snack"
            items={menuData.snack}
            Icon={Cake}
            iconColor="#ff4081"
            gradientColor={["#e9edf5", "#ffffff"]}
          />
        </Grid>

        {/* Lunch Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Lunch"
            items={menuData.lunch}
            Icon={Fastfood}
            iconColor="#4caf50"
            gradientColor={["#e9edf5", "#ffffff"]}
          />
        </Grid>

        {/* Dinner Card */}
        <Grid item xs={12} sm={6} md={3}>
          <MenuCard
            title="Dinner"
            items={menuData.dinner}
            Icon={DinnerDining}
            iconColor="#3f51b5"
            gradientColor={["#e9edf5", "#ffffff"]}
          />
        </Grid>
      </Grid>

      {/* Special Meal */}
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
            bgcolor: `linear-gradient(135deg, #e9edf5, #ffffff)`,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 12px 24px rgba(121, 139, 184, 0.3)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 3 }}>
            <LocalDining sx={{ fontSize: 80, color: "#d32f2f" }} />
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
              {menuData.specialmeal}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Card
          sx={{
            maxWidth: "800px",
            mx: "auto",
            boxShadow: 5,
            borderRadius: "16px",
            p: 3,
            bgcolor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2, color: "#4caf50" }}
          >
            Update Menu
          </Typography>
          <Box
            component="form"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              label="Breakfast (comma-separated)"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Snack (comma-separated)"
              name="snack"
              value={formData.snack}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Lunch (comma-separated)"
              name="lunch"
              value={formData.lunch}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Dinner (comma-separated)"
              name="dinner"
              value={formData.dinner}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Special Meal"
              name="specialmeal"
              value={formData.specialmeal}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdateMenu}
            sx={{
              mt: 3,
              mx: "auto",
              display: "block",
              bgcolor: "#4caf50",
              color: "#fff",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#388e3c",
              },
            }}
          >
            Update Menu
          </Button>
        </Card>

        {/* Snackbar for success notification */}
        <Snackbar
          open={notificationOpen}
          autoHideDuration={3000}
          onClose={() => setNotificationOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setNotificationOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Menu updated successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MenuDisplay;
