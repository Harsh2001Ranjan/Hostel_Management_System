// // import React, { useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Button,
// //   ButtonGroup,
// //   Alert,
// //   useMediaQuery,
// // } from "@mui/material";
// // import { useTheme } from "@mui/material/styles";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchPendingLeaveApplications } from "../../../redux/features/leaveSlice";

// // const PendingLeaveApplications = () => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery("(max-width: 768px)");
// //   const dispatch = useDispatch();

// //   const { pendingApplications, loading, error } = useSelector(
// //     (state) => state.leave
// //   );

// //   useEffect(() => {
// //     dispatch(fetchPendingLeaveApplications());
// //   }, [dispatch]);

// //   const handleAction = (action, id) => {
// //     alert(`${action} leave application with ID ${id}`);
// //   };

// //   const applicationsArray = Array.isArray(pendingApplications)
// //     ? pendingApplications
// //     : [];

// //   return (
// //     <Box
// //       sx={{
// //         maxWidth: 1200,
// //         mx: "auto",
// //         mt: 4,
// //         p: 3,
// //         boxShadow: 3,
// //         borderRadius: "8px",
// //         bgcolor: "#f8f9fa",
// //         border: "1px solid #e0e0e0",
// //         fontFamily: "'Poppins', sans-serif",
// //       }}
// //     >
// //       <Typography
// //         variant="h5"
// //         align="center"
// //         gutterBottom
// //         sx={{
// //           fontWeight: 600,
// //           mb: 2,
// //           color: "#212121",
// //           textTransform: "uppercase",
// //           letterSpacing: "1px",
// //         }}
// //       >
// //         Pending Leave Applications
// //       </Typography>

// //       {error && (
// //         <Alert
// //           severity="error"
// //           sx={{
// //             mb: 2,
// //             fontSize: "0.9rem",
// //             bgcolor: "#f8d7da",
// //             color: "#842029",
// //           }}
// //         >
// //           {error}
// //         </Alert>
// //       )}

// //       {loading ? (
// //         <Typography align="center">Loading...</Typography>
// //       ) : (
// //         <TableContainer
// //           component={Paper}
// //           sx={{ maxHeight: "400px", overflowX: "auto" }}
// //         >
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: "#798bb8" }}>
// //                 {!isMobile && (
// //                   <>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       ID
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Student Name
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Hostel Name
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Reason
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Start Date
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       End Date
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Total Days
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Address
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Leave Type
// //                     </TableCell>
// //                     <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// //                       Actions
// //                     </TableCell>
// //                   </>
// //                 )}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {applicationsArray.map((application) => (
// //                 <TableRow key={application._id}>
// //                   {isMobile ? (
// //                     <TableCell colSpan={2}>
// //                       <Box sx={{ display: "block", mb: 2 }}>
// //                         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
// //                           Student: {application.student.name}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Hostel: {application.student.hostelName}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Reason: {application.reasonOfLeave}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Start Date:{" "}
// //                           {new Date(application.startDate).toLocaleDateString()}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           End Date:{" "}
// //                           {new Date(application.endDate).toLocaleDateString()}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Total Days: {application.totalDays}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Address: {application.addressToGo}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           Leave Type: {application.leaveType}
// //                         </Typography>

