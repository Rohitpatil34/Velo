import express from "express";
import { reverseGeocode, searchLocation } from "../controllers/locationController.js";

const router = express.Router();

router.get("/reverse", reverseGeocode);
router.get("/search",searchLocation)

export default router;
