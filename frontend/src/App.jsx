import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingSite/LandingPage/Index";
import Register from "./components/LandingSite/AuthPage/Register";
import Login from "./components/LandingSite/AuthPage/Login";
import PasswordReset from "./components/LandingSite/AuthPage/PasswordReset";
import Enterotp from "./components/LandingSite/AuthPage/Enterotp";
import SetNewPassword from "./components/LandingSite/AuthPage/SetNewPassword";
import StudentDashboard from "./components/Student/Dashboard/Index";
import StudentLayout from "./components/Student/StudentLayout";
import LeaveApplicationForm from "./components/Student/Leave/Leave";
import Viewmenu from "./components/Student/Mess/Viewmenu";
import FoodWastage from "./components/Student/Mess/FoodWastage";
import Feedback from "./components/Student/Mess/Feedback";
import ReportComplaint from "./components/Student/Complaint/ReportComplaint";
import ApproveComplaint from "./components/Student/Complaint/ApproveComplaint";
import ChiefWardenLayout from "./components/ChiefWarden/ChiefWardenLayout";
import ChiefWardenDashboard from "./components/ChiefWarden/Dashboard/Dashboard";
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
            <Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset" element={<PasswordReset />} />
              <Route path="/enterotp" element={<Enterotp />} />
              <Route path="/setnewpassword" element={<SetNewPassword />} />
            </Route>
            <Route>
              <Route element={<StudentLayout />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/leave" element={<LeaveApplicationForm />} />
                <Route path="/viewmenu" element={<Viewmenu />} />
                <Route path="/foodwastage" element={<FoodWastage />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/reportcomplaint" element={<ReportComplaint />} />
                <Route
                  path="/approvecomplaint"
                  element={<ApproveComplaint />}
                />
              </Route>
            </Route>
            <Route>
              <Route element={<ChiefWardenLayout />}>
                <Route
                  path="/chiefdashboard"
                  element={<ChiefWardenDashboard />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
