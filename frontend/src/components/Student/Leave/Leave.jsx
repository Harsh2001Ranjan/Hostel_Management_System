// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   Box,
//   Typography,
//   Alert,
// } from "@mui/material";

// const LeaveApplicationForm = () => {
//   const [formData, setFormData] = useState({
//     reasonOfLeave: "",
//     leaveType: "",
//     startDate: "",
//     endDate: "",
//     addressToGo: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const leaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     // Mock API call
//     const isValid = Math.random() > 0.2; // Simulates success or failure
//     if (isValid) {
//       setSuccessMessage("Leave application submitted successfully!");
//       setFormData({
//         reasonOfLeave: "",
//         leaveType: "",
//         startDate: "",
//         endDate: "",
//         addressToGo: "",
//       });
//     } else {
//       setErrorMessage("Failed to submit leave application. Please try again.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
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
//         Leave Application Form
//       </Typography>

//       {errorMessage && (
//         <Alert
//           severity="error"
//           sx={{
//             mb: 2,
//             fontSize: "0.9rem",
//             bgcolor: "#f8d7da",
//             color: "#842029",
//           }}
//         >
//           {errorMessage}
//         </Alert>
//       )}
//       {successMessage && (
//         <Alert
//           severity="success"
//           sx={{
//             mb: 2,
//             fontSize: "0.9rem",
//             bgcolor: "#d1e7dd",
//             color: "#0f5132",
//           }}
//         >
//           {successMessage}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Reason for Leave"
//               name="reasonOfLeave"
//               value={formData.reasonOfLeave}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: "1rem",
//                   borderRadius: "6px",
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   color: "#6c757d",
//                   fontSize: "0.9rem",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               select
//               label="Leave Type"
//               name="leaveType"
//               value={formData.leaveType}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: "1rem",
//                   borderRadius: "6px",
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   color: "#6c757d",
//                   fontSize: "0.9rem",
//                 },
//               }}
//             >
//               {leaveTypes.map((type, index) => (
//                 <MenuItem key={index} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Start Date"
//               name="startDate"
//               InputLabelProps={{ shrink: true }}
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: "1rem",
//                   borderRadius: "6px",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               type="date"
//               label="End Date"
//               name="endDate"
//               InputLabelProps={{ shrink: true }}
//               value={formData.endDate}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: "1rem",
//                   borderRadius: "6px",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Address to Go"
//               name="addressToGo"
//               value={formData.addressToGo}
//               onChange={handleChange}
//               multiline
//               rows={2}
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: "1rem",
//                   borderRadius: "6px",
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   color: "#6c757d",
//                   fontSize: "0.9rem",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 bgcolor: "#007bff",
//                 color: "#fff",
//                 py: 1.5,
//                 fontSize: "1rem",
//                 "&:hover": {
//                   bgcolor: "#0056b3",
//                 },
//               }}
//             >
//               Submit Application
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default LeaveApplicationForm;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import {
  submitLeaveApplication,
  clearMessages,
} from "../../../redux/features/leaveSlice";

const LeaveApplicationForm = () => {
  const [formData, setFormData] = useState({
    reasonOfLeave: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    addressToGo: "",
  });

  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector((state) => state.leave);

  const leaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    dispatch(submitLeaveApplication(formData));
    setFormData({
      reasonOfLeave: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      addressToGo: "",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
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
        Leave Application Form
      </Typography>

      {errorMessage && (
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
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            bgcolor: "#d1e7dd",
            color: "#0f5132",
          }}
        >
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Leave"
              name="reasonOfLeave"
              value={formData.reasonOfLeave}
              onChange={handleChange}
              multiline
              rows={4}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#6c757d",
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Leave Type"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#6c757d",
                  fontSize: "0.9rem",
                },
              }}
            >
              {leaveTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              InputLabelProps={{ shrink: true }}
              value={formData.endDate}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address to Go"
              name="addressToGo"
              value={formData.addressToGo}
              onChange={handleChange}
              multiline
              rows={2}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#6c757d",
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#007bff",
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#0056b3",
                },
              }}
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LeaveApplicationForm;
