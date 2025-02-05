import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  wardenfetchChiefWardenNotices,
  wardendownloadChiefNotice,
  clearMessages, // Import the action to clear messages
} from "../../../redux/features/noticeSlice";

const NoticesPage = () => {
  const dispatch = useDispatch();
  const { notices, loading, error, successMessage } = useSelector(
    (state) => state.notice
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(wardenfetchChiefWardenNotices(token));
    }
  }, [dispatch, token]);

  const handleDownload = (id) => {
    dispatch(wardendownloadChiefNotice({ id, token }));
  };

  // Automatically clear messages after 3 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [error, successMessage, dispatch]);

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
        Chief Warden Notices
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

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />
      ) : (
        <Grid container spacing={3}>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Grid item xs={12} sm={6} md={4} key={notice._id}>
                <Card
                  sx={{
                    boxShadow: 4,
                    borderRadius: "12px",
                    bgcolor: "white",
                    border: `1px solid #007bff`,
                    height: "100%", // Ensures all cards are of equal height
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
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
                      sx={{ mb: 2, flexGrow: 1 }}
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
                  <CardActions sx={{ mt: "auto" }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#798bb8",
                        color: "white",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#0056b3" },
                        width: "100%", // Ensures button spans full width
                      }}
                      onClick={() => handleDownload(notice._id)}
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
      )}
    </Box>
  );
};

export default NoticesPage;
