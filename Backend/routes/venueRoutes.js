
import express from "express";
import { getAvailableSlots, getVenueById, getVenues } from "../controllers/venueController.js";

const router = express.Router();

router.get("/", getVenues);
router.get("/slots", getAvailableSlots);
router.get("/:id", getVenueById);


export default router;
