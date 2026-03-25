import connectDB from "../../backend/config/db.js";
import { login } from "../../backend/controllers/authController.js";

export default async function handler(req, res) {
  // 1. Ensure DB connection
  await connectDB();

  // 2. Delegate to existing controller logic
  // (Express controllers usually expect req/res. Vercel functions are compatible)
  if (req.method === "POST") {
    return login(req, res);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
