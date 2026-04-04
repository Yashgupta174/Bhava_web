import express from "express";
import * as intentionController from "../controllers/intentionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All intention routes require authentication
router.use(protect);

router.post("/", intentionController.addIntention);
router.get("/", intentionController.getIntentions);
router.delete("/:id", intentionController.deleteIntention);

export default router;
