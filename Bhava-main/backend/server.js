import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import multer from "multer";

import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import inspirationRoutes from "./routes/inspirationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import recentRoutes from "./routes/recentRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import intentionRoutes from "./routes/intentionRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ── 1. PORT CONFIGURATION ─────────────────────────────────────
const PORT = process.env.PORT || 5000;

// ESM Fix for pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── 2. CORS CONFIGURATION ─────────────────────────────────────
// Temporarily allow all origins for debugging connection issues
app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── 3. STATIC FILES ──────────────────────────────────────────
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// Request Logger (Helpful for debugging "Not Found" on Render)

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

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
app.use("/api/inspirations", inspirationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/recent", recentRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/intentions", intentionRoutes);

// Health check JSON
app.get("/api/health", (req, res) => {
  res.json({ success: true });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);

  // Handle Multer errors specifically
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload Error: ${err.message}`
    });
  }

  // Handle our custom file filter errors
  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message 
  });
});

// ── 4. DATABASE & SERVER START ────────────────────────────────
const MONGO_URI = process.env.MONGODB_URL || process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ FATAL: MONGODB_URL is not defined in environment variables!");
  process.exit(1);
} else {
  // Log a masked version for security
  const maskedURI = MONGO_URI.replace(/:([^@]+)@/, ':****@');
  console.log(`📡 Attempting to connect to MongoDB...`);
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
    console.error("👉 Tip: If this is on Render, ensure 'MONGODB_URL' is added to Environment Variables.");
  });

export default app;
