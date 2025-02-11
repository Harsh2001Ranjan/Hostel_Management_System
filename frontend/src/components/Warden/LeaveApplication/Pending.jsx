// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   ButtonGroup,
//   Alert,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingLeaveApplications,
//   updateLeaveStatus,
//   clearMessages, // ✅ Import clearMessages action
// } from "../../../redux/features/leaveSlice";

// const PendingLeaveApplications = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const dispatch = useDispatch();

//   const { pendingApplications, loading, errorMessage, successMessage } =
//     useSelector((state) => state.leave);

//   useEffect(() => {
//     dispatch(fetchPendingLeaveApplications());
//   }, [dispatch]);

//   // ✅ Clear messages automatically after 3 seconds
//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => dispatch(clearMessages()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage, dispatch]);

//   const handleAction = (action, id) => {
//     const status = action === "Approve" ? "Approved" : "Rejected";
//     dispatch(updateLeaveStatus({ id, status }));
//   };

//   const applicationsArray = Array.isArray(pendingApplications)
//     ? pendingApplications
//     : [];

//   return (
//     <Box
//       sx={{
//         maxWidth: 1200,
//         mx: "auto",
//         mt: 4,
//         p: 3,
//         boxShadow: 3,
//         borderRadius: "8px",
//         bgcolor: "#f8f9fa",
//         border: "1px solid #e0e0e0",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       <Typography
//         variant="h5"
//         align="center"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           mb: 2,
//           color: "#212121",
//           textTransform: "uppercase",
//           letterSpacing: "1px",
//         }}
//       >
//         Pending Leave Applications
//       </Typography>

//       {/* ✅ Show success or error message */}
//       {successMessage && (
//         <Alert severity="success" sx={{ mb: 2, fontSize: "0.9rem" }}>
//           {successMessage}
//         </Alert>
//       )}
//       {errorMessage && (
//         <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
//           {errorMessage}
//         </Alert>
//       )}

