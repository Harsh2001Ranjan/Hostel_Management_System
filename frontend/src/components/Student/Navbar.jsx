import React, { useState } from "react";
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

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();

  // State to manage dropdown visibility
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Handlers for menu open and close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: "#1F2937", // Matching Sidebar background color
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "0 1.5rem",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              marginRight: "1rem",
              color: "white",
              "&:hover": {
                color: theme.palette.primary.main,
              },
              transition: "color 0.3s",
            }}
          >
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </Box>

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap="1.5rem">
          {/* Profile Section */}
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
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                transition: "color 0.3s",
              }}
            >
              <AccountCircleOutlined sx={{ fontSize: "32px" }} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{
                    color: "white",
                    fontFamily: "'Poppins', sans-serif",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                    transition: "color 0.3s",
                  }}
                >
                  Username
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
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
                onClick={handleMenuClose}
                sx={{
                  padding: "0.8rem 1.2rem",
                  color: "#1F2937",
                  fontWeight: "500",
                  fontFamily: "'Poppins', sans-serif",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: "white",
                  },
                  "&:active": {
                    backgroundColor: theme.palette.primary.main,
                  },
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
