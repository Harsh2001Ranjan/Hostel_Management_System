// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch feedback analytics from the backend using axios
// export const fetchFeedbackAnalytics = createAsyncThunk(
//   "feedbackAnalytics/fetchFeedbackAnalytics",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");
//       // The backend extracts the user from the token due to the userAuth and authChiefWarden middleware,
//       // so we no longer need to send the userId in the request body.
//       const response = await axios.get(
//         "http://localhost:4000/api/chiefwarden/feedback-analytics",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Assuming your backend response contains an "analytics" field
//       return response.data.analytics;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "Error fetching analytics"
//       );
//     }
//   }
// );

// const feedbackAnalyticsSlice = createSlice({
//   name: "chieffeedbackAnalytics",
//   initialState: {
//     analytics: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFeedbackAnalytics.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFeedbackAnalytics.fulfilled, (state, action) => {
//         state.loading = false;
//         state.analytics = action.payload;
//       })
//       .addCase(fetchFeedbackAnalytics.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default feedbackAnalyticsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch feedback analytics using axios
export const fetchFeedbackAnalytics = createAsyncThunk(
  "feedbackAnalytics/fetchFeedbackAnalytics",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      // The backend route is now a GET and uses middleware (userAuth and authChiefWarden)
      const response = await axios.get(
        "http://localhost:4000/api/chiefwarden/feedback-analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Ensure we always return an array even if analytics is missing
      return response.data.analytics || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error fetching analytics"
      );
    }
  }
);

const feedbackAnalyticsSlice = createSlice({
  name: "feedbackAnalytics",
  initialState: {
    analytics: [], // default to an empty array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        // Set analytics to action.payload or empty array as a safeguard
        state.analytics = action.payload || [];
      })
      .addCase(fetchFeedbackAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Optionally reset analytics on error
        state.analytics = [];
      });
  },
});

export default feedbackAnalyticsSlice.reducer;