//       {loading ? (
//         <Typography align="center">Loading...</Typography>
//       ) : (
//         <TableContainer
//           component={Paper}
//           sx={{ maxHeight: "400px", overflowX: "auto" }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#798bb8" }}>
//                 {!isMobile && (
//                   <>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       ID
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Student Name
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Hostel Name
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Reason
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Start Date
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       End Date
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Total Days
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Address
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Leave Type
//                     </TableCell>
//                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                       Actions
//                     </TableCell>
//                   </>
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {applicationsArray.map((application) => (
//                 <TableRow key={application._id}>
//                   <TableCell>{application._id}</TableCell>
//                   <TableCell>{application.student?.name || "N/A"}</TableCell>
//                   <TableCell>
//                     {application.student?.hostelName || "N/A"}
//                   </TableCell>
//                   <TableCell>{application.reasonOfLeave || "N/A"}</TableCell>
//                   <TableCell>
//                     {new Date(application.startDate).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(application.endDate).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>{application.totalDays || "N/A"}</TableCell>
//                   <TableCell>{application.addressToGo || "N/A"}</TableCell>
//                   <TableCell>{application.leaveType || "N/A"}</TableCell>
//                   <TableCell>
//                     <ButtonGroup>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleAction("Approve", application._id)}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleAction("Reject", application._id)}
//                       >
//                         Reject
//                       </Button>
//                     </ButtonGroup>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default PendingLeaveApplications;
// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   ButtonGroup,
//   Alert,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingLeaveApplications,
//   updateLeaveStatus,
//   clearMessages, // ✅ Import clearMessages action
// } from "../../../redux/features/leaveSlice";

// const PendingLeaveApplications = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const dispatch = useDispatch();

//   const { pendingApplications, loading, errorMessage, successMessage } =
//     useSelector((state) => state.leave);

//   useEffect(() => {
//     dispatch(fetchPendingLeaveApplications());
//   }, [dispatch]);

//   // ✅ Clear messages automatically after 3 seconds
//   useEffect(() => {
//     if (successMessage || errorMessage) {
//       const timer = setTimeout(() => dispatch(clearMessages()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, errorMessage, dispatch]);

//   const handleAction = (action, id) => {
//     const status = action === "Approve" ? "Approved" : "Rejected";
//     dispatch(updateLeaveStatus({ id, status }));
//   };

//   const applicationsArray = Array.isArray(pendingApplications)
//     ? pendingApplications
//     : [];

//   // ✅ Show message if there are no pending applications
//   if (loading) {
//     return (
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
//         <Typography variant="h6" align="center">
//           Loading applications...
//         </Typography>
//       </Box>
//     );
//   }

//   if (errorMessage) {
//     return (
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
//         <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
//           {errorMessage}
//         </Alert>
//       </Box>
//     );
//   }

//   if (applicationsArray.length === 0) {
//     return (
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           mt: 4,
//           p: 3,
//           boxShadow: 3,
//           borderRadius: "8px",
//           bgcolor: "#f8f9fa",
//           border: "1px solid #e0e0e0",
//           fontFamily: "'Poppins', sans-serif",
//         }}
//       >
//         <Typography
//           variant="h5"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: 600,
//             mb: 2,
//             color: "#212121",
//             textTransform: "uppercase",
//             letterSpacing: "1px",
//           }}
//         >
//           Pending Leave Applications
//         </Typography>
//         <Typography variant="h6" align="center">
//           No pending leave applications found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: 1200,
//         mx: "auto",
//         mt: 4,
//         p: 3,
//         boxShadow: 3,
//         borderRadius: "8px",
//         bgcolor: "#f8f9fa",
//         border: "1px solid #e0e0e0",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       <Typography
//         variant="h5"
//         align="center"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           mb: 2,
//           color: "#212121",
//           textTransform: "uppercase",
//           letterSpacing: "1px",
//         }}
//       >
//         Pending Leave Applications
//       </Typography>

//       {/* ✅ Show success or error message */}
//       {successMessage && (
//         <Alert severity="success" sx={{ mb: 2, fontSize: "0.9rem" }}>
//           {successMessage}
//         </Alert>
//       )}
//       {errorMessage && (
//         <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
//           {errorMessage}
//         </Alert>
//       )}

//       <TableContainer
//         component={Paper}
//         sx={{ maxHeight: "400px", overflowX: "auto" }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#798bb8" }}>
//               {!isMobile && (
//                 <>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     ID
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Student Name
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Hostel Name
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Reason
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Start Date
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     End Date
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Total Days
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Address
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Leave Type
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Actions
//                   </TableCell>
//                 </>
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {applicationsArray.map((application) => (
//               <TableRow key={application._id}>
//                 <TableCell>{application._id}</TableCell>
//                 <TableCell>{application.student?.name || "N/A"}</TableCell>
//                 <TableCell>
//                   {application.student?.hostelName || "N/A"}
//                 </TableCell>
//                 <TableCell>{application.reasonOfLeave || "N/A"}</TableCell>
//                 <TableCell>
//                   {new Date(application.startDate).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   {new Date(application.endDate).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>{application.totalDays || "N/A"}</TableCell>
//                 <TableCell>{application.addressToGo || "N/A"}</TableCell>
//                 <TableCell>{application.leaveType || "N/A"}</TableCell>
//                 <TableCell>
//                   <ButtonGroup>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       onClick={() => handleAction("Approve", application._id)}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleAction("Reject", application._id)}
//                     >
//                       Reject
//                     </Button>
//                   </ButtonGroup>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default PendingLeaveApplications;
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingLeaveApplications,
  updateLeaveStatus,
  clearMessages,
} from "../../../redux/features/leaveSlice";

const PendingLeaveApplications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  const { pendingApplications, loading, errorMessage, successMessage } =
    useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(fetchPendingLeaveApplications());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleAction = (action, id) => {
    const status = action === "Approve" ? "Approved" : "Rejected";
    dispatch(updateLeaveStatus({ id, status }));
  };

  const applicationsArray = Array.isArray(pendingApplications)
    ? pendingApplications
    : [];

  // ✅ Show "No Pending Applications" message without header
  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h6" align="center">
          Loading applications...
        </Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
        <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  if (applicationsArray.length === 0) {
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
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No pending leave applications found.
        </Typography>
      </Box>
    );
  }

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

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {errorMessage}
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
            {applicationsArray.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application._id}</TableCell>
                <TableCell>{application.student?.name || "N/A"}</TableCell>
                <TableCell>
                  {application.student?.hostelName || "N/A"}
                </TableCell>
                <TableCell>{application.reasonOfLeave || "N/A"}</TableCell>
                <TableCell>
                  {new Date(application.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(application.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{application.totalDays || "N/A"}</TableCell>
                <TableCell>{application.addressToGo || "N/A"}</TableCell>
                <TableCell>{application.leaveType || "N/A"}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAction("Approve", application._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleAction("Reject", application._id)}
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingLeaveApplications;
