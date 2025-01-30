import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

const ComplaintCard = ({ complaint }) => {
  const [approval, setApproval] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [openEscalationDialog, setOpenEscalationDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleEscalate = () => setOpenEscalationDialog(true);

  const confirmEscalate = () => {
    setOpenEscalationDialog(false);
    setSuccessMessage(
      "Your complaint has been escalated successfully. Our team will review it shortly."
    );
    setOpenSnackbar(true);
  };

  const handleSubmitFeedback = () => {
    setSuccessMessage(
      "Thank you for your feedback! We appreciate your time in helping us improve."
    );
    setOpenSnackbar(true);
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
          Complaint ID: {complaint.id}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          {complaint.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
          Date: {complaint.date}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray", mb: 2 }}>
          Status: {complaint.status}
        </Typography>

        {complaint.status === "Resolved" && approval === null && (
          <Box sx={{ mt: "auto" }}>
            <Typography variant="body2">
              Do you approve this resolution?
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#007bff", color: "white", mr: 1 }}
              onClick={() => setApproval("yes")}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setApproval("no")}
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

        {(approval === "no" || complaint.status === "Ignored") && (
          <Box sx={{ mt: "auto" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleEscalate}
            >
              Escalate
            </Button>
          </Box>
        )}
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
  const demoComplaints = [
    { id: 1, title: "Broken Fan", status: "Resolved", date: "2025-01-01" },
    { id: 2, title: "Leaking Tap", status: "Ignored", date: "2025-01-05" },
    { id: 3, title: "WiFi Not Working", status: "Pending", date: "2025-01-10" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {demoComplaints.map((complaint) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={complaint.id}
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
