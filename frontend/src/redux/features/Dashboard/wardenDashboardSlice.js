import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch metrics
export const fetchMetrics = createAsyncThunk(
  "metrics/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.get(
        "http://localhost:4000/api/wardens/students-count-warden",
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        }
      );
      console.log(response.data);
      return response.data; // Return fetched metrics
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching metrics"
      );
    }
  }
);

const metricsSlice = createSlice({
  name: "metrics",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default metricsSlice.reducer;
