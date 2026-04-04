import Download from "../models/Download.js";
import Challenge from "../models/Challenge.js";

// @desc    Add a challenge to downloads
// @route   POST /api/downloads/:id
// @access  Private
export const addDownload = async (req, res) => {
    try {
        const challengeId = req.params.id;
        const userId = req.user._id;

        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        const existingDownload = await Download.findOne({ user: userId, challenge: challengeId });
        if (existingDownload) {
            return res.status(400).json({ message: "Challenge already in downloads" });
        }

        await Download.create({
            user: userId,
            challenge: challengeId
        });

        res.status(201).json({ message: "Added to downloads" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's downloads
// @route   GET /api/downloads
// @access  Private
export const getDownloads = async (req, res) => {
    try {
        const userId = req.user._id;
        const downloads = await Download.find({ user: userId })
            .populate("challenge")
            .sort("-createdAt");

        const challenges = downloads
            .filter(d => d.challenge != null)
            .map(d => d.challenge);

        res.json({
            success: true,
            count: challenges.length,
            data: challenges
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check if a challenge is downloaded
// @route   GET /api/downloads/check/:id
// @access  Private
export const checkDownload = async (req, res) => {
    try {
        const userId = req.user._id;
        const challengeId = req.params.id;

        const download = await Download.findOne({ user: userId, challenge: challengeId });

        res.json({
            isDownloaded: !!download
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove a challenge from downloads
// @route   DELETE /api/downloads/:id
// @access  Private
export const removeDownload = async (req, res) => {
    try {
        const userId = req.user._id;
        const challengeId = req.params.id;

        const download = await Download.findOneAndDelete({ user: userId, challenge: challengeId });

        if (!download) {
            return res.status(404).json({ message: "Download record not found" });
        }

        res.json({ message: "Removed from downloads" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
