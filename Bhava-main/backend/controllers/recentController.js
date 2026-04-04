import Recent from "../models/Recent.js";
import Challenge from "../models/Challenge.js";

// @desc    Add a challenge to user's recent activity
// @route   POST /api/recent/:id
// @access  Private
export const addToRecent = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.userId;

    // Verify challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    // Upsert (update if exists, otherwise create)
    const recent = await Recent.findOneAndUpdate(
      { user: userId, challenge: challengeId },
      { viewedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: recent });
  } catch (error) {
    console.error("Error in addToRecent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's recent activity
// @route   GET /api/recent
// @access  Private
export const getRecents = async (req, res) => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 20;

    const recents = await Recent.find({ user: userId })
      .sort({ viewedAt: -1 })
      .limit(limit)
      .populate("challenge");

    // Map to just return challenge objects (flattening the relationship for the UI)
    const data = recents.filter(r => r.challenge != null).map(r => r.challenge);

    res.status(200).json({ success: true, count: data.length, data: data });
  } catch (error) {
    console.error("Error in getRecents:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
