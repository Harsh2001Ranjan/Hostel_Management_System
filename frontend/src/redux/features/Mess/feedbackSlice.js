// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL = "http://localhost:4000/api";
// // Define the async thunk for submitting feedback
// export const submitFeedback = createAsyncThunk(
//   "feedback/submitFeedback",
//   async (formData, { rejectWithValue }) => {
//     try {
//       // Get the token from localStorage
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${BASE_URL}/students/submit-feedback`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create the slice
// const feedbackSlice = createSlice({
//   name: "feedback",
//   initialState: {
//     feedbackData: null,
//     loading: false,
//     error: null,
//     successMessage: "",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitFeedback.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.successMessage = "";
//       })
//       .addCase(submitFeedback.fulfilled, (state, action) => {
//         state.loading = false;
//         state.feedbackData = action.payload;
//         state.successMessage = "Feedback submitted successfully!";
//       })
//       .addCase(submitFeedback.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload?.error ||
//           "Failed to submit feedback. Please try again.";
//       });
//   },
// });

// export default feedbackSlice.reducer;
// feedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:4000/api";

// Define the async thunk for submitting feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (formData, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/students/submit-feedback`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the async thunk for fetching current month feedbacks
export const fetchCurrentMonthFeedbacks = createAsyncThunk(
  "feedback/fetchCurrentMonthFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/wardens/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.feedbacks;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbackData: null,
    loading: false,
    error: null,
    successMessage: "",
    feedbacks: [],
    fetchLoading: false,
    fetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle submitFeedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackData = action.payload;
        state.successMessage = "Feedback submitted successfully!";
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error ||
          "Failed to submit feedback. Please try again.";
      })

      // Handle fetchCurrentMonthFeedbacks
      .addCase(fetchCurrentMonthFeedbacks.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCurrentMonthFeedbacks.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchCurrentMonthFeedbacks.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError =
          action.payload?.error ||
          "Failed to fetch feedbacks. Please try again.";
      });
  },
});

export default feedbackSlice.reducer;
