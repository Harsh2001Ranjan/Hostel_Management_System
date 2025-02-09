import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Box,
  Chip,
  Grid,
  CircularProgress,
} from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../../../redux/features/Dashboard/studentDashboardSlice";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (!student) {
      dispatch(fetchStudentData());
    }
  }, [dispatch, student]); // Prevent unnecessary re-fetching

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!student) {
    return null; // Avoid rendering before data is available
  }

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 650,
        boxShadow: 24,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mb: 3,
            mx: "auto",
            bgcolor: "#3f51b5",
            fontSize: 50,
            fontWeight: "bold",
            border: "5px solid #fff",
            boxShadow: 6,
          }}
        >
          {student.name?.charAt(0) || "?"}
        </Avatar>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: "#333",
            mb: 0.5,
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          {student.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Registration No: {student.registrationNumber}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Year:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.year}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Hostel:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.hostel}, Room: {student.room}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.phoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Parents' Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.parentsPhoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Email:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.email}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "600", color: "#3f51b5", mb: 1 }}
            >
              Address:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {student.address?.state}, {student.address?.district}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3, mt: 3 }} />

        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          {student.isAccountVerified ? (
            <Chip
              label="Verified"
              icon={<VerifiedUser fontSize="small" />}
              color="success"
              variant="filled"
              sx={{
                fontWeight: "600",
                textTransform: "capitalize",
                borderRadius: 4,
                boxShadow: 2,
              }}
            />
          ) : (
            <Chip
              label="Not Verified"
              color="error"
              variant="filled"
              sx={{
                fontWeight: "600",
                textTransform: "capitalize",
                borderRadius: 4,
                boxShadow: 2,
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
