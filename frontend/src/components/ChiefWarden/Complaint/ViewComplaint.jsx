import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Grid,
  Snackbar,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnresolvedEscalatedComplaints,
  chiefupdateComplaintStatus,
  resetSuccess,
} from "../../../redux/features/complaintSlice";

const UnresolvedEscalatedComplaints = () => {
  const dispatch = useDispatch();
  const { complaints, isLoading, error, success, alertMessage } = useSelector(
    (state) => state.complaints
  );

  useEffect(() => {
    dispatch(fetchUnresolvedEscalatedComplaints());
  }, [dispatch]);

  const handleUpdateStatus = (id, status) => {
    dispatch(
      chiefupdateComplaintStatus({ complaintId: id, complaintStatus: status })
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
          color: "#007bff",
        }}
      >
        Unresolved Escalated Complaints
      </Typography>

      {isLoading && <Alert severity="info">Loading complaints...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {complaints.length === 0 && !isLoading ? (
        <Alert severity="info">No unresolved escalated complaints found.</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {complaints.map((complaint) => (
            <Grid item xs={12} sm={6} md={4} key={complaint._id}>
              <Card
                sx={{
                  height: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#007bff" }}
                  >
                    {complaint.typeOfComplaint}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Student:</strong> {complaint.studentName} (
                    {complaint.registrationNumber})
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Phone:</strong> {complaint.studentPhoneNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Hostel:</strong> {complaint.hostelName}, Room{" "}
                    {complaint.roomNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Description:</strong> {complaint.description.text}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Escalated By:</strong>{" "}
                    {complaint.escalation?.escalatedBy}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Escalation Reason:</strong>{" "}
                    {complaint.escalation?.escalateReason}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    paddingBottom: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#3a79bd", color: "white" }}
                    onClick={() =>
                      handleUpdateStatus(complaint._id, "processing")
                    }
                  >
                    Mark as Processing
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#007bff", color: "white" }}
                    onClick={() =>
                      handleUpdateStatus(complaint._id, "resolved")
                    }
                  >
                    Mark as Resolved
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={success || error}
        autoHideDuration={3000}
        onClose={() => dispatch(resetSuccess())}
        message={alertMessage}
      />
    </Box>
  );
};

export default UnresolvedEscalatedComplaints;
