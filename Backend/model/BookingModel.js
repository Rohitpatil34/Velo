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
export default mongoose.model("Booking", bookingSchema);
