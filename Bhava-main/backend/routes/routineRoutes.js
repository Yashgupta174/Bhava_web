import express from "express";
import { 
  addToRoutine, 
  getMyRoutines, 
  checkRoutineStatus, 
  removeFromRoutine,
  updateRoutineDays 
} from "../controllers/routineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyRoutines);
router.post("/:id", protect, addToRoutine);
router.get("/check/:id", protect, checkRoutineStatus);
router.delete("/:id", protect, removeFromRoutine);
router.put("/:id/days", protect, updateRoutineDays);

export default router;
