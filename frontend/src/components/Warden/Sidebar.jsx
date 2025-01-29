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
  Person,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    text: "Dashboard",
    route: "wardendashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Leave Applications",
    icon: null,
  },
  {
    text: "Pending Leave Applications",
    route: "leave-applications/pending",
    icon: <ListAlt />,
  },
  {
    text: "Approved Leave Applications",
    route: "leave-applications/approved",
    icon: <Assignment />,
  },
  {
    text: "Complaints",
    icon: null,
  },
  {
    text: "All Complaints",
    route: "complaints",
    icon: <Summarize />,
  },
  {
    text: "Notices",
    icon: null,
  },
  {
    text: "Create Notice",
    route: "notices/create",
    icon: <AddCircle />,
  },
  {
    text: "Chief Warden Notices",
    route: "notices/chiefwarden",
    icon: <ListAlt />,
  },
  {
    text: "Self Notices",
    route: "notices/warden",
    icon: <ListAlt />,
  },
  {
    text: "Mess",
    icon: null,
  },
  {
    text: "Mess Menu",
    icon: null,
  },
  { text: "View Menu", route: "menu/view", icon: <ListAlt /> },
  { text: "Add Menu", route: "menu/add", icon: <AddCircle /> },
  {
    text: "Polls",
    icon: null,
  },
  { text: "Create Poll", route: "polls/create", icon: <AddCircle /> },
  { text: "My Polls", route: "polls", icon: <ListAlt /> },
  {
    text: "Feedbacks",
    icon: null,
  },
  { text: "Current Feedback", route: "feedback/current", icon: <ListAlt /> },
  { text: "Analytics", route: "feedback/analytics", icon: <Summarize /> },
  {
    text: "Food Wastage Control",
    icon: null,
  },
  { text: "Statistics", route: "/food-wastage-stats", icon: <Summarize /> },
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

          {/* Profile Section */}
          <Box marginBottom="1.5rem" bottom="2px">
            <Divider />
            <Box
              display="flex"
              justifyContent={"flex-start"}
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0 3rem"
            >
              <Person
                sx={{
                  color: "white",
                  fontSize: "50px",
                  "&:hover": {
                    color: "black", // Profile icon turns black on hover
                  },
                  transition: "color 0.3s",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="1rem"
                  sx={{
                    color: "white",
                    fontFamily: "'Poppins', sans-serif",
                    "&:hover": {
                      color: "black", // Profile text turns black on hover
                    },
                    transition: "color 0.3s",
                  }}
                >
                  Username
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
