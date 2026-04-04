const express = require("express");
const router = express.Router();
const intentionController = require("../controllers/intentionController");
const authMiddleware = require("../middleware/authMiddleware");

// All intention routes require authentication
router.use(authMiddleware);

router.post("/", intentionController.addIntention);
router.get("/", intentionController.getIntentions);
router.delete("/:id", intentionController.deleteIntention);

module.exports = router;
