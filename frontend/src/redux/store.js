import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";
import noticeReducer from "./features/noticeSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintReducer,
    notice: noticeReducer,
  },
});

export default store;
