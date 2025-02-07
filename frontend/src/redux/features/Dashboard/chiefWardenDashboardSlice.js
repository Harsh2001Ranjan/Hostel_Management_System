import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch metrics
export const fetchStudents = createAsyncThunk(
  "metrics/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.get(
        "http://localhost:4000/api/chiefwarden/students-count-Chiefwarden",
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

const chiefMetricsSlice = createSlice({
  name: "chiefMetrics",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chiefMetricsSlice.reducer;
