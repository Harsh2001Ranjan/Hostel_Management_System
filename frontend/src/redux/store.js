import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import complaintReducer from "./features/complaintSlice";

const store = configureStore({
  reducer: { auth: authReducer, complaints: complaintReducer },
});

export default store;
