import express from "express";
import { submitContact, getContacts } from "../controllers/contactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitContact);          // public — anyone can submit
router.get("/", protect, getContacts);    // protected — admin/authenticated only

export default router;
