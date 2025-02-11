import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWardenPolls,
  deletePoll,
  getPollResults,
  clearMessages,
} from "../../../../redux/features/Mess/poll/pollSlice";
import {
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WardenPolls = () => {
  const dispatch = useDispatch();
  const { polls, loading, results } = useSelector((state) => state.poll);
  const token = localStorage.getItem("token");

  const [selectedPoll, setSelectedPoll] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);

  useEffect(() => {
    dispatch(getWardenPolls({ token }));

    // Clear messages after 3 seconds
    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, token]);

  const handleDeletePoll = (pollId) => {
    setPollToDelete(pollId);
    setOpenDeleteDialog(true);
  };

  const confirmDeletePoll = () => {
    dispatch(deletePoll({ token, pollId: pollToDelete })).then(() => {
      setOpenDeleteDialog(false);
      setPollToDelete(null);
    });
  };

  const cancelDeletePoll = () => {
    setOpenDeleteDialog(false);
    setPollToDelete(null);
  };

  const handleViewResults = (pollId) => {
    dispatch(getPollResults({ token, pollId }));
    setSelectedPoll(pollId);
  };

  const closeModal = () => {
    setSelectedPoll(null);
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f4f6fb",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          color: "#798bb8",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Warden Polls
      </Typography>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {polls.map((poll) => (
          <Grid item xs={12} md={6} key={poll.pollId}>
            <Card
              style={{
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderLeft: "5px solid #798bb8",
              }}
            >
              <Typography
                variant="h6"
                style={{ color: "#4a4a4a", fontWeight: "bold" }}
              >
                {poll.question}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "8px" }}
              >
                Created on: {new Date(poll.createdAt).toLocaleString()}
              </Typography>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#798bb8",
                    color: "#fff",
                  }}
                  onClick={() => handleViewResults(poll.pollId)}
                >
                  View Results
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#e57373",
                    color: "#fff",
                  }}
                  onClick={() => handleDeletePoll(poll.pollId)}
                >
                  Delete Poll
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Poll Results Dialog */}
      <Dialog open={!!selectedPoll} onClose={closeModal} fullWidth>
        <DialogTitle style={{ color: "#798bb8" }}>Poll Results</DialogTitle>
        <DialogContent>
          {loading ? (
            <div style={{ textAlign: "center", padding: "16px" }}>
              <CircularProgress style={{ color: "#798bb8" }} />
              <Typography style={{ marginTop: "8px", color: "#798bb8" }}>
                Loading results...
              </Typography>
            </div>
          ) : results ? (
            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#4a4a4a", fontWeight: "bold" }}
              >
                {results.poll.question}
              </Typography>
              <Bar
                data={{
                  labels: results.poll.options,
                  datasets: [
                    {
                      label: "Votes",
                      data: results.poll.options.map(
                        (option) => results.results[option]
                      ),
                      backgroundColor: "#798bb8",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Votes: ${context.raw}`,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDeletePoll}>
        <DialogTitle style={{ color: "#e57373" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ color: "#4a4a4a" }}>
            Are you sure you want to delete this poll?
          </Typography>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e57373",
                color: "#fff",
              }}
              onClick={confirmDeletePoll}
            >
              Yes, Delete
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#798bb8",
                color: "#fff",
              }}
              onClick={cancelDeletePoll}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WardenPolls;
