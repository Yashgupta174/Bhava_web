import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String }, // e.g., "Vedic Counsellor"
  initials: { type: String }, // e.g., "AR"
  avatarColor: { type: String, default: "#FF9800" } // Hex color for avatar background
});

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  audioUrl: { type: String },
  duration: { type: String },
  day: { type: Number },
  description: { type: String }
});

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL to image
  category: { type: String, enum: ["Trending", "New", "Featured", "Live", "Active Challenges"], default: "New" },
  badgeText: { type: String }, // e.g., "● 16,087 Live"
  joinedCount: { type: String, default: "0" }, // e.g., "1.2k"
  durationText: { type: String }, // e.g., "21 days" or "108 sessions"
  startDate: { type: Date },
  hosts: [hostSchema],
  sessions: [sessionSchema],
  createdAt: { type: Date, default: Date.now }
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
