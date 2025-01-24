import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/Index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";

const App = () => {
  const mode = "light"; // Replace dynamic mode selection with a static mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}>
              {/* <Route index element={<LandingPage />} /> */}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
