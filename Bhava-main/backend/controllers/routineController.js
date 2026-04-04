import Routine from "../models/Routine.js";
import Challenge from "../models/Challenge.js";

// @desc    Add a challenge to routine
// @route   POST /api/routines/:id
// @access  Private
export const addToRoutine = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const userId = req.userId;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    const existingRoutine = await Routine.findOne({ user: userId, challenge: challengeId });
    if (existingRoutine) {
      return res.status(400).json({ success: false, message: "Already in routine" });
    }

    const routine = await Routine.create({
      user: userId,
      challenge: challengeId,
      reminderTime: req.body.reminderTime || "06:00 AM",
      days: req.body.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    });

    res.status(201).json({ success: true, message: "Added to routine", data: routine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's routine
// @route   GET /api/routines
// @access  Private
export const getMyRoutines = async (req, res) => {
  try {
    const userId = req.userId;
    const routines = await Routine.find({ user: userId })
      .populate("challenge")
      .sort({ createdAt: -1 });

    const challenges = routines
      .filter(r => r.challenge != null)
      .map(r => r.challenge);

    res.status(200).json({ success: true, count: challenges.length, data: challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check if a challenge is in routine
// @route   GET /api/routines/check/:id
// @access  Private
export const checkRoutineStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const challengeId = req.params.id;

    const routine = await Routine.findOne({ user: userId, challenge: challengeId });

    res.status(200).json({ success: true, inRoutine: !!routine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove a challenge from routine
// @route   DELETE /api/routines/:id
// @access  Private
export const removeFromRoutine = async (req, res) => {
  try {
    const userId = req.userId;
    const challengeId = req.params.id;

    const routine = await Routine.findOneAndDelete({ user: userId, challenge: challengeId });

    if (!routine) {
      return res.status(404).json({ success: false, message: "Routine record not found" });
    }

    res.status(200).json({ success: true, message: "Removed from routine" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
