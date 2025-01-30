import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

// Poll Data
const demoPolls = [
  {
    _id: "1",
    question: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "C++", "Java"],
  },
  {
    _id: "2",
    question: "Which frontend framework do you prefer?",
    options: ["React", "Vue", "Angular", "Svelte"],
  },
];

const demoResults = {
  1: { JavaScript: 10, Python: 15, "C++": 5, Java: 7 },
  2: { React: 20, Vue: 8, Angular: 6, Svelte: 4 },
};

// Styled ProgressBar with smooth transition for width change
const StyledLinearProgress = styled(LinearProgress)({
  height: 12,
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
});

const Polls = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState(demoResults);

  // Handle option selection (only updates state, doesn't increase count)
  const handleSelectOption = (pollId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: option }));
  };

  // Handle vote submission (only increases count on submit)
  const handleVote = (pollId) => {
    const selectedOption = selectedOptions[pollId];
    if (!selectedOption) return; // Do nothing if no option selected

    setResults((prevResults) => {
      const updatedResults = { ...prevResults };
      updatedResults[pollId][selectedOption] += 1;
      return updatedResults;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#000000", fontWeight: "bold" }}
      >
        Available Polls
      </Typography>
      {demoPolls.map((poll) => {
        const totalVotes = Object.values(results[poll._id] || {}).reduce(
          (acc, val) => acc + val,
          0
        );

        return (
          <motion.div
            key={poll._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ marginBottom: 4, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 2, color: "#000000" }}
                >
                  {poll.question}
                </Typography>
                <RadioGroup
                  value={selectedOptions[poll._id] || ""}
                  onChange={(e) => handleSelectOption(poll._id, e.target.value)}
                >
                  {poll.options.map((option) => {
                    const optionVotes = results[poll._id]?.[option] || 0;
                    const votePercentage = totalVotes
                      ? (optionVotes / totalVotes) * 100
                      : 0;

                    return (
                      <Box key={option} sx={{ marginBottom: 3 }}>
                        <FormControlLabel
                          value={option}
                          control={<Radio />}
                          label={`${option} (${optionVotes} votes)`}
                          sx={{ fontSize: 16, color: "#333" }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${votePercentage}%` }}
                            transition={{ duration: 1 }}
                            style={{ width: "100%" }}
                          >
                            <StyledLinearProgress
                              variant="determinate"
                              value={votePercentage}
                            />
                          </motion.div>
                          <Typography
                            variant="caption"
                            sx={{ marginLeft: 1, fontWeight: "bold" }}
                          >
                            {Math.round(votePercentage)}%
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </RadioGroup>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#007bff",
                      color: "white",
                      paddingX: 3,
                      paddingY: 1.5,
                      borderRadius: 2,
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                    onClick={() => handleVote(poll._id)}
                  >
                    Submit Vote
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </Container>
  );
};

export default Polls;

// import React, { useState } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { motion } from "framer-motion"; // Import motion from framer-motion

// // Poll Data
// const demoPolls = [
//   {
//     _id: "1",
//     question: "What is your favorite programming language?",
//     options: ["JavaScript", "Python", "C++", "Java"],
//   },
//   {
//     _id: "2",
//     question: "Which frontend framework do you prefer?",
//     options: ["React", "Vue", "Angular", "Svelte"],
//   },
// ];

// const demoResults = {
//   1: { JavaScript: 10, Python: 15, "C++": 5, Java: 7 },
//   2: { React: 20, Vue: 8, Angular: 6, Svelte: 4 },
// };

// // Styled ProgressBar with smooth transition for width change
// const StyledBox = styled(Box)(({ theme }) => ({
//   height: 12,
//   borderRadius: 8,
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   overflow: "hidden",
//   width: "100%", // Ensuring that the box takes full width
// }));

// const Polls = () => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [results, setResults] = useState(demoResults); // Store the updated results

//   const handleVote = (pollId, selectedOption) => {
//     if (!selectedOption || submittedVotes[pollId]) return;
//     // Update the vote for the selected option
//     setResults((prevResults) => {
//       const updatedResults = { ...prevResults };
//       updatedResults[pollId][selectedOption] += 1;

//       // Decrease the vote count for the previously selected option, if any
//       const previousOption = selectedOptions[pollId];
//       if (previousOption && previousOption !== selectedOption) {
//         updatedResults[pollId][previousOption] -= 1;
//       }

//       return updatedResults;
//     });

//     // Store the selected option for that poll
//     setSelectedOptions((prevSelectedOptions) => ({
//       ...prevSelectedOptions,
//       [pollId]: selectedOption,
//     }));
//   };

//   return (
//     <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: "#007bff", fontWeight: "bold" }}
//       >
//         Available Polls
//       </Typography>
//       {demoPolls.map((poll) => {
//         const totalVotes = Object.values(results[poll._id] || {}).reduce(
//           (acc, val) => acc + val,
//           0
//         );

//         return (
//           <Card
//             key={poll._id}
//             sx={{ marginBottom: 4, borderRadius: 2, boxShadow: 3 }}
//           >
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", marginBottom: 2, color: "#007bff" }}
//               >
//                 {poll.question}
//               </Typography>
//               <RadioGroup
//                 value={selectedOptions[poll._id] || ""}
//                 onChange={(e) => handleVote(poll._id, e.target.value)}
//               >
//                 {poll.options.map((option) => {
//                   const optionVotes = results[poll._id]?.[option] || 0;
//                   const votePercentage = totalVotes
//                     ? (optionVotes / totalVotes) * 100
//                     : 0;

//                   return (
//                     <Box key={option} sx={{ marginBottom: 3 }}>
//                       <FormControlLabel
//                         value={option}
//                         control={<Radio />}
//                         label={`${option} (${optionVotes} votes)`}
//                         sx={{ fontSize: 16, color: "#333" }}
//                       />
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <StyledBox sx={{ width: "100%" }}>
//                           <motion.div
//                             style={{
//                               height: "100%",
//                               backgroundColor: "#007bff",
//                               borderRadius: "8px",
//                             }}
//                             initial={{ width: 0 }} // Start with width 0
//                             animate={{ width: `${votePercentage}%` }} // Animate to the percentage width
//                             transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
//                           />
//                         </StyledBox>
//                         <Typography
//                           variant="caption"
//                           sx={{ marginLeft: 1, fontWeight: "bold" }}
//                         >
//                           {Math.round(votePercentage)}%
//                         </Typography>
//                       </Box>
//                     </Box>
//                   );
//                 })}
//               </RadioGroup>
//               <Box display="flex" justifyContent="flex-end">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#007bff", // Using the theme color for the button
//                     color: "white",
//                     paddingX: 3,
//                     paddingY: 1.5,
//                     borderRadius: 2,
//                     "&:hover": { backgroundColor: "#0056b3" }, // Darker shade of blue on hover
//                   }}
//                   onClick={() =>
//                     handleVote(poll._id, selectedOptions[poll._id])
//                   }
//                 >
//                   Submit Vote
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </Container>
//   );
// };

// export default Polls;
