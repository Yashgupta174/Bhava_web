import express from "express";
import { 
  getAllInspirations, 
  getLatestInspirations, 
  createInspiration, 
  deleteInspiration 
} from "../controllers/inspirationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for Mobile App
router.route("/latest").get(getLatestInspirations);

// Admin-only routes
router.route("/")
  .get(protect, admin, getAllInspirations)
  .post(protect, admin, createInspiration);

router.route("/:id").delete(protect, admin, deleteInspiration);

export default router;
