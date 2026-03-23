import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get("/", getCart);                      // GET  /api/cart
router.post("/", addToCart);                   // POST /api/cart
router.patch("/:itemId", updateCartItem);      // PATCH /api/cart/:itemId
router.delete("/:itemId", removeFromCart);     // DELETE /api/cart/:itemId
router.delete("/", clearCart);                 // DELETE /api/cart  (clear all)

export default router;
