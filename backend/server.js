import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import studentRoutes from "./routes/studentRoutes.js";
import wardenRoutes from "./routes/wardenRoutes.js";
import chiefwardenRoutes from "./routes/chiefwardenRoutes.js";
import cronJobs from "./config/cronJobs.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
app.use(express.json());
app.use(cookieParser());
//app.use(cors({ credentials: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Specify the exact origin of your frontend
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
cronJobs();
// API END POINTS
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/students", studentRoutes);
app.use("/api/wardens", wardenRoutes);
app.use("/api/chiefwarden", chiefwardenRoutes);
app.listen(port, () => console.log(`server started on PORT:${port}`));
