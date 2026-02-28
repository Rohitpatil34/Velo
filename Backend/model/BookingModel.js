// models/BookingModel.js

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue",
            required: true,
        },

        sport: {
            type: String,
            required: true,
        },

        date: {
            type: String, // "2026-02-20"
            required: true,
        },

        startTime: {
            type: String, // "10:00"
            required: true,
        },

        endTime: {
            type: String, // "11:00"
            required: true,
        },
        courtNumber: {
            type: Number,
            required: true,
        },
        paymentId: {
            type: String,
        },

        orderId: {
            type: String,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        lockExpiresAt: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "failed"],
            default: "pending",
        },


        amount: Number,
    },

    { timestamps: true }

);
bookingSchema.index({ venue: 1, date: 1 });
bookingSchema.index({ venue: 1, date: 1, startTime: 1 });
bookingSchema.index({ lockExpiresAt: 1 }, { expireAfterSeconds: 0 });
bookingSchema.index(
    { venue: 1, date: 1, courtNumber: 1, startTime: 1 },
    { unique: true }
);
export default mongoose.model("Booking", bookingSchema);
