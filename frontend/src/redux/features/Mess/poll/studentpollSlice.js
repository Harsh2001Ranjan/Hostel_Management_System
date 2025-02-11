import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/students";

// ✅ Get polls for the student
export const fetchPolls = createAsyncThunk(
  "polls/fetchPolls",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/polls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.polls;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch polls"
      );
    }
  }
);

// ✅ Get poll results
export const fetchPollResults = createAsyncThunk(
  "polls/fetchPollResults",
  async (pollId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/polls/${pollId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { pollId, results: response.data.results };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch poll results"
      );
    }
  }
);

// ✅ React to a poll (vote submission)
export const reactToPoll = createAsyncThunk(
  "polls/reactToPoll",
  async ({ pollId, option }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/react-poll/${pollId}`,
        { option }, // `userId` will be extracted from token in middleware
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);

      // Fetch updated poll results after a successful vote
      dispatch(fetchPollResults(pollId));

      return { pollId, message: response.data.message };
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit vote");
      return rejectWithValue(
        error.response?.data?.error || "Failed to submit vote"
      );
    }
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState: {
    polls: [],
    results: {},
    loading: false,
    error: null,
    successMessage: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch polls
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = action.payload;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch poll results
      .addCase(fetchPollResults.fulfilled, (state, action) => {
        state.results[action.payload.pollId] = action.payload.results;
      })
      .addCase(fetchPollResults.rejected, (state, action) => {
        state.error = action.payload;
      })

      // React to poll (submit vote)
      .addCase(reactToPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactToPoll.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(reactToPoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = pollsSlice.actions;

export default pollsSlice.reducer;
