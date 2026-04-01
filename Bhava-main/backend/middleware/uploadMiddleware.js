import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

// File filter for images and audio
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "audio/mpeg",   // .mp3
    "audio/mp3",    // .mp3 alternate
    "audio/wav",    // .wav
    "audio/x-wav",  // .wav alternate
    "audio/ogg",    // .ogm, .ogg
    "audio/m4a",    // .m4a
    "audio/x-m4a",  // .m4a alternate
    "audio/aac",    // .aac
    "audio/mp4",    // .mp4 audio
    "audio/x-aac"   // .aac alternate
  ];

  if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type (${file.mimetype}). Please upload a valid Image or Audio file.`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export default upload;
