import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";
import leaveReducer from "./features/leaveSlice";
import addMenuReducer from "../redux/features/Mess/addMenuSlice";
import viewMenuReducer from "../redux/features/Mess/viewMenuSlice";
import noticeReducer from "./features/noticeSlice";
import addWardenReducer from "./features/addWardenSlice";
import feedbackReducer from "./features/Mess/feedbackSlice";
import mealReducer from "../redux/features/Mess/foodWastageSlice";
import chiefMetricsReducer from "../redux/features/Dashboard/chiefWardenDashboardSlice";
import studentReducer from "../redux/features/Dashboard/studentDashboardSlice";
import metricsReducer from "../redux/features/Dashboard/warden/stu_count";
import feedbackAnalyticsReducer from "../redux/features/Dashboard/warden/ratingGraph";
import ratingsReducer from "../redux/features/Dashboard/chiefWarden/barChartSlice";
import chiefFeedbackAnalyticsReducer from "../redux/features/Dashboard/chiefWarden/hostelWiseRating";
import wardenReducer from "../redux/features/Dashboard/chiefWarden/getWardenSlice";
import pollReducer from "./features/Mess/poll/pollSlice";
import studentpollSlice from "./features/Mess/poll/studentpollSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,

    complaints: complaintReducer,
    leave: leaveReducer,
    menu: addMenuReducer,
    viewMenu: viewMenuReducer,
    notice: noticeReducer,
    warden: addWardenReducer,
    feedback: feedbackReducer,
    meal: mealReducer,
    metrics: metricsReducer,
    feedbackAnalytics: feedbackAnalyticsReducer,
    chiefMetrics: chiefMetricsReducer,
    student: studentReducer,
    ratings: ratingsReducer,
    chieffeedbackAnalytics: chiefFeedbackAnalyticsReducer,
    wardens: wardenReducer,
    poll: pollReducer,
    polls: studentpollSlice,
  },
});

export default store;
