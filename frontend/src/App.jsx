import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/Index";
import Register from "./components/LandingSite/AuthPage/Register";
import Login from "./components/LandingSite/AuthPage/Login";
import PasswordReset from "./components/LandingSite/AuthPage/PasswordReset";
import Enterotp from "./components/LandingSite/AuthPage/Enterotp";
import SetNewPassword from "./components/LandingSite/AuthPage/SetNewPassword";
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<PasswordReset />} />
            <Route path="/enterotp" element={<Enterotp />} />
            <Route path="/setnewpassword" element={<SetNewPassword />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
