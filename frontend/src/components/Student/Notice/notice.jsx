// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchChiefWardenNotices,
//   fetchWardenNotices,
//   downloadNotice,
//   clearMessages,
// } from "../../../redux/features/noticeSlice";
// import {
//   Box,
//   Typography,
//   Button,
//   Alert,
//   Card,
//   CardContent,
//   CardActions,
//   Grid,
//   CircularProgress,
// } from "@mui/material";

// const NoticesPage = () => {
//   const dispatch = useDispatch();
//   const { chiefWardenNotices, wardenNotices, loading, error, successMessage } =
//     useSelector((state) => state.notice);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchChiefWardenNotices(token));
//       dispatch(fetchWardenNotices(token));
//     }
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (error || successMessage) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessages());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, successMessage, dispatch]);

//   // Combine notices from both Chief Warden and Warden
//   const allNotices = [...chiefWardenNotices, ...wardenNotices].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <Box
//       sx={{
//         maxWidth: 1200,
//         mx: "auto",
//         mt: 4,
//         p: 3,
//         borderRadius: "12px",
//         bgcolor: "#f4f9ff",
//       }}
//     >
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{
//           fontWeight: "bold",
//           color: "#000000",
//           textTransform: "uppercase",
//           mb: 4,
//         }}
//       >
//         Notices
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}
//       {successMessage && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           {successMessage}
//         </Alert>
//       )}

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <CircularProgress />
//         </Box>
//       ) : allNotices.length > 0 ? (
//         <Grid container spacing={3} justifyContent="center">
//           {allNotices.map((notice) => (
//             <Grid item xs={12} sm={6} md={4} key={notice._id}>
//               <Card
//                 sx={{
//                   boxShadow: 4,
//                   borderRadius: "12px",
//                   bgcolor: "white",
//                   border: `2px solid #007bff`,
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography
//                     variant="h6"
//                     gutterBottom
//                     sx={{ fontWeight: "bold", color: "#000000", mb: 1 }}
//                   >
//                     {notice.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     sx={{
//                       mb: 2,
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 4,
//                       WebkitBoxOrient: "vertical",
//                     }}
//                   >
//                     {notice.content}
//                   </Typography>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ fontWeight: "bold", color: "#000000" }}
//                   >
//                     Created By: {notice.createdBy}
//                   </Typography>
//                   <Typography
//                     variant="subtitle2"
//                     color="textSecondary"
//                     sx={{ mt: 0.5 }}
//                   >
//                     Date: {new Date(notice.createdAt).toLocaleDateString()}
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ p: 2 }}>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       bgcolor: "#007bff",
//                       color: "white",
//                       textTransform: "none",
//                       width: "100%",
//                       "&:hover": { bgcolor: "#0056b3" },
//                     }}
//                     onClick={() =>
//                       dispatch(downloadNotice({ id: notice._id, token }))
//                     }
//                   >
//                     Download PDF
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography align="center">No notices available</Typography>
//       )}
//     </Box>
//   );
// };

// export default NoticesPage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChiefWardenNotices,
  fetchWardenNotices,
  downloadNotice,
  clearMessages,
} from "../../../redux/features/noticeSlice";
import {
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
  CircularProgress,
} from "@mui/material";

const NoticesPage = () => {
  const dispatch = useDispatch();
  const { chiefWardenNotices, wardenNotices, loading, error, successMessage } =
    useSelector((state) => state.notice);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchChiefWardenNotices(token));
      dispatch(fetchWardenNotices(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  // Merge notices & sort by date
  const allNotices = [...chiefWardenNotices, ...wardenNotices].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: "12px",
        bgcolor: "#f4f9ff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#000000",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        Notices
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : allNotices.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {allNotices.map((notice) => (
            <Grid item xs={12} sm={6} md={4} key={notice._id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: "12px",
                  bgcolor: "white",
                  border: `2px solid #007bff`,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#000000", mb: 1 }}
                  >
                    {notice.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {notice.content}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "#000000" }}
                  >
                    Created By: {notice.createdBy}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mt: 0.5 }}
                  >
                    Date: {new Date(notice.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#007bff",
                      color: "white",
                      textTransform: "none",
                      width: "100%",
                      "&:hover": { bgcolor: "#0056b3" },
                    }}
                    onClick={() =>
                      dispatch(downloadNotice({ id: notice._id, token }))
                    }
                  >
                    Download PDF
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center">No notices available</Typography>
      )}
    </Box>
  );
};

export default NoticesPage;
