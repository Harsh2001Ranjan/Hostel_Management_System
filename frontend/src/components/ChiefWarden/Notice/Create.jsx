import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createchiefNotice,
  clearNoticeState,
} from "../../../redux/features/noticeSlice"; // Importing the Redux action

const CreateNoticeForm = () => {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.notice);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    visibleToStudents: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, visibleToStudents: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication error: Please log in.");
      return;
    }

    dispatch(createchiefNotice({ formData, token }));
  };
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearNoticeState()); // Clears messages after 3 seconds
        if (successMessage) {
          setFormData({ title: "", content: "", visibleToStudents: false }); // Reset form on success
        }
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
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
        border: "1px solid #e0e0e0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "#000000",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Create a Notice
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: "0.9rem" }}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.visibleToStudents}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Make visible to students"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#007bff",
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
