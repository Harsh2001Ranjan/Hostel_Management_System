import React from "react";
import { useState } from "react";
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
import Notice from "./components/Student/Notice/notice";
import Poll from "./components/Student/Poll/poll";
import ReportComplaint from "./components/Student/Complaint/ReportComplaint";
import ViewComplaint from "./components/Student/Complaint/ViewComplaints";
import ChiefWardenLayout from "./components/ChiefWarden/ChiefWardenLayout";
import ChiefWardenDashboard from "./components/ChiefWarden/Dashboard/Dashboard";
import Addwarden from "./components/ChiefWarden/Addwarden/Add";
import Createchiefnotice from "./components/ChiefWarden/Notice/Create";
import ViewNotices from "./components/ChiefWarden/Notice/ViewNotices";
import Escalatedcomplaint from "./components/ChiefWarden/Complaint/ViewComplaint";
import WardenLayout from "./components/Warden/WardenLayout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import WardenDashboard from "./components/Warden/Dashboard/Index";
import PendingLeave from "./components/Warden/LeaveApplication/Pending";
import ApprovedLeave from "./components/Warden/LeaveApplication/Approved";
import Complaints from "./components/Warden/Complaint/Complaints";
import CreateNotice from "./components/Warden/Notice/CreateNotice";
import SelfNotice from "./components/Warden/Notice/SelfNotice";
import ChiefWardenNotice from "./components/Warden/Notice/ChiefWardenNotice";
import CreateMenu from "./components/Warden/Mess/Menu/CreateMenu";
import CreatePoll from "./components/Warden/Mess/Poll/CreatePoll";
import ViewMenu from "./components/Warden/Mess/Menu/ViewMenu";
import MyPolls from "./components/Warden/Mess/Poll/MyPolls";
import Current from "./components/Warden/Mess/Feedback/Current";
const App = () => {
  const mode = "light"; // Replace dynamic mode selection with a static mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route>
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
                  <Route
                    path="/reportcomplaint"
                    element={<ReportComplaint />}
                  />
                  <Route path="/viewcomplaint" element={<ViewComplaint />} />
                  <Route path="/notices" element={<Notice />} />
                  <Route path="/poll" element={<Poll />} />
                </Route>
              </Route>
              <Route>
                <Route element={<ChiefWardenLayout />}>
                  <Route
                    path="/chiefdashboard"
                    element={<ChiefWardenDashboard />}
                  />
                  <Route path="/createnotice" element={<Createchiefnotice />} />
                  <Route path="/chiefnotices" element={<ViewNotices />} />
                  <Route path="/addwarden" element={<Addwarden />} />
                  <Route
                    path="/escalatedcomplaint"
                    element={<Escalatedcomplaint />}
                  />
                </Route>
              </Route>
            </Route>
            <Route>
              <Route element={<WardenLayout />}>
                <Route path="/wardendashboard" element={<WardenDashboard />} />
                <Route
                  path="/leave-applications/pending"
                  element={<PendingLeave />}
                />
                <Route
                  path="/leave-applications/approved"
                  element={<ApprovedLeave />}
                />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/notices/create" element={<CreateNotice />} />
                <Route path="/notices/create" element={<CreateNotice />} />
                <Route
                  path="/notices/chiefwarden"
                  element={<ChiefWardenNotice />}
                />
                <Route path="/notices/warden" element={<SelfNotice />} />
                <Route path="/menu/add" element={<CreateMenu />} />
                <Route path="/menu/view" element={<ViewMenu />} />
                <Route path="/polls/create" element={<CreatePoll />} />
                <Route path="/polls" element={<MyPolls />} />
                <Route path="/feedback/current" element={<Current />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
