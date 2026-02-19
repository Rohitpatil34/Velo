import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    sport: {
      type: String,
      enum: ["cricket", "football", "basketball", "badminton", "tennis"],
      required: true,
    },

    location: {
      name: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      geo: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true,
        },
      },
    },

    /* ================= DATE & TIME ================= */

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    timeCategory: {
      type: String,
      enum: ["morning", "day", "evening", "night"],
      required: true,
    },

    /* ================= SKILL & TYPE ================= */

    skillLevel: {
      type: String,
      enum: [
        "beginner",
        "amateur",
        "intermediate",
        "advanced",
        "professional",
      ],
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["booked_on_playo", "pay_and_join"],
      required: true,
    },

    /* ================= PRICING & SLOTS ================= */

    price: {
      type: Number,
      default: 0,
    },

    totalSlots: {
      type: Number,
      required: true,
    },

    availableSlots: {
      type: Number,
      required: true,
    },
    /* ================= PARTICIPANTS ================= */

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /* ================= OWNERSHIP ================= */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= GEO INDEX ================= */
gameSchema.index({ "location.geo": "2dsphere" });

const Game = mongoose.model("Game", gameSchema);
export default Game;
