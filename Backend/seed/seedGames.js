import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";
import Game from "../model/Gamemodel.js";
import User from "../model/Usermodel.js";

dotenv.config();

/* ================= CONNECT DB ================= */
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

/* ================= DATE HELPER ================= */
const futureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(0, 0, 0, 0);
  return d;
};

/* ================= CLEAR OLD GAMES ================= */
await Game.deleteMany();
console.log("Old games removed");

/* ================= GET ONE USER AS CREATOR ================= */
const user = await User.findOne();

if (!user) {
  console.log("❌ No user found. Please create a user first.");
  process.exit();
}

/* ================= GAME DATA ================= */
const games = [
  /* ================= KOLHAPUR ================= */
  {
    sport: "cricket",
    location: {
      name: "Shahu Stadium",
      city: "Kolhapur",
      geo: { type: "Point", coordinates: [74.2428, 16.7304] },
    },
    date: futureDate(0),
    startTime: "06:00",
    endTime: "08:00",
    timeCategory: "morning",
    skillLevel: "beginner",
    bookingType: "booked_on_playo",
    price: 0,
    totalSlots: 22,
    availableSlots: 12,
    createdBy: user._id,
  },

  {
    sport: "football",
    location: {
      name: "Rankala Turf",
      city: "Kolhapur",
      geo: { type: "Point", coordinates: [74.2355, 16.7049] },
    },
    date: futureDate(1),
    startTime: "18:30",
    endTime: "20:00",
    timeCategory: "evening",
    skillLevel: "intermediate",
    bookingType: "pay_and_join",
    price: 200,
    totalSlots: 14,
    availableSlots: 6,
    createdBy: user._id,
  },

  {
    sport: "badminton",
    location: {
      name: "Tarabai Park Indoor Court",
      city: "Kolhapur",
      geo: { type: "Point", coordinates: [74.248, 16.7185] },
    },
    date: futureDate(2),
    startTime: "20:00",
    endTime: "21:30",
    timeCategory: "night",
    skillLevel: "amateur",
    bookingType: "pay_and_join",
    price: 150,
    totalSlots: 4,
    availableSlots: 2,
    createdBy: user._id,
  },

  /* ================= MUMBAI ================= */
  {
    sport: "badminton",
    location: {
      name: "Shuttle Whizz Academy",
      city: "Mumbai",
      geo: { type: "Point", coordinates: [72.8679, 19.1176] },
    },
    date: futureDate(1),
    startTime: "07:00",
    endTime: "08:30",
    timeCategory: "morning",
    skillLevel: "intermediate",
    bookingType: "pay_and_join",
    price: 250,
    totalSlots: 4,
    availableSlots: 1,
    createdBy: user._id,
  },

  {
    sport: "cricket",
    location: {
      name: "Andheri Sports Complex",
      city: "Mumbai",
      geo: { type: "Point", coordinates: [72.8436, 19.1136] },
    },
    date: futureDate(2),
    startTime: "22:00",
    endTime: "23:30",
    timeCategory: "night",
    skillLevel: "professional",
    bookingType: "pay_and_join",
    price: 300,
    totalSlots: 22,
    availableSlots: 8,
    createdBy: user._id,
  },

  /* ================= PUNE ================= */
  {
    sport: "football",
    location: {
      name: "Balewadi Turf",
      city: "Pune",
      geo: { type: "Point", coordinates: [73.7707, 18.5679] },
    },
    date: futureDate(3),
    startTime: "18:00",
    endTime: "19:30",
    timeCategory: "evening",
    skillLevel: "intermediate",
    bookingType: "pay_and_join",
    price: 220,
    totalSlots: 14,
    availableSlots: 5,
    createdBy: user._id,
  },

  {
    sport: "tennis",
    location: {
      name: "Deccan Gymkhana",
      city: "Pune",
      geo: { type: "Point", coordinates: [73.8467, 18.5196] },
    },
    date: futureDate(4),
    startTime: "06:30",
    endTime: "08:00",
    timeCategory: "morning",
    skillLevel: "advanced",
    bookingType: "booked_on_playo",
    price: 0,
    totalSlots: 2,
    availableSlots: 1,
    createdBy: user._id,
  },

  /* ================= BANGALORE ================= */
  {
    sport: "basketball",
    location: {
      name: "Indiranagar Court",
      city: "Bangalore",
      geo: { type: "Point", coordinates: [77.6413, 12.9719] },
    },
    date: futureDate(5),
    startTime: "17:30",
    endTime: "19:00",
    timeCategory: "evening",
    skillLevel: "beginner",
    bookingType: "pay_and_join",
    price: 120,
    totalSlots: 10,
    availableSlots: 4,
    createdBy: user._id,
  },

  {
    sport: "badminton",
    location: {
      name: "Play Arena",
      city: "Bangalore",
      geo: { type: "Point", coordinates: [77.6876, 12.9121] },
    },
    date: futureDate(6),
    startTime: "20:00",
    endTime: "21:30",
    timeCategory: "night",
    skillLevel: "intermediate",
    bookingType: "pay_and_join",
    price: 180,
    totalSlots: 4,
    availableSlots: 2,
    createdBy: user._id,
  },
];

/* ================= INSERT ================= */
await Game.insertMany(games);
console.log("✅ Games seeded successfully");

/* ================= EXIT ================= */
process.exit();
