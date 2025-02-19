// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// // Styles for the table and page
// const useStyles = makeStyles((theme) => ({
//   container: {
//     padding: theme.spacing(4),
//     backgroundColor: "#f4f6f9", // Light background for the page
//     minHeight: "100vh",
//     fontFamily: "'Roboto', sans-serif",
//   },
//   table: {
//     minWidth: 750,
//     borderRadius: 8,
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     backgroundColor: "#798bb8",
//     color: "#fff",
//     fontFamily: "'Merriweather', serif",
//     textTransform: "uppercase",
//     letterSpacing: "1px",
//   },
//   tableCell: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#3c3c3c",
//     padding: theme.spacing(2),
//     fontFamily: "'Roboto', sans-serif",
//   },
//   noFeedbackText: {
//     marginTop: theme.spacing(3),
//     textAlign: "center",
//     color: "#798bb8",
//     fontFamily: "'Merriweather', serif",
//     fontSize: "18px",
//   },
//   title: {
//     color: "#798bb8",
//     fontWeight: "bold",
//     marginBottom: theme.spacing(3),
//     fontFamily: "'Merriweather', serif",
//     fontSize: "2rem",
//     textTransform: "capitalize",
//     letterSpacing: "0.5px",
//   },
//   errorText: {
//     color: "#f44336",
//     fontFamily: "'Roboto', sans-serif",
//   },
//   loader: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// }));

// const CurrentMonthFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const classes = useStyles();

//   // Simulate demo feedback data
//   useEffect(() => {
//     setTimeout(() => {
//       const demoFeedbacks = [
//         {
//           _id: "1",
//           studentId: "12345",
//           foodQuality: 4,
//           service: 5,
//           cleanliness: 3,
//           comment:
//             "The food quality is good, but cleanliness needs improvement.",
//         },
//         {
//           _id: "2",
//           studentId: "67890",
//           foodQuality: 3,
//           service: 4,
//           cleanliness: 4,
//           comment: "Service is okay, but the food could be better.",
//         },
//         {
//           _id: "3",
//           studentId: "11223",
//           foodQuality: 5,
//           service: 5,
//           cleanliness: 5,
//           comment: "Excellent service and food quality.",
//         },
//       ];
//       setFeedbacks(demoFeedbacks);
//       setLoading(false);
//     }, 1500);
//   }, []);

//   if (loading) {
//     return (
//       <Box className={classes.loader}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         className={classes.container}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Typography variant="h6" className={classes.errorText}>
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box className={classes.container}>
//       <Typography variant="h5" gutterBottom className={classes.title}>
//         Feedback for the Current Month
//       </Typography>

//       {feedbacks.length === 0 ? (
//         <Typography
//           variant="h6"
//           className={classes.noFeedbackText}
//           color="textSecondary"
//         >
//           No feedback found for this month.
//         </Typography>
//       ) : (
//         <TableContainer>
//           <Table className={classes.table} aria-label="feedback table">
//             <TableHead className={classes.header}>
//               <TableRow>
//                 <TableCell className={classes.tableCell}>Student ID</TableCell>
//                 <TableCell className={classes.tableCell}>
//                   Food Quality
//                 </TableCell>
//                 <TableCell className={classes.tableCell}>Service</TableCell>
//                 <TableCell className={classes.tableCell}>Cleanliness</TableCell>
//                 <TableCell className={classes.tableCell}>Comments</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {feedbacks.map((feedback) => (
//                 <TableRow key={feedback._id}>
//                   <TableCell>{feedback.studentId}</TableCell>
//                   <TableCell>{feedback.foodQuality}</TableCell>
//                   <TableCell>{feedback.service}</TableCell>
//                   <TableCell>{feedback.cleanliness}</TableCell>
//                   <TableCell>{feedback.comment || "No comments"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default CurrentMonthFeedback;
// CurrentMonthFeedback.js
import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentMonthFeedbacks } from "../../../../redux/features/Mess/feedbackSlice";

// Styles for the table and page
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: "#f4f6f9", // Light background for the page
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif",
  },
  table: {
    minWidth: 750,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    backgroundColor: "#798bb8",
    color: "#fff",
    fontFamily: "'Merriweather', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  tableCell: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3c3c3c",
    padding: theme.spacing(2),
    fontFamily: "'Roboto', sans-serif",
  },
  noFeedbackText: {
    marginTop: theme.spacing(3),
    textAlign: "center",
    color: "#798bb8",
    fontFamily: "'Merriweather', serif",
    fontSize: "18px",
  },
  title: {
    color: "#798bb8",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    fontFamily: "'Merriweather', serif",
    fontSize: "2rem",
    textTransform: "capitalize",
    letterSpacing: "0.5px",
  },
  errorText: {
    color: "#f44336",
    fontFamily: "'Roboto', sans-serif",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CurrentMonthFeedback = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { feedbacks, fetchLoading, fetchError } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    dispatch(fetchCurrentMonthFeedbacks());
  }, [dispatch]);

  if (fetchLoading) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Box
        className={classes.container}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" className={classes.errorText}>
          {fetchError}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Feedback for the Current Month
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography
          variant="h6"
          className={classes.noFeedbackText}
          color="textSecondary"
        >
          No feedback found for this month.
        </Typography>
      ) : (
        <TableContainer>
          <Table className={classes.table} aria-label="feedback table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell className={classes.tableCell}>Student ID</TableCell>
                <TableCell className={classes.tableCell}>
                  Food Quality
                </TableCell>
                <TableCell className={classes.tableCell}>Service</TableCell>
                <TableCell className={classes.tableCell}>Cleanliness</TableCell>
                <TableCell className={classes.tableCell}>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell>{feedback.studentId}</TableCell>
                  <TableCell>{feedback.foodQuality}</TableCell>
                  <TableCell>{feedback.service}</TableCell>
                  <TableCell>{feedback.cleanliness}</TableCell>
                  <TableCell>{feedback.comment || "No comments"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CurrentMonthFeedback;
