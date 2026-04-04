import Intention from "../models/Intention.js";

export const addIntention = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ success: false, message: "Content is required" });
        }

        const newIntention = new Intention({
            userId: req.userId,
            content
        });

        await newIntention.save();

        res.status(201).json({
            success: true,
            message: "Intention added successfully",
            data: newIntention
        });
    } catch (error) {
        console.error("Add Intention Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getIntentions = async (req, res) => {
    try {
        const intentions = await Intention.find({ userId: req.userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: intentions.length,
            data: intentions
        });
    } catch (error) {
        console.error("Get Intentions Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteIntention = async (req, res) => {
    try {
        const { id } = req.params;
        const intention = await Intention.findOneAndDelete({ _id: id, userId: req.userId });

        if (!intention) {
            return res.status(404).json({ success: false, message: "Intention not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Intention removed"
        });
    } catch (error) {
        console.error("Delete Intention Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
