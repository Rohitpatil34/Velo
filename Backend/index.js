import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import process from "process";
import otproutes from "./routes/otproutes.js"
import locationRoutes from "./routes/locationRoutes.js"
import userRoutes from "./routes/userroutes.js";
import gameRoutes from "./routes/gameroutes.js"
import connectDB from "./Config/db.js";
import trainerRoutes from "./routes/trainerRoutes.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/otp", otproutes);
app.use("/api/games", gameRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/trainers", trainerRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("API is running & DB connected");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
