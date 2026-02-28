import express from "express";
import cors from "cors";
import process from "process"
import connectDB from "./config/db.js";

import otproutes from "./routes/otproutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userroutes.js";
import gameRoutes from "./routes/gameroutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import { verifyPaymentWebhook } from "./controllers/paymentController.js";



const app = express();

// Connect Database
connectDB();

// CORS
app.use(cors());

/*
  🔥 IMPORTANT:
  Razorpay webhook MUST come before express.json()
  and must use express.raw()
*/
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  verifyPaymentWebhook
);

// JSON parser (after webhook)
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/otp", otproutes);
app.use("/api/games", gameRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/health", (req, res) => {
  res.send("API is running & DB connected");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});