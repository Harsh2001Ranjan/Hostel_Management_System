// import React, { useState, useEffect } from "react";
// import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";

// const CreateNoticeForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     hostel: "", // This will be populated from user data
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Mock function to simulate fetching user data (you can replace this with actual user data fetching logic)
//   const fetchUserData = () => {
//     return {
//       hostel: "Hostel A", // Assuming this is the user's hostel fetched from their profile or database
//     };
//   };

//   // Automatically populate hostel field on component mount
//   useEffect(() => {
//     const userData = fetchUserData();
//     setFormData((prevData) => ({
//       ...prevData,
//       hostel: userData.hostel,
//     }));
//   }, []);

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
//       setSuccessMessage("Notice created successfully!");
//       setFormData({
//         title: "",
//         content: "",
//         hostel: formData.hostel, // Keep hostel the same after submission
//       });
//     } else {
//       setErrorMessage("Failed to create notice. Please try again.");
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
//         Create a Notice
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
//               label="Notice Title"
//               name="title"
//               value={formData.title}
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
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Content"
//               name="content"
//               value={formData.content}
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
//               label="Hostel Name"
//               name="hostel"
//               value={formData.hostel}
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
//               disabled // Hostel name is fetched automatically and cannot be changed
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
//               Create Notice
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default CreateNoticeForm;
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";

const CreateNoticeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    hostel: "", // This will be populated from user data
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mock function to simulate fetching user data (you can replace this with actual user data fetching logic)
  const fetchUserData = () => {
    return {
      hostel: "Hostel A", // Assuming this is the user's hostel fetched from their profile or database
    };
  };

  // Automatically populate hostel field on component mount
  useEffect(() => {
    const userData = fetchUserData();
    setFormData((prevData) => ({
      ...prevData,
      hostel: userData.hostel,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Mock API call
    const isValid = Math.random() > 0.2; // Simulates success or failure
    if (isValid) {
      setSuccessMessage("Notice created successfully!");
      setFormData({
        title: "",
        content: "",
        hostel: formData.hostel, // Keep hostel the same after submission
      });
    } else {
      setErrorMessage("Failed to create notice. Please try again.");
    }
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
        Create a Notice
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
              label="Notice Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                  borderColor: "#798bb8",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#798bb8",
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                  borderColor: "#798bb8",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#798bb8",
                  fontSize: "0.9rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hostel Name"
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  fontSize: "1rem",
                  borderRadius: "6px",
                  borderColor: "#798bb8",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#798bb8",
                  fontSize: "0.9rem",
                },
              }}
              disabled // Hostel name is fetched automatically and cannot be changed
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#798bb8",
                color: "#fff",
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#5e73a6",
                },
              }}
            >
              Create Notice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateNoticeForm;
