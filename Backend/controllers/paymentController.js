import crypto from "crypto";
import razorpay from "../services/razorpayService.js";
import Booking from "../model/BookingModel.js";
import Venue from "../model/VenueModel.js";
import process from "process";
import mongoose from "mongoose";

/* ======================================================
   CREATE PAYMENT ORDER (WITH SLOT LOCKING)
====================================================== */
export const createPaymentOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { venueId, sport, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    if (!venueId || !sport || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    const venue = await Venue.findById(venueId).session(session);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    if (!venue.sports.includes(sport)) {
      return res.status(400).json({
        message: "Sport not available at this venue",
      });
    }

    const newStart = new Date(`${date}T${startTime}:00`);
    const newEnd = new Date(`${date}T${endTime}:00`);

    if (newEnd <= newStart) {
      return res.status(400).json({
        message: "Invalid time range",
      });
    }

    /* 🔥 1️⃣ Prevent SAME USER booking same slot again */
    const alreadyBookedByUser = await Booking.findOne({
      user: userId,
      venue: venueId,
      date,
      status: "confirmed",
    }).session(session);

    if (alreadyBookedByUser) {
      const existingStart = new Date(
        `${date}T${alreadyBookedByUser.startTime}:00`
      );
      const existingEnd = new Date(
        `${date}T${alreadyBookedByUser.endTime}:00`
      );

      if (newStart < existingEnd && newEnd > existingStart) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message: "You have already booked this time slot.",
        });
      }
    }

    /* 2️⃣ Find overlapping bookings (pending + confirmed) */
    const overlappingBookings = await Booking.find({
      venue: venueId,
      date,
      status: { $in: ["pending", "confirmed"] },
    }).session(session);

    const conflictingBookings = overlappingBookings.filter((booking) => {
      const existingStart = new Date(
        `${booking.date}T${booking.startTime}:00`
      );
      const existingEnd = new Date(
        `${booking.date}T${booking.endTime}:00`
      );

      return newStart < existingEnd && newEnd > existingStart;
    });

    /* 3️⃣ Allocate Court */
    const bookedCourts = conflictingBookings.map((b) => b.courtNumber);

    let assignedCourt = null;

    for (let i = 1; i <= venue.totalCourts; i++) {
      if (!bookedCourts.includes(i)) {
        assignedCourt = i;
        break;
      }
    }

    if (!assignedCourt) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "All courts fully booked",
      });
    }

    /* 4️⃣ Calculate amount */
    const durationHours =
      (newEnd.getTime() - newStart.getTime()) / (1000 * 60 * 60);

    const sportPrice =
      venue.sportPricing?.find((s) => s.sport === sport)?.price ||
      venue.pricePerHour;

    const amount = durationHours * sportPrice;

    /* 5️⃣ Create Pending Booking */
    const lockTime = new Date(Date.now() + 10 * 60 * 1000);

    let booking;

    try {
      booking = await Booking.create(
        [
          {
            user: userId,
            venue: venueId,
            sport,
            date,
            startTime,
            endTime,
            courtNumber: assignedCourt,
            amount,
            status: "pending",
            paymentStatus: "pending",
            lockExpiresAt: lockTime,
          },
        ],
        { session }
      );
    } catch (error) {
      if (error.code === 11000) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message: "This slot has just been booked by someone else.",
        });
      }
      throw error;
    }

    /* 6️⃣ Create Razorpay Order */
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: booking[0]._id.toString(),
    });

    booking[0].orderId = order.id;
    await booking[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      bookingId: booking[0]._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Payment Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   VERIFY PAYMENT (WEBHOOK)
====================================================== */
export const verifyPaymentWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = JSON.parse(req.body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const booking = await Booking.findOne({
        orderId: payment.order_id,
        status: "pending",
      });

      if (!booking) {
        return res.status(200).json({ message: "No action needed" });
      }

      /* 🔥 Final overlap check before confirmation */
      const newStart = new Date(`${booking.date}T${booking.startTime}:00`);
      const newEnd = new Date(`${booking.date}T${booking.endTime}:00`);

      const confirmedBookings = await Booking.find({
        venue: booking.venue,
        date: booking.date,
        courtNumber: booking.courtNumber,
        status: "confirmed",
        _id: { $ne: booking._id },
      });

      const conflict = confirmedBookings.some((b) => {
        const existingStart = new Date(
          `${b.date}T${b.startTime}:00`
        );
        const existingEnd = new Date(
          `${b.date}T${b.endTime}:00`
        );
        return newStart < existingEnd && newEnd > existingStart;
      });

      if (conflict) {
        booking.status = "failed";
        booking.paymentStatus = "failed";
        await booking.save();
        return res.status(200).json({ message: "Slot already booked" });
      }

      booking.paymentId = payment.id;
      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.lockExpiresAt = null;

      await booking.save();
    }

    res.status(200).json({ status: "Webhook processed" });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};