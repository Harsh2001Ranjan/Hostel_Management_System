import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import { Phone, Home, Email, VerifiedUser } from "@mui/icons-material";

// Student Data (Mock)
const studentData = {
  name: "John Doe",
  email: "john.doe@example.com",
  registrationNumber: "123456",
  hostel: "ABC Hostel",
  room: "101",
  year: "2nd Year",
  phoneNumber: "+1234567890",
  parentsPhoneNumber: "+0987654321",
  address: "123 Street, City, Country",
  isAccountVerified: true,
};

const StudentDetails = () => {
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
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        {/* Profile Avatar */}
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
          {studentData.name.charAt(0)}
        </Avatar>

        {/* Name & Registration */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: "#333",
            mb: 0.5,
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          {studentData.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Registration No: {studentData.registrationNumber}
        </Typography>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* Student Info */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Year:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.year}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Hostel:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.hostel}, Room: {studentData.room}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.phoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Parents' Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.parentsPhoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Email:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.email}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#3f51b5",
                marginBottom: 1,
              }}
            >
              Address:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentData.address}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3, mt: 3 }} />

        {/* Account Verification */}
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          {studentData.isAccountVerified ? (
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
