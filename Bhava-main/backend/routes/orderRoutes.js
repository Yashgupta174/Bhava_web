import express from "express";
import {
  createPreorder,
  placeOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: SacredJourney pre-order CTA (no login needed)
router.post("/preorder", createPreorder);

// Protected: place order from cart
router.post("/", protect, placeOrder);

// Protected: get current user's orders
router.get("/", protect, getMyOrders);

// Protected: admin — all orders
router.get("/all", protect, getAllOrders);

export default router;
