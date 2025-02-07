import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";
import leaveReducer from "./features/leaveSlice";
import addMenuReducer from "../redux/features/Mess/addMenuSlice";
import viewMenuReducer from "../redux/features/Mess/viewMenuSlice";
import noticeReducer from "./features/noticeSlice";
import addWardenReducer from "./features/addWardenSlice";
import feedbackReducer from "./features/Mess/feedbackSlice";
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
  },
});

export default store;
