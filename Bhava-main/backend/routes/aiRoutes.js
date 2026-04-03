import express from "express";
import { getAiResponse } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── GET AI RESPONSE (SPIRITUAL GUIDE) ──────────────────────────
router.post("/chat", protect, getAiResponse);

export default router;
