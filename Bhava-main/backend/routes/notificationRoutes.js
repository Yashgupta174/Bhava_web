import express from "express";
import { sendNotificationToAll } from "../controllers/notificationController.js";
// You may want to add authentication middleware here to ensure only admin can send notifications
// import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", sendNotificationToAll);

export default router;
