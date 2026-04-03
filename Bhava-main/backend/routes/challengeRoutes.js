import express from "express";
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getChallengeById,
  joinChallenge
} from "../controllers/challengeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.post("/:id/join", protect, joinChallenge);
router.post("/", protect, admin, upload.any(), createChallenge);
router.patch("/:id", protect, admin, upload.any(), updateChallenge);
router.delete("/:id", protect, admin, deleteChallenge);


export default router;
