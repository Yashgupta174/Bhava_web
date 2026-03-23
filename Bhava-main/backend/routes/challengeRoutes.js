import express from "express";
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge
} from "../controllers/challengeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getChallenges);
router.post("/", protect, admin, createChallenge);
router.patch("/:id", protect, admin, updateChallenge);
router.delete("/:id", protect, admin, deleteChallenge);

export default router;
