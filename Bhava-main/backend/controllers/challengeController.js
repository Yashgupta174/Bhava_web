import Challenge from "../models/Challenge.js";

// @desc    Get all active challenges
// @route   GET /api/challenges
// @access  Public
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: challenges.length, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching challenges" });
  }
};

// @desc    Create a new challenge
// @route   POST /api/challenges
// @access  Private/Admin
export const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json({ success: true, data: challenge });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a challenge
// @route   PATCH /api/challenges/:id
// @access  Private/Admin
export const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a challenge
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.status(200).json({ success: true, message: "Challenge removed" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
