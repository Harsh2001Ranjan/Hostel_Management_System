import React from "react";
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
  ButtonGroup,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PendingLeaveApplications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect if the screen is mobile or smaller
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");

  const exampleApplications = [
    {
      id: "1",
      studentName: "John Doe",
      hostelName: "A-Block",
      reasonOfLeave: "Medical Emergency",
      startDate: "2025-01-28",
      endDate: "2025-01-30",
      totalDays: 3,
      addressToGo: "123, Greenway Street, New Delhi",
      leaveType: "Medical Leave",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      hostelName: "B-Block",
      reasonOfLeave: "Family Function",
      startDate: "2025-02-01",
      endDate: "2025-02-03",
      totalDays: 3,
      addressToGo: "45, Rose Garden Avenue, Mumbai",
      leaveType: "Casual Leave",
    },
  ];

  const handleAction = (action, id) => {
    setAlertSeverity(action === "Approve" ? "success" : "error");
    setAlertMessage(
      `Leave application with ID ${id} has been ${action.toLowerCase()}d.`
    );
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
        Pending Leave Applications
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

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "400px", overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#798bb8" }}>
              {!isMobile && (
                <>
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
                    Leave Type
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {exampleApplications.map((application) => (
              <TableRow key={application.id}>
                {isMobile ? (
                  // For mobile view, show each detail in a card-like format
                  <TableCell colSpan={2}>
                    <Box sx={{ display: "block", mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Student: {application.studentName}
                      </Typography>
                      <Typography variant="body2">
                        Hostel: {application.hostelName}
                      </Typography>
                      <Typography variant="body2">
                        Reason: {application.reasonOfLeave}
                      </Typography>
                      <Typography variant="body2">
                        Start Date: {application.startDate}
                      </Typography>
                      <Typography variant="body2">
                        End Date: {application.endDate}
                      </Typography>
                      <Typography variant="body2">
                        Total Days: {application.totalDays}
                      </Typography>
                      <Typography variant="body2">
                        Address: {application.addressToGo}
                      </Typography>
                      <Typography variant="body2">
                        Leave Type: {application.leaveType}
                      </Typography>

                      <ButtonGroup sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "green",
                            color: "#fff",
                            fontSize: "0.8rem",
                            "&:hover": { bgcolor: "darkgreen" },
                          }}
                          onClick={() =>
                            handleAction("Approve", application.id)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#dc3545",
                            color: "#fff",
                            fontSize: "0.8rem",
                            "&:hover": { bgcolor: "#a71d2a" },
                          }}
                          onClick={() => handleAction("Reject", application.id)}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </TableCell>
                ) : (
                  <>
                    <TableCell>{application.id}</TableCell>
                    <TableCell>{application.studentName}</TableCell>
                    <TableCell>{application.hostelName}</TableCell>
                    <TableCell>{application.reasonOfLeave}</TableCell>
                    <TableCell>{application.startDate}</TableCell>
                    <TableCell>{application.endDate}</TableCell>
                    <TableCell>{application.totalDays}</TableCell>
                    <TableCell>{application.addressToGo}</TableCell>
                    <TableCell>{application.leaveType}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "green",
                            color: "#fff",
                            fontSize: "0.8rem",
                            "&:hover": { bgcolor: "darkgreen" },
                          }}
                          onClick={() =>
                            handleAction("Approve", application.id)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#dc3545",
                            color: "#fff",
                            fontSize: "0.8rem",
                            "&:hover": { bgcolor: "#a71d2a" },
                          }}
                          onClick={() => handleAction("Reject", application.id)}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingLeaveApplications;
