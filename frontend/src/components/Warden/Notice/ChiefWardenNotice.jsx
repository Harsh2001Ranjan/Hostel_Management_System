import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

// Dummy data for notices
const dummyNotices = [
  {
    _id: "1",
    title: "Important Announcement - Hostel Rules",
    content: "Please follow the new hostel rules starting from tomorrow.",
    createdBy: "ChiefWarden",
    createdAt: "2025-01-26T10:00:00Z",
  },
  {
    _id: "2",
    title: "Winter Break Notice",
    content: "Hostel will remain closed for winter break from 15th December.",
    createdBy: "Warden",
    createdAt: "2025-01-20T14:00:00Z",
  },
  {
    _id: "3",
    title: "Mess Menu for the Week",
    content:
      "The mess menu for this week is as follows: Monday - Pasta, Tuesday - Pizza.",
    createdBy: "ChiefWarden",
    createdAt: "2025-01-22T09:30:00Z",
  },
  {
    _id: "1",
    title: "Important Announcement - Hostel Rules",
    content: "Please follow the new hostel rules starting from tomorrow.",
    createdBy: "ChiefWarden",
    createdAt: "2025-01-26T10:00:00Z",
  },
  {
    _id: "2",
    title: "Winter Break Notice",
    content: "Hostel will remain closed for winter break from 15th December.",
    createdBy: "Warden",
    createdAt: "2025-01-20T14:00:00Z",
  },
  {
    _id: "3",
    title: "Mess Menu for the Week",
    content:
      "The mess menu for this week is as follows: Monday - Pasta, Tuesday - Pizza.",
    createdBy: "ChiefWarden",
    createdAt: "2025-01-22T09:30:00Z",
  },
];

const NoticesPage = () => {
  const [notices] = useState(
    dummyNotices.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sorting by date (latest first)
    )
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: "12px",
        bgcolor: "#f4f6fb",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#798bb8",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        Notices
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {notices.length > 0 ? (
          notices.map((notice) => (
            <Grid item xs={12} sm={6} md={4} key={notice._id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: "12px",
                  bgcolor: "white",
                  border: `1px solid #798bb8`,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#798bb8",
                      mb: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {notice.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {notice.content}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "#798bb8" }}
                  >
                    Created By: {notice.createdBy}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mt: 0.5 }}
                  >
                    Date: {new Date(notice.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#798bb8",
                      color: "white",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#5e73a6",
                      },
                    }}
                    fullWidth
                    onClick={() =>
                      alert(
                        `Download feature will be available for ID: ${notice._id}`
                      )
                    }
                  >
                    Download PDF
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mx: "auto" }}>
            No notices available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default NoticesPage;
