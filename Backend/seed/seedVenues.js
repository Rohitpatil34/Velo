import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Venue from "../model/VenueModel.js";
import process from "process";

dotenv.config();
await connectDB();

/* ================= CLEAR OLD VENUES ================= */
await Venue.deleteMany();
console.log("Old venues removed");

/* ================= CONSTANTS ================= */

const cities = [
  { name: "Mumbai", coords: [72.8360, 19.0596] },
  { name: "Bangalore", coords: [77.6408, 12.9784] },
  { name: "Pune", coords: [73.8567, 18.5204] },
  { name: "Delhi", coords: [77.1025, 28.7041] },
  { name: "Kolhapur", coords: [74.2433, 16.7050] },
];

const sports = [
  "cricket",
  "football",
  "badminton",
  "tennis",
  "basketball",
];

const venues = [];

/* ================= CREATE 5 VENUES PER CITY ================= */

cities.forEach((city) => {
  for (let i = 1; i <= 5; i++) {
    venues.push({
      name: `${city.name} Sports Complex ${i}`,
      description: "Premium multi-sport facility with world-class courts.",
      city: city.name,
      area: "Central Area",
      address: `${city.name} Main Road ${i}`,
      location: {
        type: "Point",
        coordinates: [
          city.coords[0] + (Math.random() - 0.5) * 0.05,
          city.coords[1] + (Math.random() - 0.5) * 0.05,
        ],
      },
      sports,
      totalCourts: 5,
      operatingHours: {
        open: "06:00",
        close: "23:00",
      },
      slotDuration: 60,
      pricePerHour: 1000,
      sportPricing: sports.map((sport) => ({
        sport,
        price: 500 + Math.floor(Math.random() * 1000),
      })),
      amenities: [
        "Parking",
        "Washroom",
        "Drinking Water",
        "Locker Room",
      ],
      rating: Number((3 + Math.random() * 2).toFixed(1)),
      images: ["https://example.com/venue.jpg"],
    });
  }
});

/* ================= INSERT ================= */

await Venue.insertMany(venues);

console.log("25 Venues inserted successfully ✅");
process.exit();