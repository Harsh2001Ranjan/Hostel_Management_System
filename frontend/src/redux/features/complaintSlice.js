import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
// ✅ Async thunk for approving a complaint
export const approveComplaint = createAsyncThunk(
  "complaints/approve",
  async ({ complaintId, studentApproval, feedback }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.patch(
        `${BASE_URL}/students/complaints/${complaintId}/approve`,
        { studentApproval, feedback },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.complaint; // Return updated complaint
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while approving the complaint.",
        }
      );
    }
  }
);

// ✅ Async thunk for escalating a complaint
export const escalateComplaint = createAsyncThunk(
  "complaints/escalate",
  async ({ complaintId, escalateReason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.patch(
        `${BASE_URL}/students/complaints/${complaintId}/escalate`,
        { escalateReason },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.complaint;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while escalating the complaint.",
        }
      );
    }
  }
);

// ✅ Async thunk for fetching complaints
export const fetchStudentComplaints = createAsyncThunk(
  "viewcomplaint",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.get(`${BASE_URL}/students/complaints`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.complaints;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while fetching the complaints.",
        }
      );
    }
  }
);

// ✅ Async thunk for submitting a complaint
export const submitComplaint = createAsyncThunk(
  "reportcomplaint",
  //complaintData,
  async (formDataToSend, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.post(
        `${BASE_URL}/students/complaint`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while submitting the complaint.",
        }
      );
    }
  }
);

export const fetchComplaints = createAsyncThunk("complaints", async () => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  const response = await axios.get(`${BASE_URL}/wardens/complaints`, {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  });

  return response.data.complaints;
});
// ✅ Async thunk for updating complaint status
export const updateComplaintStatus = createAsyncThunk(
  "complaints/updateStatus",
  async (
    { complaintId, complaintStatus, wardenIgnoreReason },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.patch(
        `${BASE_URL}/wardens/complaints/${complaintId}/status`,
        { complaintStatus, wardenIgnoreReason },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        complaint: response.data.complaint,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update complaint status.",
        }
      );
    }
  }
);

// ✅ Async thunk for escalating a complaint
export const escalateComplaintWarden = createAsyncThunk(
  "complaints/escalateWarden",
  async ({ complaintId, escalateReason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: "Unauthorized. Please log in." });
      }

      const response = await axios.patch(
        `${BASE_URL}/wardens/complaints/${complaintId}/escalate`,
        { escalateReason },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        complaint: response.data.complaint,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to escalate complaint." }
      );
    }
  }
);
// ✅ Fetch Unresolved Escalated Complaints
export const fetchUnresolvedEscalatedComplaints = createAsyncThunk(
  "escalatedcomplaint",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return rejectWithValue("Unauthorized. Please log in.");

      const response = await axios.get(
        `${BASE_URL}/chiefwarden/complaints/escalated/unresolved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.complaints;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch complaints."
      );
    }
  }
);

// ✅ Update Complaint Status (Processing/Resolved)
export const chiefupdateComplaintStatus = createAsyncThunk(
  "complaints/chiefupdateStatus",
  async ({ complaintId, complaintStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return rejectWithValue("Unauthorized. Please log in.");

      const response = await axios.patch(
        `${BASE_URL}/chiefwarden/complaints/escalated/${complaintId}/status`,
        { complaintStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        complaint: response.data.complaint,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update status."
      );
    }
  }
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    complaints: [],
    isLoading: false,
    error: null,
    success: false,
    alertMessage: "",
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.alertMessage = "";
      state.alertSeverity = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.complaints = [action.payload, ...state.complaints]; // Add new complaint at the beginning
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to submit complaint.";
      })
      .addCase(fetchStudentComplaints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchStudentComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch complaints.";
      })
      .addCase(approveComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // Update the approved complaint in the list
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === action.payload._id ? action.payload : complaint
        );
      })
      .addCase(approveComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to approve complaint.";
      })
      .addCase(escalateComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(escalateComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // Update the escalated complaint in the list
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === action.payload._id ? action.payload : complaint
        );
      })
      .addCase(escalateComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to escalate complaint.";
      })
      .addCase(fetchComplaints.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateComplaintStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.alertMessage = action.payload.message;
        state.alertSeverity = "success";
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === action.payload.complaint._id
            ? action.payload.complaint
            : complaint
        );
      })
      .addCase(updateComplaintStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update status.";
        state.alertMessage = state.error;
        state.alertSeverity = "error";
      })
      .addCase(escalateComplaintWarden.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(escalateComplaintWarden.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.alertMessage = action.payload.message;
        state.alertSeverity = "success";
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === action.payload.complaint._id
            ? action.payload.complaint
            : complaint
        );
      })
      .addCase(escalateComplaintWarden.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to escalate complaint.";
        state.alertMessage = state.error;
        state.alertSeverity = "error";
      })
      .addCase(fetchUnresolvedEscalatedComplaints.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUnresolvedEscalatedComplaints.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.complaints = action.payload;
        }
      )
      .addCase(fetchUnresolvedEscalatedComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.alertMessage = action.payload;
      })
      .addCase(chiefupdateComplaintStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chiefupdateComplaintStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.alertMessage = action.payload.message;
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === action.payload.complaint._id
            ? action.payload.complaint
            : complaint
        );
      })
      .addCase(chiefupdateComplaintStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.alertMessage = action.payload;
      });
  },
});

export const { resetSuccess } = complaintSlice.actions; // Export the new reset action
export default complaintSlice.reducer;
