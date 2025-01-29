import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
} from "@mui/icons-material";

// Styles for the table and page
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: "#f4f6f9", // Light background for the page
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif", // Elegant sans-serif font for body text
  },
  table: {
    minWidth: 750,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    backgroundColor: "#798bb8", // Theme color for table header
    color: "#fff", // White text for header
    fontFamily: "'Merriweather', serif", // Elegant serif font for header
    textTransform: "uppercase", // Uppercase header for sophistication
    letterSpacing: "1px", // Letter spacing for better readability
  },
  tableCell: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3c3c3c",
    padding: theme.spacing(2),
    fontFamily: "'Roboto', sans-serif", // Sans-serif for body text
  },
  feedbackIcon: {
    fontSize: 24,
    marginLeft: theme.spacing(1),
  },
  reaction: {
    display: "flex",
    alignItems: "center",
  },
  reactionText: {
    fontSize: 14,
    marginLeft: theme.spacing(1),
  },
  noFeedbackText: {
    marginTop: theme.spacing(3),
    textAlign: "center",
    color: "#798bb8", // Use theme color for no feedback message
    fontFamily: "'Merriweather', serif", // Elegant serif font
    fontSize: "18px", // Slightly larger font size
  },
  title: {
    color: "#798bb8", // Title color using the theme color
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    fontFamily: "'Merriweather', serif", // Elegant serif font for title
    fontSize: "2rem", // Larger title size for a more prominent appearance
    textTransform: "capitalize", // Capitalize first letters
    letterSpacing: "0.5px", // Slight letter-spacing for an elegant touch
  },
  errorText: {
    color: "#f44336", // Red for error text
    fontFamily: "'Roboto', sans-serif", // Sans-serif for body text
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CurrentMonthFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const classes = useStyles();

  // Simulate demo feedback data
  useEffect(() => {
    setTimeout(() => {
      // Simulated feedback data
      const demoFeedbacks = [
        {
          _id: "1",
          studentId: "12345",
          foodQuality: 4,
          service: 5,
          cleanliness: 3,
          comment:
            "The food quality is good, but cleanliness needs improvement.",
        },
        {
          _id: "2",
          studentId: "67890",
          foodQuality: 3,
          service: 4,
          cleanliness: 4,
          comment: "Service is okay, but the food could be better.",
        },
        {
          _id: "3",
          studentId: "11223",
          foodQuality: 5,
          service: 5,
          cleanliness: 5,
          comment: "Excellent service and food quality.",
        },
      ];
      setFeedbacks(demoFeedbacks);
      setLoading(false);
    }, 1500);
  }, []);

  const getRatingReaction = (rating) => {
    if (rating >= 4) return <SentimentSatisfied color="success" />;
    if (rating === 3) return <SentimentNeutral color="warning" />;
    return <SentimentDissatisfied color="error" />;
  };

  if (loading) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className={classes.container}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" className={classes.errorText}>
          {error}
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
                <TableCell className={classes.tableCell}>Reactions</TableCell>
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
                  <TableCell>
                    <Box className={classes.reaction}>
                      {getRatingReaction(feedback.foodQuality)}
                      {getRatingReaction(feedback.service)}
                      {getRatingReaction(feedback.cleanliness)}
                    </Box>
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

export default CurrentMonthFeedback;

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
//   Avatar,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import {
//   SentimentSatisfied,
//   SentimentNeutral,
//   SentimentDissatisfied,
// } from "@mui/icons-material";

// // Styles for the table and page
// const useStyles = makeStyles((theme) => ({
//   container: {
//     padding: theme.spacing(4),
//     backgroundColor: "#f4f6f9", // Light background for the page
//     minHeight: "100vh",
//   },
//   table: {
//     minWidth: 750,
//     borderRadius: 8,
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     backgroundColor: "#798bb8", // Theme color for table header
//     color: "#fff", // White text for header
//   },
//   tableCell: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#3c3c3c",
//     padding: theme.spacing(2),
//   },
//   feedbackIcon: {
//     fontSize: 24,
//     marginLeft: theme.spacing(1),
//   },
//   reaction: {
//     display: "flex",
//     alignItems: "center",
//   },
//   reactionText: {
//     fontSize: 14,
//     marginLeft: theme.spacing(1),
//   },
//   noFeedbackText: {
//     marginTop: theme.spacing(3),
//     textAlign: "center",
//     color: "#798bb8", // Use theme color for no feedback message
//   },
//   title: {
//     color: "#798bb8", // Title color using the theme color
//     fontWeight: "bold",
//     marginBottom: theme.spacing(3),
//   },
//   errorText: {
//     color: "#f44336", // Red for error text
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
//       // Simulated feedback data
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

//   const getRatingReaction = (rating) => {
//     if (rating >= 4) return <SentimentSatisfied color="success" />;
//     if (rating === 3) return <SentimentNeutral color="warning" />;
//     return <SentimentDissatisfied color="error" />;
//   };

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
//                 <TableCell className={classes.tableCell}>Reactions</TableCell>
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
//                   <TableCell>
//                     <Box className={classes.reaction}>
//                       {getRatingReaction(feedback.foodQuality)}
//                       {getRatingReaction(feedback.service)}
//                       {getRatingReaction(feedback.cleanliness)}
//                     </Box>
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

// export default CurrentMonthFeedback;
