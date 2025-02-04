import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";
import leaveReducer from "./features/leaveSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintReducer,
    leave: leaveReducer,
  },
});

export default store;
