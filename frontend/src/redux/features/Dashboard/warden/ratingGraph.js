// feedbackAnalyticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeedbackAnalytics = createAsyncThunk(
  "feedbackAnalytics/fetchFeedbackAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        "http://localhost:4000/api/wardens/feedback-analytics",
        config
      );
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error fetching feedback analytics";
      return rejectWithValue(errorMsg);
    }
  }
);

const feedbackAnalyticsSlice = createSlice({
  name: "feedbackAnalytics",
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeedbackAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackAnalyticsSlice.reducer;
