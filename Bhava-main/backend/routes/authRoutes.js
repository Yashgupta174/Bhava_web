import express from "express";
import { signup, login, getMe, updateMe, forgotPassword, resetPassword, googleLogin, updateActivity } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/google", googleLogin);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.patch("/activity", protect, updateActivity);

export default router;
