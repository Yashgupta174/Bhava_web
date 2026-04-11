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
    const { day } = req.query;

    console.log(`[ROUTINE] Fetching routines for user: ${userId}, day: ${day || 'any'}`);

    let query = { user: userId };
    if (day && day !== "null" && day !== "undefined") {
      // In Mongoose, querying an array field with a single value returns all docs containing that value
      query.days = day;
    }

    console.log(`[ROUTINE] Query: ${JSON.stringify(query)}`);

    const routines = await Routine.find(query)
      .populate("challenge")
      .sort({ createdAt: -1 });

    console.log(`[ROUTINE] Found ${routines.length} raw records`);

    const challenges = routines
      .filter(r => r.challenge != null)
      .map(r => r.challenge);

    console.log(`[ROUTINE] Returning ${challenges.length} valid challenges`);

    res.status(200).json({ success: true, count: challenges.length, data: challenges });
  } catch (error) {
    console.error("[ROUTINE ERROR]", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoutineDays = async (req, res) => {
  try {
    const { days } = req.body; // Array e.g ["Mon", "Tue"]
    const routine = await Routine.findOneAndUpdate(
      { user: req.userId, challenge: req.params.id },
      { days: days },
      { new: true }
    );

    if (!routine) {
      return res.status(404).json({ success: false, message: "Routine not found" });
    }

    res.status(200).json({ success: true, data: routine });
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
