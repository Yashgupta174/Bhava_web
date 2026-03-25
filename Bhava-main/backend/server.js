import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ── 1. PORT CONFIGURATION ─────────────────────────────────────
const PORT = process.env.PORT || 5000;

// ESM Fix for pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── 2. CORS CONFIGURATION ─────────────────────────────────────
// Allows your Vercel frontend to talk to this Render backend
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.endsWith(".vercel.app") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── 3. ROUTES ─────────────────────────────────────────────────
// Test route for Render deployment verification
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/challenges", challengeRoutes);

// Health check JSON
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Bhava API is running" });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── 4. DATABASE & SERVER START ────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server is live on port ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

export default app;
