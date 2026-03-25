import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String }, // e.g., "Vedic Counsellor"
  initials: { type: String }, // e.g., "AR"
  avatarColor: { type: String, default: "#FF9800" } // Hex color for avatar background
});

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String }, // e.g. "108 Sacred Chants · Divine Bhajans"
  audioUrl: { type: String },
  coverImage: { type: String }, // For the player view
  duration: { type: String },
  tags: [String], // e.g. ["Mantra", "108 BPM", "Raga Bhairavi"]
  day: { type: Number },
  description: { type: String }
});

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullSubtitle: { type: String }, // e.g. "Guided Contemplative Prayer · 27 min"
  description: { type: String }, // Quick summary
  detailsLongDescription: { type: String }, // For the Image 1/3 detail page
  image: { type: String }, // Main tile image
  category: { 
    type: String, 
    enum: ["Active Challenges", "Morning Routine", "Daily Practise", "Learning Path", "Timeless Wisdom", "Trending", "New", "Featured", "Live"], 
    default: "Active Challenges" 
  },
  badgeText: { type: String }, // e.g., "● 1,247 listening now"
  joinedCount: { type: String, default: "0" },
  durationText: { type: String },
  startDate: { type: Date },
  hosts: [hostSchema],
  sessions: [sessionSchema],
  createdAt: { type: Date, default: Date.now }
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
