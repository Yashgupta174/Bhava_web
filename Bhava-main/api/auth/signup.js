import connectDB from "../../backend/config/db.js";
import { signup } from "../../backend/controllers/authController.js";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") {
    return signup(req, res);
  }
  return res.status(405).json({ success: false, message: "Method not allowed" });
}
