import express from "express";
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getChallengeById,
  joinChallenge,
  getMyJoinedChallenges,
  getHeroChallenge,
  setHeroChallenge
} from "../controllers/challengeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getChallenges);
router.get("/hero", getHeroChallenge);
router.get("/my/joined", protect, getMyJoinedChallenges);
router.get("/:id", getChallengeById);
router.post("/:id/join", protect, joinChallenge);
router.post("/", protect, admin, upload.any(), createChallenge);
router.patch("/:id", protect, admin, upload.any(), updateChallenge);
router.patch("/:id/hero", protect, admin, setHeroChallenge);
router.delete("/:id", protect, admin, deleteChallenge);


export default router;
