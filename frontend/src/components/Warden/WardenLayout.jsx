// import React, { useState } from "react";
// import { Box, useMediaQuery } from "@mui/material";
// import { Outlet } from "react-router-dom"; //this allows us to have the template layouts.
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = () => {
//   const isNonMobile = useMediaQuery("(min-width: 600px)");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   // const userId = useSelector((state) => state.global.userId);

//   return (
//     <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
//       <Sidebar
//         isNonMobile={isNonMobile}
//         drawerWidth="250px"
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />
//       <Box flexGrow={1}>
//         {" "}
//         {/* flexGrow = 1 lets it take as much space as it could.*/}
//         <Navbar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default Layout;
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
        <Box flexGrow={1} overflow="auto" bgcolor="lightgray">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
