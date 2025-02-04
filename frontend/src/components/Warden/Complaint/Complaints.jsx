import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaints,
  updateComplaintStatus,
  escalateComplaintWarden,
  resetSuccess,
} from "../../../redux/features/complaintSlice";
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
  Stack,
  TextField,
  Alert,
} from "@mui/material";

const Complaint = () => {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaints.items) || [];
  const status = useSelector((state) => state.complaints.status);
  const alertMessage = useSelector((state) => state.complaints.alertMessage);
  const alertSeverity = useSelector((state) => state.complaints.alertSeverity);

  const [showIgnoreReason, setShowIgnoreReason] = useState({});
  const [showEscalateReason, setShowEscalateReason] = useState({});
  const [ignoreReason, setIgnoreReason] = useState({});
  const [escalateReason, setEscalateReason] = useState({});

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 5000);
    }
  }, [alertMessage, dispatch]);

  // ✅ Handle status updates (In Progress / Resolved)
  const handleUpdateStatus = (complaintId, complaintStatus) => {
    dispatch(updateComplaintStatus({ complaintId, complaintStatus }));
  };

  // ✅ Toggle Ignore Reason Input
  const handleIgnoreClick = (complaintId) => {
    setShowIgnoreReason((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [complaintId]: !prev[complaintId],
    }));
    setShowEscalateReason({});
  };

  // ✅ Submit Ignore Reason
  const handleSubmitIgnore = (complaintId) => {
    if (!ignoreReason[complaintId]?.trim()) {
      alert("Please enter a reason for ignoring the complaint.");
      return;
    }
    dispatch(
      updateComplaintStatus({
        complaintId,
        complaintStatus: "ignored",
        wardenIgnoreReason: ignoreReason[complaintId],
      })
    );
    setShowIgnoreReason((prev) => ({ ...prev, [complaintId]: false }));
    setIgnoreReason((prev) => ({ ...prev, [complaintId]: "" }));
  };

  // ✅ Toggle Escalate Reason Input
  const handleEscalateClick = (complaintId) => {
    setShowEscalateReason((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [complaintId]: !prev[complaintId],
    }));
    setShowIgnoreReason({});
  };

  // ✅ Submit Escalate Reason
  const handleSubmitEscalate = (complaintId) => {
    if (!escalateReason[complaintId]?.trim()) {
      alert("Please enter a reason for escalating the complaint.");
      return;
    }
    dispatch(
      escalateComplaintWarden({
        complaintId,
        escalateReason: escalateReason[complaintId],
      })
    );
    setShowEscalateReason((prev) => ({ ...prev, [complaintId]: false }));
    setEscalateReason((prev) => ({ ...prev, [complaintId]: "" }));
  };

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
        sx={{ fontWeight: 600, mb: 2, textTransform: "uppercase" }}
      >
        Complaints Management
      </Typography>

      {/* ✅ Alert Message */}
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      {/* Loading State */}
      {status === "loading" && (
        <Typography align="center">Loading...</Typography>
      )}

      {/* Handling No Complaints or Error */}
      {status === "failed" && complaints.length === 0 ? (
        <Typography
          align="center"
          sx={{ mt: 2, fontWeight: "bold", color: "gray" }}
        >
          No active complaints
        </Typography>
      ) : status === "failed" ? (
        <Typography align="center" sx={{ mt: 2, color: "red" }}>
          Error fetching complaints.
        </Typography>
      ) : null}

      {/* Complaints Table */}
      {status === "succeeded" && complaints.length === 0 ? (
        <Typography
          align="center"
          sx={{ mt: 2, fontWeight: "bold", color: "gray" }}
        >
          No active complaints
        </Typography>
      ) : (
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
                  Reg. Number
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Room Number
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Phone
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
                  <TableCell>{complaint.studentName}</TableCell>
                  <TableCell>{complaint.hostelName}</TableCell>
                  <TableCell>{complaint.registrationNumber}</TableCell>
                  <TableCell>{complaint.roomNumber}</TableCell>
                  <TableCell>{complaint.studentPhoneNumber}</TableCell>
                  <TableCell>{complaint.typeOfComplaint}</TableCell>
                  <TableCell>{complaint.description.text}</TableCell>
                  <TableCell>{complaint.complaintStatus}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="column">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleUpdateStatus(complaint._id, "processing")
                        }
                      >
                        Mark as In Progress
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleUpdateStatus(complaint._id, "resolved")
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

                    {/* Ignore Reason Input */}
                    {showIgnoreReason[complaint._id] && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Reason to Ignore"
                          fullWidth
                          variant="outlined"
                          value={ignoreReason[complaint._id] || ""}
                          onChange={(e) =>
                            setIgnoreReason((prev) => ({
                              ...prev,
                              [complaint._id]: e.target.value,
                            }))
                          }
                          sx={{ mb: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => handleSubmitIgnore(complaint._id)}
                        >
                          Submit Ignore Reason
                        </Button>
                      </Box>
                    )}

                    {/* Escalate Reason Input */}
                    {showEscalateReason[complaint._id] && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Reason to Escalate"
                          fullWidth
                          variant="outlined"
                          value={escalateReason[complaint._id] || ""}
                          onChange={(e) =>
                            setEscalateReason((prev) => ({
                              ...prev,
                              [complaint._id]: e.target.value,
                            }))
                          }
                          sx={{ mb: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleSubmitEscalate(complaint._id)}
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
      )}
    </Box>
  );
};

export default Complaint;
