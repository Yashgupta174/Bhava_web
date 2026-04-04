import express from "express";
import { toggleFavorite, checkFavorite, getFavorites } from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/toggle/:id", protect, toggleFavorite);
router.get("/check/:id", protect, checkFavorite);
router.get("/", protect, getFavorites);

export default router;
