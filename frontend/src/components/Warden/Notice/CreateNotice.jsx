import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createwardenNotice,
  clearNoticeState,
} from "../../../redux/features/noticeSlice"; // Import Redux actions

const CreateNoticeForm = () => {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.notice);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Authentication error: Please log in.");
      return;
    }

    dispatch(createwardenNotice({ formData, token }));
  };

  // UseEffect to clear messages after 3 seconds and reset form on success
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearNoticeState()); // Clears success/error messages
        if (successMessage) {
          setFormData({ title: "", content: "" }); // Reset form only on success
        }
      }, 3000);

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [error, successMessage, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: "8px",
        bgcolor: "#f8f9fa",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: 2, color: "#000000" }}
      >
        Create a Notice
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notice Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#798bb8",
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#0056b3" },
              }}
            >
              Create Notice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateNoticeForm;
