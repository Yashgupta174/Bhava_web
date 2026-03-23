import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Helper: parse "₹1,299" → 1299
const parsePrice = (str) => {
  if (typeof str === "number") return str;
  return parseInt(String(str).replace(/[₹,]/g, ""), 10) || 0;
};

// POST /api/orders/preorder  — SacredJourney "Pre-Order Now" CTA (public)
export const createPreorder = async (req, res) => {
  try {
    const { name, email, mobile, notes } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least an email or mobile number.",
      });
    }

    // Fixed pre-order product (the launch collection)
    const preorderItem = {
      productId: 0,
      title: "BHAVA Launch Collection",
      price: "₹1,299",
      priceNum: 1299,
      image: "",
      category: "PRE-ORDER",
      quantity: 1,
    };

    const order = await Order.create({
      userId: req.userId || null,
      guestEmail: email || "",
      guestName: name || "",
      guestMobile: mobile || "",
      type: "preorder",
      items: [preorderItem],
      amount: 1299,
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Pre-order placed! We'll contact you with confirmation details.",
      orderId: order._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// POST /api/orders  — place a full order from cart (protected)
export const placeOrder = async (req, res) => {
  try {
    const { address, notes } = req.body;

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty." });
    }

    const amount = cart.items.reduce((s, i) => s + i.priceNum * i.quantity, 0);

    const order = await Order.create({
      userId: req.userId,
      type: "order",
      items: cart.items.map((i) => ({
        productId: i.productId,
        title: i.title,
        price: i.price,
        priceNum: i.priceNum,
        image: i.image,
        category: i.category,
        quantity: i.quantity,
      })),
      amount,
      address: address || {},
      notes: notes || "",
    });

    // Clear the cart after order placed
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: order._id,
      amount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// GET /api/orders  — get user's orders (protected)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET /api/orders/all  — admin: all orders (protected)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
