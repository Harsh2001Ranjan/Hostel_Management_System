import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch wardens
export const fetchWardens = createAsyncThunk(
  "wardens/fetchWardens",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(
        "http://localhost:4000/api/chiefwarden/get-all-wardens",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      return response.data; // Returning the fetched wardens
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wardens"
      );
    }
  }
);

const wardenSlice = createSlice({
  name: "wardens",
  initialState: {
    wardens: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No manual reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchWardens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWardens.fulfilled, (state, action) => {
        state.loading = false;
        state.wardens = action.payload;
      })
      .addCase(fetchWardens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wardenSlice.reducer;
