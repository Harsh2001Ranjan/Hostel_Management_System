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
} from "@mui/material";

const mockData = [
  {
    _id: "1",
    student: { name: "John Doe", hostelName: "Hostel A" },
    reasonOfLeave: "Family emergency",
    startDate: "2025-01-20T00:00:00Z",
    endDate: "2025-01-25T00:00:00Z",
    totalDays: 5,
    addressToGo: "123, Park Street, Cityville",
  },
  {
    _id: "2",
    student: { name: "Jane Smith", hostelName: "Hostel B" },
    reasonOfLeave: "Medical reasons",
    startDate: "2025-01-22T00:00:00Z",
    endDate: "2025-01-28T00:00:00Z",
    totalDays: 6,
    addressToGo: "456, Elm Avenue, Townsville",
  },
  {
    _id: "3",
    student: { name: "Alice Johnson", hostelName: "Hostel C" },
    reasonOfLeave: "Vacation",
    startDate: "2025-01-23T00:00:00Z",
    endDate: "2025-01-29T00:00:00Z",
    totalDays: 6,
    addressToGo: "789, Maple Lane, Countryside",
  },
];

const ApprovedLeaveApplications = () => {
  const [applications, setApplications] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const fetchApprovedApplications = async () => {
    // Simulating backend fetch using mock data
    setTimeout(() => {
      setApplications(mockData);
    }, 500); // Simulate delay for better UX
  };

  const handleMarkReturn = async (id) => {
    try {
      setApplications((prev) => prev.filter((app) => app._id !== id));
      setAlertMessage("Successfully marked return and notified the parent.");
      setAlertSeverity("success");
    } catch (error) {
      setAlertMessage("Failed to mark return.");
      setAlertSeverity("error");
    }
  };

  useEffect(() => {
    fetchApprovedApplications();
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
          color: "#212121",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Approved Leave Applications
      </Typography>

      {alertMessage && (
        <Alert
          severity={alertSeverity}
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: alertSeverity === "success" ? "#d1e7dd" : "#f8d7da",
            color: alertSeverity === "success" ? "#0f5132" : "#842029",
          }}
        >
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
                Reason
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Start Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                End Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total Days
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Address
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application._id}</TableCell>
                <TableCell>{application.student?.name}</TableCell>
                <TableCell>{application.student?.hostelName}</TableCell>
                <TableCell>{application.reasonOfLeave}</TableCell>
                <TableCell>{application.startDate.split("T")[0]}</TableCell>
                <TableCell>{application.endDate.split("T")[0]}</TableCell>
                <TableCell>{application.totalDays}</TableCell>
                <TableCell>{application.addressToGo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "green",
                      color: "#fff",
                      "&:hover": { bgcolor: "darkgreen" },
                    }}
                    onClick={() => handleMarkReturn(application._id)}
                  >
                    Mark Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApprovedLeaveApplications;
