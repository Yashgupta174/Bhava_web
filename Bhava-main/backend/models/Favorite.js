import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can only favorite a specific challenge once
favoriteSchema.index({ user: 1, challenge: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
