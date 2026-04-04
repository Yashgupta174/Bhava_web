import mongoose from "mongoose";

const recentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user has only one record per challenge, making upsert easier
recentSchema.index({ user: 1, challenge: 1 }, { unique: true });
recentSchema.index({ user: 1, viewedAt: -1 });

const Recent = mongoose.model("Recent", recentSchema);
export default Recent;
