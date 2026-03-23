import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    title:     { type: String, required: true },
    price:     { type: String, required: true },   // stored as "₹1,299" string
    priceNum:  { type: Number, required: true },   // numeric value for totals
    image:     { type: String, default: "" },
    category:  { type: String, default: "" },
    quantity:  { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Virtual: total item count
cartSchema.virtual("itemCount").get(function () {
  return this.items.reduce((sum, i) => sum + i.quantity, 0);
});

// Virtual: total price
cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0);
});

export default mongoose.model("Cart", cartSchema);
