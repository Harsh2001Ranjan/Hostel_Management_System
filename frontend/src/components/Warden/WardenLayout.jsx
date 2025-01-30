import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box width="100%" height="100vh" display="flex" flexDirection="column">
      {/* Navbar at the Top (Fixed) */}
      <Box
        width="100%"
        position="fixed"
        top={0}
        left={0}
        zIndex={1100} // Higher z-index than Sidebar
        bgcolor="white"
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </Box>

      {/* Sidebar + Main Content Wrapper */}
      <Box display="flex" flexGrow={1} pt="64px">
        {/* Sidebar (Left) */}
        <Box
          width={isSidebarOpen ? "250px" : "0px"}
          height="100vh"
          zIndex={1000}
          bgcolor="gray"
        >
          <Sidebar
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </Box>

        {/* Main Content (Right) */}
        <Box flexGrow={1} overflow="auto" bgcolor="background.paper">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
