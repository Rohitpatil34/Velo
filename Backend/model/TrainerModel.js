import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["coach", "academy"],
      required: true,
    },

    services: [
      {
        type: String,
        enum: [
          "badminton",
          "swimming",
          "pickleball",
          "football",
          "cricket",
          "tennis",
          "physio",
          "nutrition",
          "yoga",
          "fitness",
        ],
      },
    ],

    ageGroups: [
      {
        type: String,
        enum: ["kids", "adults"],
      },
    ],

    batchTypes: [
      {
        type: String,
        enum: ["1-on-1", "group", "online"],
      },
    ],

    /* ================= LOCATION ================= */
    location: {
      city: String,
      area: String,
      coordinates: {
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

    /* ================= PROFILE MEDIA ================= */
    images: [String],

    /* ================= PROFILE DETAILS ================= */
    availableDays: [String], // ["Mon","Tue"]
    pricing: String,
    about: String,

    certifications: [String],
    certImages: [String],

    rating: {
      type: Number,
      default: 0,
    },

    /* ================= INTEREST ================= */
    interestCount: {
      type: Number,
      default: 0,
    },

    contactedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

/* GEO INDEX */
trainerSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Trainer", trainerSchema);
