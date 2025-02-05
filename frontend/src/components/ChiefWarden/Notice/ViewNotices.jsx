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
  chieffetchChiefWardenNotices,
  chiefdownloadNotice,
  clearNoticeState,
} from "../../../redux/features/noticeSlice";

const NoticesPage = () => {
  const dispatch = useDispatch();
  const { notices, loading, error, successMessage } = useSelector(
    (state) => state.notice
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(chieffetchChiefWardenNotices(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearNoticeState());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  const handleDownload = (id) => {
    dispatch(chiefdownloadNotice({ id, token }));
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: "12px",
        bgcolor: "#f4f9ff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#000000",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        Notices
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Grid item xs={12} sm={6} md={4} key={notice._id}>
                <Card
                  sx={{
                    boxShadow: 4,
                    borderRadius: "12px",
                    bgcolor: "white",
                    border: `2px solid #007bff`,
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#000000",
                        mb: 1,
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
                      sx={{ fontWeight: "bold", color: "#000000" }}
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
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#007bff",
                        color: "white",
                        textTransform: "none",
                        width: "100%",
                        "&:hover": {
                          bgcolor: "#0056b3",
                        },
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
