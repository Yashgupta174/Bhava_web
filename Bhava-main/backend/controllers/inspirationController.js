import Inspiration from "../models/Inspiration.js";

// @desc    Get all inspirations (Admin view)
// @route   GET /api/inspirations
export const getAllInspirations = async (req, res) => {
  try {
    const inspirations = await Inspiration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inspirations.length,
      data: inspirations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get latest inspirations (App view)
// @route   GET /api/inspirations/latest
export const getLatestInspirations = async (req, res) => {
  try {
    // Return the latest 10 active inspirations
    const inspirations = await Inspiration.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10);
      
    res.status(200).json({
      success: true,
      data: inspirations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new inspiration
// @route   POST /api/inspirations
export const createInspiration = async (req, res) => {
  try {
    const { source, content, author, date, isActive } = req.body;

    if (!source || !content) {
      return res.status(400).json({
        success: false,
        message: "Source and content are required",
      });
    }

    const inspiration = await Inspiration.create({
      source,
      content,
      author,
      date,
      isActive,
    });

    res.status(201).json({
      success: true,
      data: inspiration,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete inspiration
// @route   DELETE /api/inspirations/:id
export const deleteInspiration = async (req, res) => {
  try {
    const inspiration = await Inspiration.findById(req.params.id);

    if (!inspiration) {
      return res.status(404).json({
        success: false,
        message: "Inspiration not found",
      });
    }

    await inspiration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Inspiration removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
