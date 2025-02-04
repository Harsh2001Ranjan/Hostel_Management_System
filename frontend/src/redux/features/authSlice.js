import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

// ✅ Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  "sendOtp",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      let endpoint = "";
      if (role === "Student") {
        endpoint = `${BASE_URL}/students/send-reset-otp`;
      } else if (role === "Warden" || role === "ChiefWarden") {
        endpoint = `${BASE_URL}/wardens/send-reset-otp`;
      } else {
        throw new Error("Invalid role selected");
      }

      const response = await axios.post(
        endpoint,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // Expecting a success message from the backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while sending OTP",
        }
      );
    }
  }
);

// ✅ Async thunk for student registration
export const registerStudent = createAsyncThunk(
  "register",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/students/register`,
        studentData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // Expecting token and student data from backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred during registration",
        }
      );
    }
  }
);

// ✅ Async thunk for student account verification
export const verifyStudentAccount = createAsyncThunk(
  "enterotp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/students/verify-account`,
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // Expecting a success flag and message from backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred during verification",
        }
      );
    }
  }
);

// ✅ Async thunk for login (Student, Warden, ChiefWarden)
export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      let endpoint = "";
      if (role === "Student") {
        endpoint = `${BASE_URL}/students/login`;
      } else if (role === "Warden") {
        endpoint = `${BASE_URL}/wardens/login`;
      } else if (role === "ChiefWarden") {
        endpoint = `${BASE_URL}/wardens/login`;
      } else {
        throw new Error("Invalid role selected");
      }

      const response = await axios.post(
        endpoint,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { token } = response.data;
      let userRole;
      let userName;
      if (role === "Student" && response.data.student) {
        userRole = response.data.student.role;
        userName = response.data.student.name;
        localStorage.setItem("user", JSON.stringify(response.data.student));
      } else if (
        (role === "Warden" || role === "ChiefWarden") &&
        response.data.warden
      ) {
        userRole = response.data.warden.role;
        userName = response.data.warden.name;
        localStorage.setItem("user", JSON.stringify(response.data.warden));
      } else {
        throw new Error("Invalid response structure");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      return { ...response.data, role: userRole, name: userName };
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || {
          message: "Invalid credentials or login error",
        }
      );
    }
  }
);

// ✅ Async thunk for resetting password (Student, Warden, ChiefWarden)
export const resetPassword = createAsyncThunk(
  "setnewpassword",
  async (data, { rejectWithValue }) => {
    const { role, ...rest } = data;
    let endpoint = "";

    switch (role) {
      case "Student":
        endpoint = `${BASE_URL}/students/reset-password`;
        break;
      case "Warden":
      case "ChiefWarden":
        endpoint = `${BASE_URL}/wardens/reset-password`;
        break;
      default:
        return rejectWithValue("Invalid role");
    }

    try {
      const response = await axios.post(endpoint, rest);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to reset password",
        }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    isLoading: false,
    error: null,
    success: false,
    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,
    verifyMessage: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
    resetVerifyState: (state) => {
      state.verifyLoading = false;
      state.verifySuccess = false;
      state.verifyError = null;
      state.verifyMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Send OTP Reducers
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to send OTP";
      })
      // ✅ Registration Reducers
      .addCase(registerStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.student;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      // ✅ Verification Reducers
      .addCase(verifyStudentAccount.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
      })
      .addCase(verifyStudentAccount.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = action.payload.success;
        state.verifyMessage = action.payload.message;
      })
      .addCase(verifyStudentAccount.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyError = action.payload?.message || "Verification failed";
      })
      // ✅ Login Reducers
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })
      // ✅ Reset Password Reducers
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to reset password";
      });
  },
});

export const { setUser, logout, resetVerifyState } = authSlice.actions;

export default authSlice.reducer;
