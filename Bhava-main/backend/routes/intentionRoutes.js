import express from "express";
import * as intentionController from "../controllers/intentionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All intention routes require authentication
router.use(authMiddleware);

router.post("/", intentionController.addIntention);
router.get("/", intentionController.getIntentions);
router.delete("/:id", intentionController.deleteIntention);

export default router;
