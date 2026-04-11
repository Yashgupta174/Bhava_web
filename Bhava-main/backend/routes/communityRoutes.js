import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { 
  getCommunities, 
  getCommunityById, 
  createCommunity, 
  deleteCommunity,
  updateCommunity 
} from "../controllers/communityController.js";

const router = express.Router();

// Public routes
router.get("/", getCommunities);
router.get("/:id", getCommunityById);

// Admin-only routes
router.post("/", protect, admin, createCommunity);
router.patch("/:id", protect, admin, updateCommunity);
router.delete("/:id", protect, admin, deleteCommunity);

export default router;
