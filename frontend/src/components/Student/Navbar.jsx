import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice"; // Adjust the path as needed

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  // State to store the user's real name
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user information from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, setIsSidebarOpen]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const BASE_URL = "http://localhost:4000/api";
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/students/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        // Dispatch logout action
        dispatch(logout());

        // Redirect to login page or another appropriate page
        window.location.href = "/login";
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: "#1F2937",
        boxShadow: "none",
        padding: "0 1.5rem",
        borderRadius: "0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              marginRight: "1rem",
              color: "white",
              "&:hover": { color: theme.palette.primary.main },
              transition: "color 0.3s",
            }}
          >
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            RoomMate
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="1.5rem">
          <Box display="flex" alignItems="center">
            <Button
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                color: "white",
                "&:hover": { color: theme.palette.primary.main },
                transition: "color 0.3s",
              }}
            >
              <AccountCircleOutlined sx={{ fontSize: "32px" }} />
              {!isMobile && (
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{
                      color: "white",
                      fontFamily: "'Poppins', sans-serif",
                      "&:hover": { color: theme.palette.primary.main },
                      transition: "color 0.3s",
                    }}
                  >
                    {userName}
                  </Typography>
                </Box>
              )}
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  minWidth: "150px",
                  overflow: "hidden",
                },
              }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  padding: "0.8rem 1.2rem",
                  color: "#1F2937",
                  fontWeight: "500",
                  fontFamily: "'Poppins', sans-serif",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: "white",
                  },
                  "&:active": { backgroundColor: theme.palette.primary.main },
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
