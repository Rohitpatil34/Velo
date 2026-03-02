// routes/bookingRoutes.js

import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getVenueBookings,
  getAvailableSlots,
  getBookingById,
} from "../controllers/bookingController.js";

import protect from "../middlewares/authmiddleware.js";

const router = express.Router();

/* Create booking */
router.post("/", protect, createBooking);

/* Get logged in user bookings */
router.get("/my-bookings", protect, getUserBookings);

router.get("/slots", getAvailableSlots);


/* Cancel booking */
router.put("/:id/cancel", protect, cancelBooking);

/* Get bookings of a venue (admin use) */
router.get("/venue/:venueId", protect, getVenueBookings);

router.get("/:id", protect, getBookingById);

export default router;
