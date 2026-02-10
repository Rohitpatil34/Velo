import express from "express";
import {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  verifyEmail,
} from "../controllers/usercontroller.js";

import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/verify-email",verifyEmail)

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;
