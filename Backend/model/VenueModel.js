// models/VenueModel.js

import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    area: String,

    address: String,

    /* ================= LOCATION ================= */
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    /* ================= SPORTS ================= */
    sports: [
      {
        type: String,
        enum: [
          "cricket",
          "football",
          "badminton",
          "tennis",
          "basketball",
        ],
      },
    ],

    /* ================= COURTS ================= */
    totalCourts: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    /* ================= OPERATING HOURS ================= */
    operatingHours: {
      open: {
        type: String, // "06:00"
        required: true,
      },
      close: {
        type: String, // "23:00"
        required: true,
      },
    },

    slotDuration: {
      type: Number, // minutes
      default: 60,
      min: 30,
    },

    /* ================= PRICING ================= */
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },

    // Optional sport-specific pricing
    sportPricing: [
      {
        sport: {
          type: String,
          enum: [
            "cricket",
            "football",
            "badminton",
            "tennis",
            "basketball",
          ],
        },
        price: {
          type: Number,
          min: 0,
        },
      },
    ],

    /* ================= EXTRA ================= */
    amenities: [String],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    images: [String],
  },
  { timestamps: true }
);

/* 🔥 IMPORTANT INDEXES */

// Required for geo search
venueSchema.index({ location: "2dsphere" });

// Improve sport filtering performance
venueSchema.index({ sports: 1 });

// Improve city filtering
venueSchema.index({ city: 1 });

export default mongoose.model("Venue", venueSchema);
