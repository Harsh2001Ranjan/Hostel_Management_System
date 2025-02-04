import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentComplaints,
  approveComplaint,
  escalateComplaint,
} from "../../../redux/features/complaintSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";

const ComplaintCard = ({ complaint }) => {
  const dispatch = useDispatch();
  const [approval, setApproval] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [openEscalationDialog, setOpenEscalationDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [escalateReason, setEscalateReason] = useState("");

  const handleApprove = (approved) => {
    dispatch(
      approveComplaint({
        complaintId: complaint._id,
        studentApproval: approved,
        feedback: approved ? { rating, comments: feedback } : null,
      })
    );
    setSuccessMessage(
      approved ? "Complaint approved successfully." : "Complaint disapproved."
    );
    setOpenSnackbar(true);
    setApproval(approved ? "yes" : "no");
  };

  const handleEscalate = () => {
    setOpenEscalationDialog(true);
  };

  const confirmEscalate = () => {
    dispatch(escalateComplaint({ complaintId: complaint._id, escalateReason }));
    setOpenEscalationDialog(false);
    setSuccessMessage("Complaint escalated successfully.");
    setOpenSnackbar(true);
  };

  const handleSubmitFeedback = () => {
    handleApprove(true);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        minHeight: 250,
        mb: 2,
        p: 3,
        borderRadius: 3,
        boxShadow: 5,
        backgroundColor: "#f8f9fa",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Typography variant="h6" sx={{ color: "#007bff", fontWeight: "bold" }}>
          Complaint ID: {complaint._id}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          {complaint.description.text}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
          Date: {new Date(complaint.complaintTime).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray", mb: 2 }}>
          Status: {complaint.complaintStatus}
        </Typography>

        {complaint.complaintStatus === "resolved" && approval === null && (
          <Box sx={{ mt: "auto" }}>
            <Typography variant="body2">
              Do you approve this resolution?
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#007bff", color: "white", mr: 1 }}
              onClick={() => handleApprove(true)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleApprove(false)}
            >
              No
            </Button>
          </Box>
        )}

        {approval === "yes" && (
          <Box sx={{ mt: "auto" }}>
            <Typography variant="body2">Rate the resolution:</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              fullWidth
              label="Provide your feedback"
              variant="outlined"
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#007bff", color: "white", mt: 2 }}
              onClick={handleSubmitFeedback}
            >
              Submit Feedback
            </Button>
          </Box>
        )}

        {(approval === "no" && complaint.complaintStatus === "resolved") ||
        complaint.complaintStatus === "ignored" ? (
          <Box sx={{ mt: "auto" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleEscalate}
            >
              Escalate
            </Button>
          </Box>
        ) : null}
      </CardContent>

      <Dialog
        open={openEscalationDialog}
        onClose={() => setOpenEscalationDialog(false)}
      >
        <DialogTitle>Confirm Escalation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to escalate this complaint?
          </DialogContentText>
          <TextField
            fullWidth
            label="Reason for Escalation"
            variant="outlined"
            multiline
            rows={3}
            sx={{ mt: 2 }}
            value={escalateReason}
            onChange={(e) => setEscalateReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEscalationDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmEscalate} color="error">
            Yes, Escalate
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

const ComplaintsList = () => {
  const dispatch = useDispatch();
  const { complaints, isLoading, error } = useSelector(
    (state) => state.complaints
  );

  useEffect(() => {
    dispatch(fetchStudentComplaints());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4 }}>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3} justifyContent="center">
        {complaints.map((complaint) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={complaint._id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ComplaintCard complaint={complaint} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ComplaintsList;
