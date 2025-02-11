import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createPoll,
  clearSuccessMessage,
} from "../../../../redux/features/Mess/poll/pollSlice"; // Adjust the path as needed
import { toast } from "react-toastify";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Assuming you have an auth slice for managing authentication
  const { successMessage, error } = useSelector((state) => state.poll);

  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some((option) => !option)) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(createPoll({ token, question, options }));
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
        setQuestion("");
        setOptions(["", ""]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: "#f4f6f9",
          border: "1px solid #798bb8",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom color="#798bb8" fontWeight="bold">
          Create a Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poll Question"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Enter the poll question"
                required
                variant="outlined"
                color="primary"
                size="medium"
              />
            </Grid>
            {options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                    placeholder={`Enter option ${index + 1}`}
                    required
                    variant="outlined"
                    color="primary"
                    size="medium"
                  />
                  {index > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeOption(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={addOption}
                startIcon={<AddIcon />}
                fullWidth
                sx={{
                  marginTop: 2,
                  border: "2px solid #798bb8",
                  color: "#798bb8",
                  "&:hover": {
                    backgroundColor: "#798bb8",
                    color: "white",
                  },
                }}
              >
                Add Option
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Create Poll
              </Button>
            </Grid>
            {successMessage && (
              <Grid item xs={12}>
                <Typography variant="body2" color="success">
                  {successMessage}
                </Typography>
              </Grid>
            )}
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PollForm;
