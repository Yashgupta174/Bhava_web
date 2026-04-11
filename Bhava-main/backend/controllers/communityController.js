import Community from "../models/Community.js";
import { v4 as uuidv4 } from 'uuid';

export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: communities.length, data: communities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCommunity = async (req, res) => {
  try {
    const { name, description, coverImage, contentBlocks } = req.body;
    
    const community = await Community.create({
      name,
      description,
      coverImage,
      contentBlocks,
      postedBy: req.userId,
      shareLink: uuidv4()
    });

    res.status(201).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, message: "Community deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateCommunity = async (req, res) => {
  try {
    const { name, description, coverImage, contentBlocks } = req.body;
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    community.name = name || community.name;
    community.description = description || community.description;
    community.coverImage = coverImage || community.coverImage;
    community.contentBlocks = contentBlocks || community.contentBlocks;

    await community.save();
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
