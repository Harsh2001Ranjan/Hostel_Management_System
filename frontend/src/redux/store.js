import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";
import leaveReducer from "./features/leaveSlice";
import addMenuReducer from "../redux/features/Mess/addMenuSlice";
import viewMenuReducer from "../redux/features/Mess/viewMenuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintReducer,
    leave: leaveReducer,
    menu: addMenuReducer,
    viewMenu: viewMenuReducer,
  },
});

export default store;
