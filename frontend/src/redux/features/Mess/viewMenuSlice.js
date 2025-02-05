import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch menu for students (if needed)
export const viewMenu = createAsyncThunk(
  "menu/viewMenu",
  async (dayOfWeek, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:4000/api/students/viewMenu";
      if (dayOfWeek) {
        url += `?dayOfWeek=${encodeURIComponent(dayOfWeek)}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Expected response: { success, message, data: menu }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch menu for wardens
export const wardenviewMenu = createAsyncThunk(
  "menu/wardenviewMenu",
  async (dayOfWeek, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:4000/api/wardens/viewMenu";
      if (dayOfWeek) {
        url += `?dayOfWeek=${encodeURIComponent(dayOfWeek)}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update menu for wardens
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (updateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:4000/api/wardens/updateMenu",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Expected response: { success, message, menu }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const viewMenuSlice = createSlice({
  name: "viewMenu",
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
      // viewMenu cases (students)
      .addCase(viewMenu.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(viewMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(viewMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      // wardenviewMenu cases
      .addCase(wardenviewMenu.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(wardenviewMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(wardenviewMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      // updateMenu cases
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.menu; // Update the menu state with the returned updated menu
        state.message = action.payload.message;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearMessages } = viewMenuSlice.actions;
export default viewMenuSlice.reducer;
