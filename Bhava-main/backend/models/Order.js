import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title:     { type: String, required: true },
  price:     { type: String, required: true },
  priceNum:  { type: Number, required: true },
  image:     { type: String, default: "" },
  category:  { type: String, default: "" },
  quantity:  { type: Number, required: true, min: 1, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,   // null = guest pre-order
    },
    // For guest pre-orders from SacredJourney CTA
    guestEmail: { type: String, default: "" },
    guestName:  { type: String, default: "" },
    guestMobile:{ type: String, default: "" },

    type: {
      type: String,
      enum: ["preorder", "order"],
      default: "preorder",
    },

    items: [orderItemSchema],

    // Pre-order fixed amount (SacredJourney ₹1,299 CTA)
    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    // Shipping address (optional at pre-order stage)
    address: {
      line1:   { type: String, default: "" },
      city:    { type: String, default: "" },
      state:   { type: String, default: "" },
      pincode: { type: String, default: "" },
    },

    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
