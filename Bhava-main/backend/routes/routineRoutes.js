import express from "express";
import { 
  addToRoutine, 
  getMyRoutines, 
  checkRoutineStatus, 
  removeFromRoutine 
} from "../controllers/routineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyRoutines);
router.post("/:id", protect, addToRoutine);
router.get("/check/:id", protect, checkRoutineStatus);
router.delete("/:id", protect, removeFromRoutine);

export default router;
