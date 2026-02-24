import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Booking from "../model/BookingModel.js";
import Venue from "../model/VenueModel.js";
import process from "process";

dotenv.config();
await connectDB();

/* ================= CLEAR OLD BOOKINGS ================= */
await Booking.deleteMany();
console.log("Old bookings removed");

/* ================= USER ================= */

const USER_ID = new mongoose.Types.ObjectId("6980b2afa52edb8f79424bfb");

/* ================= CONSTANTS ================= */

const sports = [
  "cricket",
  "football",
  "badminton",
  "tennis",
  "basketball",
];

const venues = await Venue.find();

if (!venues.length) {
  console.log("No venues found. Seed venues first ❌");
  process.exit();
}

const bookings = [];

/* Helper to generate random time */
const getRandomTime = () => {
  const hour = 6 + Math.floor(Math.random() * 15);
  return {
    start: `${hour.toString().padStart(2, "0")}:00`,
    end: `${(hour + 1).toString().padStart(2, "0")}:00`,
  };
};

/* 10 bookings per sport per city */

const cities = ["Mumbai", "Bangalore", "Pune", "Delhi", "Kolhapur"];

cities.forEach((city) => {
  const cityVenues = venues.filter((v) => v.city === city);

  sports.forEach((sport) => {
    for (let i = 0; i < 10; i++) {
      const venue =
        cityVenues[Math.floor(Math.random() * cityVenues.length)];

      const { start, end } = getRandomTime();

      bookings.push({
        user: USER_ID,
        venue: venue._id,
        sport,
        date: "2026-02-25",
        startTime: start,
        endTime: end,
        courtNumber: Math.ceil(Math.random() * venue.totalCourts),
        status: "confirmed",
        amount: 1000,
      });
    }
  });
});

await Booking.insertMany(bookings);

console.log("Bookings inserted successfully ✅");
process.exit();