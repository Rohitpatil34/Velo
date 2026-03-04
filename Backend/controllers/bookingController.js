import mongoose from "mongoose";
import Booking from "../model/BookingModel.js";
import Venue from "../model/VenueModel.js";
import { generateSlots } from "../services/slotService.js";
import razorpay from "../services/razorpayService.js"

/* ======================================================
   CREATE BOOKING 
====================================================== */
export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { venueId, sport, date, startTime, endTime, courtNumber } = req.body;
    const userId = req.user.id;

    if (!venueId || !sport || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    /* ================= VALIDATE VENUE ================= */
    const venue = await Venue.findById(venueId).session(session);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    if (!venue.sports.includes(sport)) {
      return res.status(400).json({
        message: "This sport is not available at this venue",
      });
    }
    if (!courtNumber) {
      return res.status(400).json({
        message: "Court selection is required",
      });
    }

    if (courtNumber < 1 || courtNumber > venue.totalCourts) {
      return res.status(400).json({
        message: "Invalid court selected",
      });
    }
    /* ================= VALIDATE DATE ================= */
    const today = new Date();
    const bookingDate = new Date(date);

    if (bookingDate < new Date(today.toDateString())) {
      return res.status(400).json({
        message: "Cannot book past dates",
      });
    }

    // 30 day booking limit
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    if (bookingDate > maxDate) {
      return res.status(400).json({
        message: "You can only book up to 30 days in advance",
      });
    }

    /* ================= VALIDATE TIME ================= */
    const newStart = new Date(`${date}T${startTime}:00`);
    const newEnd = new Date(`${date}T${endTime}:00`);

    if (newEnd <= newStart) {
      return res.status(400).json({
        message: "End time must be greater than start time",
      });
    }

    // Minimum 2 hour advance booking rule
    const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
    if (newStart < twoHoursLater) {
      return res.status(400).json({
        message: "Bookings must be made at least 2 hours in advance",
      });
    }

    /* ================= VALIDATE OPERATING HOURS ================= */
    const openTime = new Date(`${date}T${venue.operatingHours.open}:00`);
    const closeTime = new Date(`${date}T${venue.operatingHours.close}:00`);

    if (newStart < openTime || newEnd > closeTime) {
      return res.status(400).json({
        message: "Slot outside operating hours",
      });
    }

    /* ================= VALIDATE SLOT ALIGNMENT ================= */
    const durationMinutes =
      (newEnd.getTime() - newStart.getTime()) / (1000 * 60);

    if (durationMinutes % venue.slotDuration !== 0) {
      return res.status(400).json({
        message: "Invalid slot duration",
      });
    }

    /* ================= FIND OVERLAPPING BOOKINGS ================= */
    const overlappingBookings = await Booking.find({
      venue: venueId,
      date,
      status: "confirmed",
      $expr: {
        $and: [
          {
            $lt: [
              { $toDate: { $concat: ["$date", "T", "$startTime", ":00"] } },
              newEnd,
            ],
          },
          {
            $gt: [
              { $toDate: { $concat: ["$date", "T", "$endTime", ":00"] } },
              newStart,
            ],
          },
        ],
      },
    }).session(session);

    const isCourtBooked = overlappingBookings.some(
      (b) => b.courtNumber === courtNumber
    );

    if (isCourtBooked) {
      return res.status(400).json({
        message: "This court is already booked for selected time",
      });
    }

    /* ================= CALCULATE AMOUNT ================= */
    const durationHours =
      (newEnd.getTime() - newStart.getTime()) / (1000 * 60 * 60);

    const sportPrice =
      venue.sportPricing?.find((s) => s.sport === sport)?.price ||
      venue.pricePerHour;

    const amount = durationHours * sportPrice;

    /* ================= CREATE BOOKING ================= */
    const booking = await Booking.create(
      [
        {
          user: userId,
          venue: venueId,
          sport,
          date,
          startTime,
          endTime,
          courtNumber: courtNumber,
          amount,
          status: "confirmed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Booking successful",
      courtNumber: assignedCourt,
      booking: booking[0],
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Create Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ======================================================
   GET USER BOOKINGS
====================================================== */
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const status = req.query.status; // 🔥 NEW

    const query = { user: userId };

    if (status) {
      query.status = status; // confirmed / cancelled
    }

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .populate("venue", "name address city")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      bookings,
    });

  } catch (error) {
    console.error("Get User Bookings Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ======================================================
   CANCEL BOOKING + REFUND
====================================================== */
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "confirmed",
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const slotStart = new Date(`${booking.date}T${booking.startTime}:00`);

    if (new Date() >= slotStart) {
      return res.status(400).json({
        message: "Cannot cancel after slot has started",
      });
    }

    /* ================= REFUND ================= */

    if (booking.paymentId) {
      await razorpay.payments.refund(booking.paymentId, {
        amount: booking.amount * 100, // in paise
      });
    }

    /* ================= UPDATE STATUS ================= */
    booking.status = "cancelled";
    booking.paymentStatus = "refunded";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled & refund initiated",
    });

  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ======================================================
   GET VENUE BOOKINGS (ADMIN)
====================================================== */
export const getVenueBookings = async (req, res) => {
  try {
    const venueId = req.params.venueId;

    const bookings = await Booking.find({
      venue: venueId,
      status: "confirmed",
    })
      .populate("user", "name email")
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ bookings });

  } catch (error) {
    console.error("Get Venue Bookings Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ======================================================
   GET AVAILABLE SLOTS
====================================================== */
export const getAvailableSlots = async (req, res) => {
  try {
    const { venueId, date } = req.query;

    if (!venueId || !date) {
      return res.status(400).json({
        message: "venueId and date are required",
      });
    }

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    const existingBookings = await Booking.find({
      venue: venueId,
      date,
      status: "confirmed",
    });

    const slots = generateSlots(
      venue,
      date,
      existingBookings
    );

    res.status(200).json({
      venueId,
      date,
      slots,
    });

  } catch (error) {
    console.error("Get Slots Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });

  } catch (error) {
    console.error("Get Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};