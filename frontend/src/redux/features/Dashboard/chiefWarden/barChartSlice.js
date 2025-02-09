import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch average ratings from the backend endpoint,
// including the token from localStorage in the Authorization header.
export const fetchHostelAverageRatings = createAsyncThunk(
  "ratings/fetchHostelAverageRatings",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          // Pass token as a Bearer token if available
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      // Ensure this endpoint matches your backend controller route
      const response = await axios.get(
        "http://localhost:4000/api/chiefwarden/previous-month-ratings",
        config
      );
      // Assuming your API returns { success: true, data: [ { _id, averageRating }, ... ] }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching ratings"
      );
    }
  }
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    ratings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostelAverageRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostelAverageRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchHostelAverageRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch ratings";
      });
  },
});

export default ratingsSlice.reducer;
