import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  HomeOutlined,
  Summarize,
  ListAlt,
  AddCircle,
  Assignment,
  HowToVote,
  RestaurantMenu,
  Feedback,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    text: "Dashboard",
    route: "wardendashboard",
    icon: <HomeOutlined />, // Home icon for Dashboard
  },
  {
    text: "Leave Applications",
    icon: null, // Section heading (no icon)
  },
  {
    text: "Pending",
    route: "leave-applications/pending",
    icon: <ListAlt />, // List icon for Pending Leave Applications
  },
  {
    text: "Approved",
    route: "leave-applications/approved",
    icon: <Assignment />, // Assignment icon for Approved Leave Applications
  },
  {
    text: "Complaints",
    icon: null, // Section heading (no icon)
  },
  {
    text: "All Complaints",
    route: "complaints",
    icon: <Summarize />, // Summarize icon for Complaints
  },
  {
    text: "Notices",
    icon: null, // Section heading (no icon)
  },
  {
    text: "Create Notice",
    route: "notices/create",
    icon: <AddCircle />, // Add icon for Creating Notices
  },
  {
    text: "Chief Warden Notices",
    route: "notices/chiefwarden",
    icon: <Summarize />, // Summarize icon for Notices
  },
  {
    text: "Self Notices",
    route: "notices/warden",
    icon: <ListAlt />, // List icon for Warden's Notices
  },
  {
    text: "Mess",
    icon: null, // Section heading (no icon)
  },
  {
    text: "View Menu",
    route: "menu/view",
    icon: <RestaurantMenu />, // Restaurant Menu icon for viewing menu
  },
  {
    text: "Add Menu",
    route: "menu/add",
    icon: <AddCircle />, // Add icon for adding menu items
  },
  {
    text: "Create Poll",
    route: "polls/create",
    icon: <HowToVote />, // Voting icon for creating polls
  },
  {
    text: "My Polls",
    route: "polls",
    icon: <ListAlt />, // List icon for user-created polls
  },
  {
    text: "Current Feedback",
    route: "feedback/current",
    icon: <Feedback />, // Feedback icon for current feedback section
  },
];
const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          // sx={{
          //   width: drawerWidth,
          //   "& .MuiDrawer-paper": {
          //     color: theme.palette.primary.contrastText,
          //     backgroundColor: "#1F2937",
          //     borderWidth: isNonMobile ? 0 : "2px",
          //     width: drawerWidth,
          //     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          //     borderRadius: "10px",
          //   },
          // }}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.primary.contrastText,
              backgroundColor: "#1F2937", // Same as navbar
              borderWidth: 0,
              width: drawerWidth,
              position: "fixed", // Fixes the sidebar to stay aligned
              left: 0,
              top: 0,
              height: "100vh", // Full height to match navbar
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          <Box width="100%">
            {/* Logo Section */}
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.primary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "white",
                      fontSize: "2rem",
                    }}
                  >
                    RoomMate
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft
                      sx={{
                        fontSize: "2rem",
                        color: "white",
                      }}
                    />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, route, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        m: "1.75rem 0 0.75rem 3rem",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const isActive = `/${route}` === location.pathname; // Check if route is active

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => navigate(`/${route}`)} // Trigger navigation here
                      sx={{
                        backgroundColor: isActive ? "white" : "inherit",
                        "&:hover": {
                          backgroundColor: "white",
                          "& .MuiSvgIcon-root": {
                            color: "black",
                          },
                          "& .MuiTypography-root": {
                            color: "black",
                          },
                        },
                        transition: "background-color 0.3s",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1.8rem",
                          color: isActive ? "black" : "white", // Change color for active route
                          transition: "color 0.3s",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          sx: {
                            color: isActive ? "black" : "white", // Change color for active route
                            transition: "color 0.3s",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
