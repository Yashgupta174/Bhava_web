import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    reminderTime: {
      type: String,
      default: "06:00 AM",
    },
    days: {
      type: [String],
      default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only have a specific challenge once in their routine
routineSchema.index({ user: 1, challenge: 1 }, { unique: true });

const Routine = mongoose.model("Routine", routineSchema);

export default Routine;
