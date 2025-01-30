import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  TextField,
  Stack,
} from "@mui/material";

const mockComplaints = [
  {
    _id: "1",
    student: { name: "John Doe", hostelName: "Hostel A" },
    title: "Broken Chair",
    description: "The chair in my room is broken and needs replacement.",
    status: "Pending",
  },
  {
    _id: "2",
    student: { name: "Jane Smith", hostelName: "Hostel B" },
    title: "Water Leakage",
    description: "There is water leakage in the bathroom.",
    status: "In Progress",
  },
  {
    _id: "3",
    student: { name: "Alice Johnson", hostelName: "Hostel C" },
    title: "Electricity Issue",
    description: "Power outage in my room since yesterday.",
    status: "Resolved",
  },
];

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [ignoreReason, setIgnoreReason] = useState("");
  const [escalateReason, setEscalateReason] = useState("");
  const [showIgnoreReason, setShowIgnoreReason] = useState({});
  const [showEscalateReason, setShowEscalateReason] = useState({});

  const fetchComplaints = async () => {
    setTimeout(() => {
      setComplaints(mockComplaints);
    }, 500);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
      setAlertMessage("Complaint status updated successfully.");
      setAlertSeverity("success");
    } catch (error) {
      setAlertMessage("Failed to update complaint status.");
      setAlertSeverity("error");
    }
  };

  const handleIgnoreClick = (complaintId) => {
    setShowIgnoreReason((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [complaintId]: !prev[complaintId],
    }));
    setShowEscalateReason((prev) =>
      Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
  };

  const handleEscalateClick = (complaintId) => {
    setShowEscalateReason((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [complaintId]: !prev[complaintId],
    }));
    setShowIgnoreReason((prev) =>
      Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: "8px",
        bgcolor: "#f8f9fa",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 2,
          textTransform: "uppercase",
        }}
      >
        Complaints Management
      </Typography>

      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#798bb8" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Hostel Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>{complaint._id}</TableCell>
                <TableCell>{complaint.student?.name}</TableCell>
                <TableCell>{complaint.student?.hostelName}</TableCell>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>
                  <Stack spacing={1} direction="column">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleUpdateStatus(complaint._id, "In Progress")
                      }
                    >
                      Mark as In Progress
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleUpdateStatus(complaint._id, "Resolved")
                      }
                    >
                      Mark as Resolved
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleIgnoreClick(complaint._id)}
                    >
                      Ignore
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleEscalateClick(complaint._id)}
                    >
                      Escalate
                    </Button>
                  </Stack>
                  {showIgnoreReason[complaint._id] && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="Reason to Ignore"
                        fullWidth
                        variant="outlined"
                        value={ignoreReason}
                        onChange={(e) => setIgnoreReason(e.target.value)}
                        sx={{ mb: 1 }}
                      />
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          console.log(
                            `Complaint ID: ${complaint._id}, Ignore Reason: ${ignoreReason}`
                          );
                          setShowIgnoreReason((prev) => ({
                            ...prev,
                            [complaint._id]: false,
                          }));
                          setAlertMessage("Complaint ignored successfully.");
                          setAlertSeverity("success");
                        }}
                      >
                        Submit Ignore Reason
                      </Button>
                    </Box>
                  )}
                  {showEscalateReason[complaint._id] && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="Reason to Escalate"
                        fullWidth
                        variant="outlined"
                        value={escalateReason}
                        onChange={(e) => setEscalateReason(e.target.value)}
                        sx={{ mb: 1 }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          console.log(
                            `Complaint ID: ${complaint._id}, Escalate Reason: ${escalateReason}`
                          );
                          setShowEscalateReason((prev) => ({
                            ...prev,
                            [complaint._id]: false,
                          }));
                          setAlertMessage("Complaint escalated successfully.");
                          setAlertSeverity("success");
                        }}
                      >
                        Submit Escalate Reason
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComplaintsManagement;
