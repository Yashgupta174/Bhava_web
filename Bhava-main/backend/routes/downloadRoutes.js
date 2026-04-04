import express from "express";
import { addDownload, getDownloads, checkDownload, removeDownload } from "../controllers/downloadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", protect, addDownload);
router.get("/", protect, getDownloads);
router.get("/check/:id", protect, checkDownload);
router.delete("/:id", protect, removeDownload);

export default router;
