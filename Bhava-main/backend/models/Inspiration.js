import mongoose from "mongoose";

const inspirationSchema = new mongoose.Schema({
  source: {
    type: String,
    required: [true, "Source is required (e.g., BHAGAVAD GITA)"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Quote content is required"],
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inspiration = mongoose.model("Inspiration", inspirationSchema);
export default Inspiration;
