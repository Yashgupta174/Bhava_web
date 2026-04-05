import Challenge from "../models/Challenge.js";

// @desc    Get all active challenges
// @route   GET /api/challenges
// @access  Public
export const getChallenges = async (req, res) => {
  try {
    // 🔹 OPTIMIZATION: Use projection to exclude heavy fields for the list view
    // This reduces the JSON size by up to 90% when fetching many challenges
    const challenges = await Challenge.find()
      .select("-sessions -hosts -detailsLongDescription") 
      .sort({ createdAt: -1 });
      
    res.status(200).json({ success: true, count: challenges.length, data: challenges });
  } catch (err) {
    console.error("Error fetching challenges:", err);
    res.status(500).json({ success: false, message: "Error fetching challenges" });
  }
};

// @desc    Get the current hero challenge
// @route   GET /api/challenges/hero
// @access  Public
export const getHeroChallenge = async (req, res) => {
  try {
    const hero = await Challenge.findOne({ isHero: true }).lean();
    if (!hero) {
      // Return 200 with success:false so the app can fallback to default UI
      return res.status(200).json({ success: false, message: "No hero challenge set" });
    }
    res.status(200).json({ success: true, data: hero });
  } catch (err) {
    console.error("Error fetching hero:", err);
    res.status(500).json({ success: false, message: "Error fetching hero" });
  }
};

// @desc    Get single challenge by ID
// @route   GET /api/challenges/:id
// @access  Public
export const getChallengeById = async (req, res) => {
  try {
    // 🔹 OPTIMIZATION: Use .lean() to skip Mongoose document hydration. 
    // This is much faster for large payloads (many sessions).
    const challenge = await Challenge.findById(req.params.id).lean();
    
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }
    res.status(200).json({ success: true, data: challenge });
  } catch (err) {
    console.error("Error fetching challenge details:", err);
    res.status(500).json({ success: false, message: "Error fetching challenge details" });
  }
};

// @desc    Create a new challenge
// @route   POST /api/challenges
// @access  Private/Admin
export const createChallenge = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse JSON strings from FormData
    try {
      if (typeof data.sessions === "string") {
        data.sessions = JSON.parse(data.sessions);
        console.log("Parsed sessions:", data.sessions.length);
      }
      if (typeof data.hosts === "string") {
        data.hosts = JSON.parse(data.hosts);
      }
    } catch (parseErr) {
      console.error("JSON Parsing Error:", parseErr.message);
      return res.status(400).json({ success: false, message: "Invalid JSON format for sessions or hosts" });
    }

    // Process sessions (e.g. split tags string into array)
    if (Array.isArray(data.sessions)) {
      data.sessions = data.sessions.map(session => {
        if (typeof session.tags === "string") {
          session.tags = session.tags.split(",").map(t => t.trim()).filter(t => t !== "");
        }
        return session;
      });
    }

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      console.log(`Processing ${req.files.length} uploaded files`);
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          data.image = file.path;
          console.log("Main image assigned:", data.image);
        } else if (file.fieldname.startsWith("audio_")) {
          const part = file.fieldname.split("_")[1];
          const index = parseInt(part);
          
          if (!isNaN(index) && data.sessions && data.sessions[index]) {
            data.sessions[index].audioUrl = file.path;
            console.log(`Audio for session ${index} assigned:`, file.path);
          } else {
            console.warn(`Warning: Could not assign file ${file.fieldname} - session index ${index} invalid or missing.`);
          }
        }
      });
    }

    const challenge = await Challenge.create(data);
    res.status(201).json({ success: true, data: challenge });
  } catch (err) {
    console.error("CRITICAL Create Challenge Error:", err);
    res.status(500).json({ 
      success: false, 
      message: err.name === "ValidationError" ? err.message : "Internal server error during creation",
      errorDetails: process.env.NODE_ENV === "production" ? undefined : err.message
    });
  }
};

// @desc    Update a challenge
// @route   PATCH /api/challenges/:id
// @access  Private/Admin
export const updateChallenge = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse JSON strings from FormData (if provided)
    try {
      if (typeof data.sessions === "string") data.sessions = JSON.parse(data.sessions);
      if (typeof data.hosts === "string") data.hosts = JSON.parse(data.hosts);
    } catch (parseErr) {
      return res.status(400).json({ success: false, message: "Invalid JSON format for sessions or hosts" });
    }

    // Process sessions (e.g. split tags string into array)
    if (Array.isArray(data.sessions)) {
      data.sessions = data.sessions.map(session => {
        if (typeof session.tags === "string") {
          session.tags = session.tags.split(",").map(t => t.trim()).filter(t => t !== "");
        }
        return session;
      });
    }

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          data.image = file.path;
        } else if (file.fieldname.startsWith("audio_")) {
          const part = file.fieldname.split("_")[1];
          const index = parseInt(part);

          if (!isNaN(index) && data.sessions && data.sessions[index]) {
            data.sessions[index].audioUrl = file.path;
          }
        }
      });
    }

    const challenge = await Challenge.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.status(200).json({ success: true, data: challenge });
  } catch (err) {
    console.error("Update Challenge Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};


// @desc    Delete a challenge
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.status(200).json({ success: true, message: "Challenge removed" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Set a challenge as hero
// @route   PATCH /api/challenges/:id/hero
// @access  Private/Admin
export const setHeroChallenge = async (req, res) => {
  try {
    // 1. Unset any existing hero
    await Challenge.updateMany({ isHero: true }, { isHero: false });

    // 2. Set the new hero
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id, 
      { isHero: true }, 
      { new: true }
    );

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.status(200).json({ success: true, message: "New hero challenge set", data: challenge });
  } catch (err) {
    console.error("Set Hero Error:", err);
    res.status(500).json({ success: false, message: "Error setting hero" });
  }
};

// @desc    Join a challenge
// @route   POST /api/challenges/:id/join
// @access  Private
export const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if already joined
    const isAlreadyJoined = user.joinedChallenges.includes(req.params.id);
    if (isAlreadyJoined) {
      return res.status(400).json({ success: false, message: "Already joined this challenge" });
    }

    // Add to user's joined challenges
    user.joinedChallenges.push(req.params.id);
    await user.save();

    // Increment challenge joined count (as a number if possible, or just string append)
    // Looking at the model, joinedCount is a String. Let's try to parse and increment.
    let count = parseInt(challenge.joinedCount) || 0;
    challenge.joinedCount = (count + 1).toString();
    await challenge.save();

    res.status(200).json({ 
      success: true, 
      message: "Successfully joined the challenge",
      data: user.joinedChallenges 
    });

  } catch (err) {
    console.error("Join Challenge Error:", err);
    res.status(500).json({ success: false, message: "Error joining challenge" });
  }
};

// @desc    Get challenges joined by current user
// @route   GET /api/challenges/my/joined
// @access  Private
export const getMyJoinedChallenges = async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.userId).populate({
      path: "joinedChallenges",
      select: "-sessions -hosts -detailsLongDescription"
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      count: user.joinedChallenges.length, 
      data: user.joinedChallenges 
    });
  } catch (err) {
    console.error("Get Joined Challenges Error:", err);
    res.status(500).json({ success: false, message: "Error fetching joined challenges" });
  }
};
