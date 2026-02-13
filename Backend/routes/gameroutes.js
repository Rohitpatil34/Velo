import express from "express";
import { getGames,joinGame, leaveGame , getMyGames, getGameById } from "../controllers/gamecontroller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", getGames);
router.post("/:id/join", authMiddleware, joinGame);
router.get("/my-games", authMiddleware, getMyGames);
router.delete("/:id/leave", authMiddleware, leaveGame)
router.get("/:id", authMiddleware, getGameById);





export default router;
