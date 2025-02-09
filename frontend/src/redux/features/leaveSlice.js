// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to submit a leave application
// export const submitLeaveApplication = createAsyncThunk(
//   "leave/submitLeaveApplication",
//   async (formData, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/students/create-leave-application",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// //Async thunk to fetch pending leave applications
// export const fetchPendingLeaveApplications = createAsyncThunk(
//   "leave-applications/pending",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/wardens/get-pending-leave-applications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const pendingData = response.data.data;

//       if (!Array.isArray(pendingData)) {
//         console.error(
//           "Expected an array of pending applications but received:",
//           pendingData
//         );
//         return [];
//       }

//       return pendingData;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// // Async thunk to update leave status
// export const updateLeaveStatus = createAsyncThunk(
//   "leave/updateLeaveStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/api/wardens/update-leaveStatus/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );
// // Async thunk to fetch approved leave applications
// export const fetchApprovedLeaveApplications = createAsyncThunk(
//   "leave-applications/approved",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/wardens/get-approved-leave-applications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const approvedData = response.data.data;

//       if (!Array.isArray(approvedData)) {
//         console.error(
//           "Expected an array of approved applications but received:",
//           approvedData
//         );
//         return [];
//       }

//       return approvedData;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );
// // Async thunk to mark return details
// export const markReturnDetails = createAsyncThunk(
//   "leave/markReturnDetails",
//   async (id, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/api/wardens/mark-return-details/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// const leaveSlice = createSlice({
//   name: "leave",
//   initialState: {
//     successMessage: "",
//     errorMessage: "",
//     pendingApplications: [],
//     approvedApplications: [],
//     loading: false,
//   },
//   reducers: {
//     clearMessages: (state) => {
//       state.successMessage = "";
//       state.errorMessage = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitLeaveApplication.pending, (state) => {
//         state.loading = true;
//         state.successMessage = "";
//         state.errorMessage = "";
//       })
//       .addCase(submitLeaveApplication.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload.message;
//       })
//       .addCase(submitLeaveApplication.rejected, (state, action) => {
//         state.loading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(fetchPendingLeaveApplications.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchPendingLeaveApplications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.pendingApplications = action.payload;
//         state.errorMessage = "";
//       })
//       .addCase(fetchPendingLeaveApplications.rejected, (state, action) => {
//         state.loading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateLeaveStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateLeaveStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload.message;
//         // Update the status of the leave application in the state
//         state.pendingApplications = state.pendingApplications.map((app) =>
//           app._id === action.payload.data._id ? action.payload.data : app
//         );
//       })
//       .addCase(updateLeaveStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(fetchApprovedLeaveApplications.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchApprovedLeaveApplications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.approvedApplications = action.payload;
//         state.errorMessage = "";
//       })
//       .addCase(fetchApprovedLeaveApplications.rejected, (state, action) => {
//         state.loading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(markReturnDetails.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(markReturnDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload.message;
//         // Update the state to remove the application or mark it as returned
//         state.approvedApplications = state.approvedApplications.filter(
//           (application) => application._id !== action.payload.data._id
//         );
//       })
//       .addCase(markReturnDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.errorMessage = action.payload;
//       });
//   },
// });

// export const { clearMessages } = leaveSlice.actions;

// export default leaveSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to submit a leave application
export const submitLeaveApplication = createAsyncThunk(
  "leave/submitLeaveApplication",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/students/create-leave-application",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to fetch pending leave applications
export const fetchPendingLeaveApplications = createAsyncThunk(
  "leave-applications/pending",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/wardens/get-pending-leave-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pendingData = response.data.data;

      if (!Array.isArray(pendingData)) {
        console.error(
          "Expected an array of pending applications but received:",
          pendingData
        );
        return [];
      }

      return pendingData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update leave status
export const updateLeaveStatus = createAsyncThunk(
  "leave/updateLeaveStatus",
  async ({ id, status }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:4000/api/wardens/update-leaveStatus/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to fetch approved leave applications
export const fetchApprovedLeaveApplications = createAsyncThunk(
  "leave-applications/approved",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/wardens/get-approved-leave-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const approvedData = response.data.data;

      if (!Array.isArray(approvedData)) {
        console.error(
          "Expected an array of approved applications but received:",
          approvedData
        );
        return [];
      }

      return approvedData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to mark return details
export const markReturnDetails = createAsyncThunk(
  "leave/markReturnDetails",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:4000/api/wardens/mark-return-details/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    successMessage: "",
    errorMessage: "",
    pendingApplications: [],
    approvedApplications: [],
    loading: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLeaveApplication.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(submitLeaveApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(submitLeaveApplication.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchPendingLeaveApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingLeaveApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingApplications = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchPendingLeaveApplications.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        // Update the status of the leave application in the state
        state.pendingApplications = state.pendingApplications.map((app) =>
          app._id === action.payload.data._id ? action.payload.data : app
        );
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchApprovedLeaveApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApprovedLeaveApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedApplications = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchApprovedLeaveApplications.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(markReturnDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(markReturnDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        // Update the state to remove the application or mark it as returned
        state.approvedApplications = state.approvedApplications.filter(
          (application) => application._id !== action.payload.data._id
        );
      })
      .addCase(markReturnDetails.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessages } = leaveSlice.actions;

export default leaveSlice.reducer;
