// import React from "react";
// import {
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   HomeOutlined,
//   Summarize,
//   TaskAlt,
//   Webhook,
//   Diversity2,
//   Restaurant,
//   NoMeals,
//   NoteAdd,
//   ///////can be used
//   //MenuBook,
//   //Fastfood,
//   //MoveUp,

//   /////
//   NoteAlt,
//   FlutterDash,
//   ListAlt,
//   AddCircle,
//   Assignment,
//   Person,
// } from "@mui/icons-material";

// import FlexBetween from "./FlexBetween";
// import { useNavigate, useLocation } from "react-router-dom";

// const navItems = [
//   {
//     text: "Dashboard",
//     route: "chiefdashboard",
//     icon: <HomeOutlined />,
//   },
//   {
//     text: "Complaints",
//     icon: null,
//   },
//   {
//     text: "Complaints",
//     route: "reportcomplaint",
//     icon: <NoteAlt />,
//   },

//   {
//     text: "Notice",
//     icon: null,
//   },
//   {
//     text: "Create Notice",
//     route: "createnotice",
//     icon: <FlutterDash />,
//   },
//   {
//     text: "View Notice",
//     route: "chiefnotices",
//     icon: <FlutterDash />,
//   },
//   {
//     text: "Create Warden",
//     icon: null,
//   },
//   {
//     text: "Create",
//     route: "addwarden",
//     icon: <FlutterDash />,
//   },
// ];

// const Sidebar = ({
//   drawerWidth,
//   isSidebarOpen,
//   setIsSidebarOpen,
//   isNonMobile,
// }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   return (
//     <Box component="nav">
//       {isSidebarOpen && (
//         <Drawer
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           variant="persistent"
//           anchor="left"
//           // sx={{
//           //   width: drawerWidth,
//           //   "& .MuiDrawer-paper": {
//           //     color: theme.palette.primary.contrastText,
//           //     backgroundColor: "#1F2937",
//           //     borderWidth: isNonMobile ? 0 : "2px",
//           //     width: drawerWidth,
//           //     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
//           //     borderRadius: "10px",
//           //   },
//           // }}
//           sx={{
//             width: drawerWidth,
//             "& .MuiDrawer-paper": {
//               color: theme.palette.primary.contrastText,
//               backgroundColor: "#1F2937", // Same as navbar
//               borderWidth: 0,
//               width: drawerWidth,
//               position: "fixed", // Fixes the sidebar to stay aligned
//               left: 0,
//               top: 0,
//               height: "100vh", // Full height to match navbar
//               transition: "width 0.3s ease-in-out",
//             },
//           }}
//         >
//           <Box width="100%">
//             {/* Logo Section */}
//             <Box m="1.5rem 2rem 2rem 3rem">
//               <FlexBetween color={theme.palette.primary.main}>
//                 <Box display="flex" alignItems="center" gap="0.5rem">
//                   <Typography
//                     variant="h3"
//                     fontWeight="bold"
//                     sx={{
//                       fontFamily: "'Poppins', sans-serif",
//                       color: "white",
//                       fontSize: "2rem",
//                     }}
//                   >
//                     RoomMate
//                   </Typography>
//                 </Box>
//                 {!isNonMobile && (
//                   <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                     <ChevronLeft
//                       sx={{
//                         fontSize: "2rem",
//                         color: "white",
//                       }}
//                     />
//                   </IconButton>
//                 )}
//               </FlexBetween>
//             </Box>
//             <List>
//               {navItems.map(({ text, route, icon }) => {
//                 if (!icon) {
//                   return (
//                     <Typography
//                       key={text}
//                       sx={{
//                         m: "1.75rem 0 0.75rem 3rem",
//                         fontWeight: "bold",
//                         fontSize: "1.2rem",
//                         color: "white",
//                       }}
//                     >
//                       {text}
//                     </Typography>
//                   );
//                 }

//                 const isActive = `/${route}` === location.pathname; // Check if route is active

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => navigate(`/${route}`)} // Trigger navigation here
//                       sx={{
//                         backgroundColor: isActive ? "white" : "inherit",
//                         "&:hover": {
//                           backgroundColor: "white",
//                           "& .MuiSvgIcon-root": {
//                             color: "black",
//                           },
//                           "& .MuiTypography-root": {
//                             color: "black",
//                           },
//                         },
//                         transition: "background-color 0.3s",
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "1.8rem",
//                           color: isActive ? "black" : "white", // Change color for active route
//                           transition: "color 0.3s",
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={text}
//                         primaryTypographyProps={{
//                           sx: {
//                             color: isActive ? "black" : "white", // Change color for active route
//                             transition: "color 0.3s",
//                           },
//                         }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;

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
  TaskAlt,
  Webhook,
  Diversity2,
  Restaurant,
  NoMeals,
  NoteAdd,
  ///////can be used
  //MenuBook,
  //Fastfood,
  //MoveUp,

  /////
  NoteAlt,
  FlutterDash,
  ListAlt,
  AddCircle,
  Assignment,
  Person,
  ReportProblemOutlined,
  CampaignOutlined,
  NoteAddOutlined,
  VisibilityOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";

import FlexBetween from "./FlexBetween";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    text: "Dashboard",
    route: "chiefdashboard",
    icon: <HomeOutlined />, // Home icon for dashboard
  },
  {
    text: "Complaints",
    icon: null, // Section heading (no icon)
  },
  {
    text: "Escalated Complaints",
    route: "escalatedcomplaint",
    icon: <ReportProblemOutlined />, // Warning icon for complaints
  },
  {
    text: "Notice",
    icon: null, // Section heading (no icon)
  },
  {
    text: "Create Notice",
    route: "createnotice",
    icon: <NoteAddOutlined />, // Note icon for creating notices
  },
  {
    text: "View Notice",
    route: "chiefnotices",
    icon: <CampaignOutlined />, // Announcement icon for viewing notices
  },
  {
    text: "Create Warden",
    icon: null, // Section heading (no icon)
  },
  {
    text: "Create",
    route: "addwarden",
    icon: <PersonAddOutlined />, // Person add icon for creating a warden
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
