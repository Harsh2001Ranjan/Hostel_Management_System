// src/slices/addMenuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Post to the backend with the token in the Authorization header
      const response = await axios.post(
        "http://localhost:4000/api/wardens/addMenu",
        menuData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming the response contains { success, message, menu }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addMenuSlice = createSlice({
  name: "menu",
  initialState: {
    loading: false,
    menu: null,
    message: "",
    error: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMenu.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.menu;
        state.message = action.payload.message;
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearMessages } = addMenuSlice.actions;
export default addMenuSlice.reducer;
