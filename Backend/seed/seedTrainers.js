import mongoose from "mongoose";
import dotenv from "dotenv";
import Trainer from "../model/TrainerModel.js";
import process from "process";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Trainer.deleteMany();

const cities = [
  { city: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { city: "Pune", lat: 18.5204, lng: 73.8567 },
  { city: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { city: "Kolhapur", lat: 16.7050, lng: 74.2433 },
  { city: "Delhi", lat: 28.7041, lng: 77.1025 },
];

const sports = [
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
];

const trainers = [];

cities.forEach((c) => {
  sports.forEach((sport) => {

    /* 10 COACHES */
    for (let i = 1; i <= 10; i++) {
      trainers.push({
        name: `${c.city} ${sport} Coach ${i}`,
        type: "coach",
        services: [sport],
        ageGroups: ["kids", "adults"],
        batchTypes: ["1-on-1", "online"],
        location: {
          city: c.city,
          area: `Area ${i}`,
          coordinates: {
            type: "Point",
            coordinates: [c.lng + Math.random()/100, c.lat + Math.random()/100],
          },
        },
        images: [],
        availableDays: ["Mon","Tue","Wed","Thu","Fri"],
        pricing: "₹500 per session",
        about: "Professional trainer",
        certifications: ["Certified Coach"],
        certImages: [],
      });
    }

    /* 10 ACADEMIES */
    for (let i = 1; i <= 10; i++) {
      trainers.push({
        name: `${c.city} ${sport} Academy ${i}`,
        type: "academy",
        services: [sport],
        ageGroups: ["kids", "adults"],
        batchTypes: ["group"],
        location: {
          city: c.city,
          area: `Area ${i}`,
          coordinates: {
            type: "Point",
            coordinates: [c.lng + Math.random()/100, c.lat + Math.random()/100],
          },
        },
        images: [],
        availableDays: ["Mon","Tue","Wed","Thu","Fri","Sat"],
        pricing: "₹3000 per month",
        about: "Top academy",
        certifications: ["Sports Academy Certified"],
        certImages: [],
      });
    }

  });
});

await Trainer.insertMany(trainers);

console.log(`🔥 ${trainers.length} trainers seeded successfully`);
process.exit();
