import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes    from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes    from "./routes/cartRoutes.js";
import orderRoutes   from "./routes/orderRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ESM Fix for static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Middleware ────────────────────────────────────────────────
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Admin Panel Serving (Static Assets First)
app.use("/admin", express.static(path.join(__dirname, "admin")));

// Catch-all route for any /admin sub-route to serve index.html (SPA support)
app.get("/admin*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "admin", "index.html"));
});

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth",    authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart",    cartRoutes);
app.use("/api/orders",  orderRoutes);
app.use("/api/challenges", challengeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Bhava API is running" });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Database + Start ─────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      console.log(`Local Access: http://localhost:${PORT}`);
      console.log(`Network Access: http://192.168.1.3:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
