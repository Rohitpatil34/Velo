import express from "express";
import { getTrainers, contactTrainer, getTrainerById, getSimilarTrainers } from "../controllers/trainerController.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import authOptional from "../middlewares/authOptionalMiddleware.js";

const router = express.Router();

/* GET TRAINERS (optional auth) */
router.get("/",authOptional, getTrainers);

router.get("/:id", authOptional,getTrainerById);

/* CONTACT TRAINER (login required) */
router.post("/:id/contact", authMiddleware, contactTrainer);

router.get("/:id/similar", getSimilarTrainers);


export default router;
