import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPolls,
  fetchPollResults,
  reactToPoll,
} from "../../../redux/features/Mess/poll/studentpollSlice";
import { toast } from "react-toastify";

// Styled ProgressBar
const StyledLinearProgress = styled(LinearProgress)({
  height: 12,
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
});

const Polls = () => {
  const dispatch = useDispatch();
  const { polls, results, loading, error } = useSelector(
    (state) => state.polls
  );
  const [selectedOptions, setSelectedOptions] = useState({});

  // Fetch polls on component mount
  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  // Fetch results when polls are loaded
  useEffect(() => {
    polls.forEach((poll) => {
      dispatch(fetchPollResults(poll._id));
    });
  }, [dispatch, polls]);

  const handleSelectOption = (pollId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: option }));
  };

  const handleVote = (pollId) => {
    const selectedOption = selectedOptions[pollId];

    if (!selectedOption) {
      toast.error("Please select an option before submitting.");
      return;
    }

    dispatch(reactToPoll({ pollId, option: selectedOption }));
  };

  if (loading) return <Typography align="center">Loading polls...</Typography>;
  if (error)
    return (
      <Typography align="center" color="error">
        {error}
      </Typography>
    );
  if (polls.length === 0)
    return (
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          No active polls are available.
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#000000" }}
      >
        Available Polls
      </Typography>
      {polls.map((poll) => {
        const pollResults = results[poll._id] || {};
        const totalVotes = Object.values(pollResults).reduce(
          (acc, val) => acc + val,
          0
        );

        return (
          <motion.div
            key={poll._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ marginBottom: 4, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2, color: "#000000" }}
                >
                  {poll.question}
                </Typography>
                <RadioGroup
                  value={selectedOptions[poll._id] || ""}
                  onChange={(e) => handleSelectOption(poll._id, e.target.value)}
                >
                  {poll.options.map((option) => {
                    const optionVotes = pollResults[option] || 0;
                    const votePercentage = totalVotes
                      ? (optionVotes / totalVotes) * 100
                      : 0;

                    return (
                      <Box key={option} sx={{ marginBottom: 3 }}>
                        <FormControlLabel
                          value={option}
                          control={<Radio />}
                          label={`${option} (${optionVotes} votes)`}
                          sx={{ fontSize: 16, color: "#333" }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${votePercentage}%` }}
                            transition={{ duration: 1 }}
                            style={{ width: "100%" }}
                          >
                            <StyledLinearProgress
                              variant="determinate"
                              value={votePercentage}
                            />
                          </motion.div>
                          <Typography
                            variant="caption"
                            sx={{ marginLeft: 1, fontWeight: "bold" }}
                          >
                            {Math.round(votePercentage)}%
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </RadioGroup>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#007bff",
                      color: "white",
                      paddingX: 3,
                      paddingY: 1.5,
                      borderRadius: 2,
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                    onClick={() => handleVote(poll._id)}
                  >
                    Submit Vote
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </Container>
  );
};

export default Polls;
