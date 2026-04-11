import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["text", "image", "video"], 
    required: true 
  },
  value: { type: String, required: true }, // The text content or media URL
  order: { type: Number, default: 0 }
});

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  contentBlocks: [contentBlockSchema],
  membersCount: { type: Number, default: 0 },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shareLink: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

communitySchema.index({ shareLink: 1 });

const Community = mongoose.model("Community", communitySchema);
export default Community;
