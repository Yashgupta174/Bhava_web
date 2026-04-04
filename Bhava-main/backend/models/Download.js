import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true
    }
}, { timestamps: true });

// Ensure a user can only have one download record per challenge
downloadSchema.index({ user: 1, challenge: 1 }, { unique: true });

const Download = mongoose.model("Download", downloadSchema);

export default Download;
