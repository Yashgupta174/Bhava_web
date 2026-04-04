import express from "express";
import { addToRecent, getRecents } from "../controllers/recentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", protect, addToRecent);
router.get("/", protect, getRecents);

export default router;
