import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch student data
export const fetchStudentData = createAsyncThunk(
  "student/fetchStudentData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        return rejectWithValue("Authentication token not found.");
      }

      const response = await axios.get(
        "http://localhost:4000/api/students/get-student-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.studentData; // Returning student data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch student data"
      );
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
