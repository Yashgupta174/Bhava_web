import connectDB from "../../backend/config/db.js";
import { getAllChallenges, createChallenge } from "../../backend/controllers/challengeController.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    return getAllChallenges(req, res);
  }
  
  if (req.method === "POST") {
    return createChallenge(req, res);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
