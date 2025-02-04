import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  fetchApprovedLeaveApplications,
  markReturnDetails,
} from "../../../redux/features/leaveSlice"; // Import the markReturnDetails action

const ApprovedLeaveApplications = () => {
  const dispatch = useDispatch();
  const { approvedApplications, loading, errorMessage, successMessage } =
    useSelector((state) => state.leave);

  // Fetch approved leave applications on component mount
  useEffect(() => {
    dispatch(fetchApprovedLeaveApplications());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Loading applications...
        </Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Alert
          severity="error"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#f8d7da",
            color: "#842029",
          }}
        >
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  // Success message for return marked
  if (successMessage) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Alert
          severity="success"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#d4edda",
            color: "#155724",
          }}
        >
          {successMessage}
        </Alert>
      </Box>
    );
  }

  // Check if approvedApplications is an array and has data
  if (
    !Array.isArray(approvedApplications) ||
    approvedApplications.length === 0
  ) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h6" align="center">
          No approved leave applications found.
        </Typography>
      </Box>
    );
  }

  const handleMarkReturn = (id) => {
    dispatch(markReturnDetails(id));
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
            {approvedApplications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application._id}</TableCell>
                <TableCell>{application.student?.name || "N/A"}</TableCell>
                <TableCell>
                  {application.student?.hostelName || "N/A"}
                </TableCell>
                <TableCell>{application.reasonOfLeave || "N/A"}</TableCell>
                <TableCell>{application.startDate.split("T")[0]}</TableCell>
                <TableCell>{application.endDate.split("T")[0]}</TableCell>
                <TableCell>{application.totalDays || "N/A"}</TableCell>
                <TableCell>{application.addressToGo || "N/A"}</TableCell>
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
