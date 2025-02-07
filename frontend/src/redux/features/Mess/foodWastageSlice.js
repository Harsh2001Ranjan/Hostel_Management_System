// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Existing thunk to mark meal as not skipped
// export const markMealNotSkipped = createAsyncThunk(
//   "meal/markMealNotSkipped",
//   async ({ meal }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token"); // token from local storage
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // backend middleware will decode and get userId
//         },
//       };
//       const response = await axios.post(
//         "http://localhost:4000/api/students/mark-meal-not-skipped",
//         { meal }, // only meal is sent; middleware attaches userId from token
//         config
//       );
//       return response.data; // expected to include a message field from the backend
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // // New thunk to fetch food wastage stats from the backend
// export const fetchFoodWastageStats = createAsyncThunk(
//   "meal/fetchFoodWastageStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(
//         "http://localhost:4000/api/wardens/food-wastage-stats",
//         config
//       );
//       // Expected response: { success: true, message: "...", data: { ... } }
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const mealSlice = createSlice({
//   name: "meal",
//   initialState: {
//     loading: false,
//     message: "",
//     error: "",
//     stats: null, // holds food wastage stats fetched from the backend
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handlers for markMealNotSkipped
//       .addCase(markMealNotSkipped.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//         state.message = "";
//       })
//       .addCase(markMealNotSkipped.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload.message;
//       })
//       .addCase(markMealNotSkipped.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Something went wrong";
//       })
//       // Handlers for fetchFoodWastageStats
//       .addCase(fetchFoodWastageStats.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//       })
//       .addCase(fetchFoodWastageStats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.stats = action.payload.data; // assuming your response contains a "data" field
//         state.message = action.payload.message;
//       })
//       .addCase(fetchFoodWastageStats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Failed to fetch stats";
//       });
//   },
// });

// export default mealSlice.reducer;
////////////////////////////////////////////////////////////////////////////////////////////////////////////uupar sahii haii

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Existing thunk to mark meal as not skipped
export const markMealNotSkipped = createAsyncThunk(
  "meal/markMealNotSkipped",
  async ({ meals }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      };

      // Send all selected meals as an array in a single request
      const response = await axios.post(
        "http://localhost:4000/api/students/mark-meal-not-skipped",
        { meals }, // Send array of selected meals
        config
      );

      return response.data; // Backend is expected to return a message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// // New thunk to fetch food wastage stats from the backend
export const fetchFoodWastageStats = createAsyncThunk(
  "meal/fetchFoodWastageStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:4000/api/wardens/food-wastage-stats",
        config
      );
      // Expected response: { success: true, message: "...", data: { ... } }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState: {
    loading: false,
    message: "",
    error: "",
    stats: null, // holds food wastage stats fetched from the backend
  },
  extraReducers: (builder) => {
    builder
      // Handlers for markMealNotSkipped
      .addCase(markMealNotSkipped.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(markMealNotSkipped.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(markMealNotSkipped.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Something went wrong";
      })
      // Handlers for fetchFoodWastageStats
      .addCase(fetchFoodWastageStats.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchFoodWastageStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data; // assuming your response contains a "data" field
        state.message = action.payload.message;
      })
      .addCase(fetchFoodWastageStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch stats";
      });
  },
});

export default mealSlice.reducer;
