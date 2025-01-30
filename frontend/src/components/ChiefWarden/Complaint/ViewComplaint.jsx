import React, { useState } from "react";
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

const UnresolvedEscalatedComplaints = () => {
  const [complaints, setComplaints] = useState([
    {
      _id: "1",
      studentName: "John Doe",
      registrationNumber: "20225001",
      hostelName: "Hostel A",
      roomNumber: "101",
      typeOfComplaint: "Electrician",
      description: { text: "Light not working" },
      escalation: {
        escalatedBy: "Warden",
        escalateReason: "Not resolved in time",
      },
      complaintStatus: "sent",
    },
    {
      _id: "2",
      studentName: "Jane Smith",
      registrationNumber: "20225002",
      hostelName: "Hostel B",
      roomNumber: "202",
      typeOfComplaint: "Plumber",
      description: { text: "Leaking tap" },
      escalation: {
        escalatedBy: "Student",
        escalateReason: "No response from warden",
      },
      complaintStatus: "sent",
    },
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const updateComplaintStatus = (id, status) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint._id === id
          ? { ...complaint, complaintStatus: status }
          : complaint
      )
    );
    setSnackbar({ open: true, message: `Complaint marked as ${status}` });
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
      {complaints.length === 0 ? (
        <Alert severity="info">No unresolved escalated complaints found.</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {complaints.map((complaint) => (
            <Grid item xs={12} sm={6} md={4} key={complaint._id}>
              <Card
                sx={{
                  height: 280,
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
                    <strong>Hostel:</strong> {complaint.hostelName}, Room{" "}
                    {complaint.roomNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Description:</strong> {complaint.description.text}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Escalated By:</strong>{" "}
                    {complaint.escalation.escalatedBy}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Escalation Reason:</strong>{" "}
                    {complaint.escalation.escalateReason}
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
                      updateComplaintStatus(complaint._id, "processing")
                    }
                  >
                    Mark as Processing
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#007bff", color: "white" }}
                    onClick={() =>
                      updateComplaintStatus(complaint._id, "resolved")
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
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default UnresolvedEscalatedComplaints;
