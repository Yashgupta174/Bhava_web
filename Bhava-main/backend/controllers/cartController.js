import Cart from "../models/Cart.js";

// Helper: parse "₹1,299" → 1299
const parsePrice = (priceStr) => {
  if (typeof priceStr === "number") return priceStr;
  return parseInt(priceStr.replace(/[₹,]/g, ""), 10) || 0;
};

// GET /api/cart  — get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(200).json({ success: true, items: [], itemCount: 0, totalPrice: 0 });
    }
    res.status(200).json({
      success: true,
      items: cart.items,
      itemCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: cart.items.reduce((s, i) => s + i.priceNum * i.quantity, 0),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// POST /api/cart  — add or increment an item
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, image, category, quantity = 1 } = req.body;

    if (!productId || !title || !price) {
      return res.status(400).json({ success: false, message: "productId, title, and price are required." });
    }

    const priceNum = parsePrice(price);

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = await Cart.create({
        userId: req.userId,
        items: [{ productId, title, price, priceNum, image, category, quantity }],
      });
    } else {
      const existingIdx = cart.items.findIndex((i) => i.productId === productId);
      if (existingIdx >= 0) {
        cart.items[existingIdx].quantity += quantity;
      } else {
        cart.items.push({ productId, title, price, priceNum, image, category, quantity });
      }
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: `${title} added to cart.`,
      items: cart.items,
      itemCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: cart.items.reduce((s, i) => s + i.priceNum * i.quantity, 0),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// PATCH /api/cart/:itemId  — update quantity of an item
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1." });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found in cart." });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      items: cart.items,
      itemCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: cart.items.reduce((s, i) => s + i.priceNum * i.quantity, 0),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// DELETE /api/cart/:itemId  — remove an item
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    const before = cart.items.length;
    cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
    if (cart.items.length === before) {
      return res.status(404).json({ success: false, message: "Item not found in cart." });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      items: cart.items,
      itemCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: cart.items.reduce((s, i) => s + i.priceNum * i.quantity, 0),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// DELETE /api/cart  — clear entire cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });
    res.status(200).json({ success: true, message: "Cart cleared.", items: [], itemCount: 0, totalPrice: 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
