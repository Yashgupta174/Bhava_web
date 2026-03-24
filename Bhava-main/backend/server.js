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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ESM Fix for static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Middleware ────────────────────────────────────────────────
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins for Vercel testing temporarily or match against whitelist
    const whitelist = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://bhava-web-team.vercel.app",
      "https://bhava-web.vercel.app",
      "https://bhava-fkv3.vercel.app"
    ];
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/challenges", challengeRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Bhava API is active! Use /admin to access the dashboard." });
});

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
    
    // Vercel handles requests via serverless file exports, but Render/Local need app.listen
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

export default app;