// //                         <ButtonGroup sx={{ mt: 2 }}>
// //                           <Button
// //                             variant="contained"
// //                             sx={{
// //                               bgcolor: "green",
// //                               color: "#fff",
// //                               fontSize: "0.8rem",
// //                               "&:hover": { bgcolor: "darkgreen" },
// //                             }}
// //                             onClick={() =>
// //                               handleAction("Approve", application._id)
// //                             }
// //                           >
// //                             Approve
// //                           </Button>
// //                           <Button
// //                             variant="contained"
// //                             sx={{
// //                               bgcolor: "#dc3545",
// //                               color: "#fff",
// //                               fontSize: "0.8rem",
// //                               "&:hover": { bgcolor: "#a71d2a" },
// //                             }}
// //                             onClick={() =>
// //                               handleAction("Reject", application._id)
// //                             }
// //                           >
// //                             Reject
// //                           </Button>
// //                         </ButtonGroup>
// //                       </Box>
// //                     </TableCell>
// //                   ) : (
// //                     <>
// //                       <TableCell>{application._id}</TableCell>
// //                       <TableCell>{application.student.name}</TableCell>
// //                       <TableCell>{application.student.hostelName}</TableCell>
// //                       <TableCell>{application.reasonOfLeave}</TableCell>
// //                       <TableCell>
// //                         {new Date(application.startDate).toLocaleDateString()}
// //                       </TableCell>
// //                       <TableCell>
// //                         {new Date(application.endDate).toLocaleDateString()}
// //                       </TableCell>
// //                       <TableCell>{application.totalDays}</TableCell>
// //                       <TableCell>{application.addressToGo}</TableCell>
// //                       <TableCell>{application.leaveType}</TableCell>
// //                       <TableCell>
// //                         <ButtonGroup>
// //                           <Button
// //                             variant="contained"
// //                             sx={{
// //                               bgcolor: "green",
// //                               color: "#fff",
// //                               fontSize: "0.8rem",
// //                               "&:hover": { bgcolor: "darkgreen" },
// //                             }}
// //                             onClick={() =>
// //                               handleAction("Approve", application._id)
// //                             }
// //                           >
// //                             Approve
// //                           </Button>
// //                           <Button
// //                             variant="contained"
// //                             sx={{
// //                               bgcolor: "#dc3545",
// //                               color: "#fff",
// //                               fontSize: "0.8rem",
// //                               "&:hover": { bgcolor: "#a71d2a" },
// //                             }}
// //                             onClick={() =>
// //                               handleAction("Reject", application._id)
// //                             }
// //                           >
// //                             Reject
// //                           </Button>
// //                         </ButtonGroup>
// //                       </TableCell>
// //                     </>
// //                   )}
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //     </Box>
// //   );
// // };

// // export default PendingLeaveApplications;
// //////////////////////////////////////////////////////////////////////////////////////////////////////
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
// } from "../../../redux/features/leaveSlice";

// const PendingLeaveApplications = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const dispatch = useDispatch();

//   const { pendingApplications, loading, error } = useSelector(
//     (state) => state.leave
//   );

//   useEffect(() => {
//     dispatch(fetchPendingLeaveApplications());
//   }, [dispatch]);

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

//       {error && (
//         <Alert
//           severity="error"
//           sx={{
//             mb: 2,
//             fontSize: "0.9rem",
//             bgcolor: "#f8d7da",
//             color: "#842029",
//           }}
//         >
//           {error}
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
//                   {isMobile ? (
//                     <TableCell colSpan={2}>
//                       <Box sx={{ display: "block", mb: 2 }}>
//                         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                           Student: {application.student.name}
//                         </Typography>
//                         <Typography variant="body2">
//                           Hostel: {application.student.hostelName}
//                         </Typography>
//                         <Typography variant="body2">
//                           Reason: {application.reasonOfLeave}
//                         </Typography>
//                         <Typography variant="body2">
//                           Start Date:{" "}
//                           {new Date(application.startDate).toLocaleDateString()}
//                         </Typography>
//                         <Typography variant="body2">
//                           End Date:{" "}
//                           {new Date(application.endDate).toLocaleDateString()}
//                         </Typography>
//                         <Typography variant="body2">
//                           Total Days: {application.totalDays}
//                         </Typography>
//                         <Typography variant="body2">
//                           Address: {application.addressToGo}
//                         </Typography>
//                         <Typography variant="body2">
//                           Leave Type: {application.leaveType}
//                         </Typography>

