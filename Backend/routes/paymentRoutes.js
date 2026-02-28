import express from "express";
import { createPaymentOrder, verifyPaymentWebhook } from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create-order", authMiddleware, createPaymentOrder);

router.post("/webhook", verifyPaymentWebhook);

export default router;