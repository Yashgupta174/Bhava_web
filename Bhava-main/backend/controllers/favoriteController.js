import Favorite from "../models/Favorite.js";
import Challenge from "../models/Challenge.js";

// @desc    Toggle favorite status for a challenge
// @route   POST /api/favorites/toggle/:id
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.userId;

    // Verify challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    const existingFavorite = await Favorite.findOne({ user: userId, challenge: challengeId });

    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ success: true, isFavorite: false, message: "Removed from favorites" });
    } else {
      const favorite = await Favorite.create({ user: userId, challenge: challengeId });
      return res.status(200).json({ success: true, isFavorite: true, message: "Added to favorites", data: favorite });
    }
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check if a challenge is favorited by user
// @route   GET /api/favorites/check/:id
// @access  Private
export const checkFavorite = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.userId;

    const favorite = await Favorite.findOne({ user: userId, challenge: challengeId });

    res.status(200).json({ success: true, isFavorite: !!favorite });
  } catch (error) {
    console.error("Error in checkFavorite:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's favorites
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await Favorite.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("challenge");

    console.log(`[FAVORITES] Found ${favorites.length} records for user ${userId}`);

    // Map to just return challenge objects, ensuring no nulls reach the client
    const data = favorites
      .filter(f => f.challenge != null)
      .map(f => f.challenge);

    console.log(`[FAVORITES] Returning ${data.length} valid challenges`);

    res.status(200).json({ success: true, count: data.length, data: data });
  } catch (error) {
    console.error("[FAVORITES ERROR]", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
