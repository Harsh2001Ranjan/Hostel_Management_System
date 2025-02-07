import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Async thunk to add a warden
export const addWarden = createAsyncThunk(
  "warden/addWarden",
  async (wardenData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:4000/api/chiefwarden/add-warden",
        wardenData,
        config
      );

      return response.data; // Return full response
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add warden";
      return rejectWithValue(errorMessage);
    }
  }
);

const wardenSlice = createSlice({
  name: "warden",
  initialState: {
    loading: false,
    error: null,
    success: false,
    successMessage: "",
    warden: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = "";
      state.warden = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWarden.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(addWarden.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "Warden added successfully!";
        state.warden = action.payload;
        toast.success(state.successMessage); // Show success toast
      })
      .addCase(addWarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = "";
        toast.error(state.error); // Show error toast
      });
  },
});

export const { clearState } = wardenSlice.actions;
export default wardenSlice.reducer;