//                         <ButtonGroup sx={{ mt: 2 }}>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               bgcolor: "green",
//                               color: "#fff",
//                               fontSize: "0.8rem",
//                               "&:hover": { bgcolor: "darkgreen" },
//                             }}
//                             onClick={() =>
//                               handleAction("Approve", application._id)
//                             }
//                           >
//                             Approve
//                           </Button>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               bgcolor: "#dc3545",
//                               color: "#fff",
//                               fontSize: "0.8rem",
//                               "&:hover": { bgcolor: "#a71d2a" },
//                             }}
//                             onClick={() =>
//                               handleAction("Reject", application._id)
//                             }
//                           >
//                             Reject
//                           </Button>
//                         </ButtonGroup>
//                       </Box>
//                     </TableCell>
//                   ) : (
//                     <>
//                       <TableCell>{application._id}</TableCell>
//                       <TableCell>{application.student.name}</TableCell>
//                       <TableCell>{application.student.hostelName}</TableCell>
//                       <TableCell>{application.reasonOfLeave}</TableCell>
//                       <TableCell>
//                         {new Date(application.startDate).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell>
//                         {new Date(application.endDate).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell>{application.totalDays}</TableCell>
//                       <TableCell>{application.addressToGo}</TableCell>
//                       <TableCell>{application.leaveType}</TableCell>
//                       <TableCell>
//                         <ButtonGroup>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               bgcolor: "green",
//                               color: "#fff",
//                               fontSize: "0.8rem",
//                               "&:hover": { bgcolor: "darkgreen" },
//                             }}
//                             onClick={() =>
//                               handleAction("Approve", application._id)
//                             }
//                           >
//                             Approve
//                           </Button>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               bgcolor: "#dc3545",
//                               color: "#fff",
//                               fontSize: "0.8rem",
//                               "&:hover": { bgcolor: "#a71d2a" },
//                             }}
//                             onClick={() =>
//                               handleAction("Reject", application._id)
//                             }
//                           >
//                             Reject
//                           </Button>
//                         </ButtonGroup>
//                       </TableCell>
//                     </>
//                   )}
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
} from "../../../redux/features/leaveSlice";

const PendingLeaveApplications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  const { pendingApplications, loading, error } = useSelector(
    (state) => state.leave
  );

  useEffect(() => {
    dispatch(fetchPendingLeaveApplications());
  }, [dispatch]);

  const handleAction = (action, id) => {
    const status = action === "Approve" ? "Approved" : "Rejected";
    dispatch(updateLeaveStatus({ id, status }));
  };

  const applicationsArray = Array.isArray(pendingApplications)
    ? pendingApplications
    : [];

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

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#f8d7da",
            color: "#842029",
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
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
                  {isMobile ? (
                    <TableCell colSpan={2}>
                      <Box sx={{ display: "block", mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          Student: {application.student?.name || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Hostel: {application.student?.hostelName || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Reason: {application.reasonOfLeave || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Start Date:{" "}
                          {new Date(application.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          End Date:{" "}
                          {new Date(application.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          Total Days: {application.totalDays || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Address: {application.addressToGo || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Leave Type: {application.leaveType || "N/A"}
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
                              handleAction("Approve", application._id)
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
                            onClick={() =>
                              handleAction("Reject", application._id)
                            }
                          >
                            Reject
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell>{application._id}</TableCell>
                      <TableCell>
                        {application.student?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        {application.student?.hostelName || "N/A"}
                      </TableCell>
                      <TableCell>
                        {application.reasonOfLeave || "N/A"}
                      </TableCell>
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
                            sx={{
                              bgcolor: "green",
                              color: "#fff",
                              fontSize: "0.8rem",
                              "&:hover": { bgcolor: "darkgreen" },
                            }}
                            onClick={() =>
                              handleAction("Approve", application._id)
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
                            onClick={() =>
                              handleAction("Reject", application._id)
                            }
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
      )}
    </Box>
  );
};

export default PendingLeaveApplications;
