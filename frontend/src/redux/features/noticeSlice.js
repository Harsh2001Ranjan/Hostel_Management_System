import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API base URL
const BASE_URL = "http://localhost:4000/api";

// Async thunk to fetch Chief Warden notices
export const wardenfetchChiefWardenNotices = createAsyncThunk(
  "notices/chiefwarden",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wardens/chiefwarden-notice`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notices"
      );
    }
  }
);

// Async thunk to download a notice as PDF
export const wardendownloadChiefNotice = createAsyncThunk(
  "chiefwardenNotices/download",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wardens/download-notice/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `notice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return "Download started successfully!";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to download notice"
      );
    }
  }
);
// Async thunk to fetch  Warden notices
export const wardenfetchSelfNotices = createAsyncThunk(
  "notices/warden",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/wardens/warden-notice`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notices"
      );
    }
  }
);

// Async thunk to fetch notices
export const chieffetchChiefWardenNotices = createAsyncThunk(
  "notices",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/chiefwarden/chiefwarden-notice`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notices"
      );
    }
  }
);

// Async thunk to download a notice as PDF
export const chiefdownloadNotice = createAsyncThunk(
  "notices/download",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/chiefwarden/download-notice/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Important to handle PDF response
        }
      );

      // Create a link to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `notice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return "Download started successfully!";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to download notice"
      );
    }
  }
);
// Async thunk for creating a notice
export const createchiefNotice = createAsyncThunk(
  "chiefnotices/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chiefwarden/create-notice`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.message; // Success message from backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create notice"
      );
    }
  }
);
// Async thunk for creating a notice
export const createwardenNotice = createAsyncThunk(
  "notices/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/wardens/create-notice`, // Update the URL to your required endpoint
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.message; // Success message from backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create notice"
      );
    }
  }
);
// Fetch Chief Warden notices
export const fetchChiefWardenNotices = createAsyncThunk(
  "notices/studentfetchChiefWarden",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/students/chiefwarden-notice`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notices"
      );
    }
  }
);

// Fetch Warden notices
export const fetchWardenNotices = createAsyncThunk(
  "notices/studentfetchWarden",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/students/warden-notice`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notices"
      );
    }
  }
);

// Download a notice as PDF
export const downloadNotice = createAsyncThunk(
  "notices/studentdownload",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/students/download-notice/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `notice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return "Download started successfully!";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to download notice"
      );
    }
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    successMessage: "",
    notices: [],
    loading: false,
    error: null,
    chiefWardenNotices: [],
    wardenNotices: [],
  },
  reducers: {
    clearNoticeState: (state) => {
      state.successMessage = "";
      state.error = "";
    },
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createchiefNotice.fulfilled, (state, action) => {
        state.successMessage = action.payload;
        state.error = "";
      })
      .addCase(createchiefNotice.rejected, (state, action) => {
        state.error = action.payload;
        state.successMessage = "";
      })
      .addCase(chieffetchChiefWardenNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chieffetchChiefWardenNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(chieffetchChiefWardenNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(chiefdownloadNotice.fulfilled, (state, action) => {
        state.successMessage = action.payload;
      })
      .addCase(chiefdownloadNotice.rejected, (state, action) => {
        state.error = action.payload;
      })
      /////////////////
      .addCase(createwardenNotice.fulfilled, (state, action) => {
        state.successMessage = action.payload;
        state.error = "";
      })
      .addCase(createwardenNotice.rejected, (state, action) => {
        state.error = action.payload;
        state.successMessage = "";
      })
      .addCase(wardenfetchChiefWardenNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(wardenfetchChiefWardenNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(wardenfetchChiefWardenNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(wardendownloadChiefNotice.fulfilled, (state, action) => {
        state.successMessage = action.payload;
      })
      .addCase(wardendownloadChiefNotice.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(wardenfetchSelfNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(wardenfetchSelfNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(wardenfetchSelfNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchChiefWardenNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChiefWardenNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.chiefWardenNotices = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(fetchChiefWardenNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWardenNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWardenNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.wardenNotices = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(fetchWardenNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNoticeState, clearMessages } = noticeSlice.actions;
export default noticeSlice.reducer;
