import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = "http://localhost:4000/api";
export const createPoll = createAsyncThunk(
  "poll/createPoll",
  async ({ token, question, options }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/wardens/create-poll`,
        { question, options },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create poll";
      return rejectWithValue(errorMessage);
    }
  }
);
export const getWardenPolls = createAsyncThunk(
  "poll/getWardenPolls",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/wardens/get-polls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.polls;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch polls"
      );
    }
  }
);

// Delete Poll
export const deletePoll = createAsyncThunk(
  "poll/deletePoll",
  async ({ token, pollId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/wardens/delete-poll/${pollId}`,
        // {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { pollId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete poll"
      );
    }
  }
);

// Fetch Poll Results
export const getPollResults = createAsyncThunk(
  "poll/getPollResults",
  async ({ token, pollId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wardens/results/${pollId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch poll results"
      );
    }
  }
);

const pollSlice = createSlice({
  name: "poll",
  initialState: {
    loading: false,
    error: null,
    successMessage: "",
    polls: [],
    results: null,
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = "";
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = "";
      state.polls = [];
    },
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Poll created successfully!";
        state.polls.push(action.payload.poll);
        toast.success(state.successMessage);
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = "";
        toast.error(state.error);
      })
      .addCase(getWardenPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWardenPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = action.payload;
      })
      .addCase(getWardenPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error, { autoClose: 3000 });
      })
      .addCase(deletePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.polls = state.polls.filter(
          (poll) => poll.pollId !== action.payload.pollId
        );
        toast.success(state.successMessage, { autoClose: 3000 });
      })
      .addCase(deletePoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error, { autoClose: 3000 });
      })
      .addCase(getPollResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPollResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(getPollResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error, { autoClose: 3000 });
      });
  },
});
//✅ Fix: Ensure reducers are exported properly
export const { clearSuccessMessage, clearState, clearMessages } =
  pollSlice.actions;
export default pollSlice.reducer;
