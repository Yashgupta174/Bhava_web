import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Custom Cloudinary Storage for Multer.
 * Automatically handles folder placement and dynamic resource types (image/video/auto).
 */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder and resource type based on mime type or field name
    const isImage = file.mimetype.startsWith("image/") || file.fieldname === "image";
    const isAudio = file.mimetype.startsWith("audio/") || file.fieldname.startsWith("audio_");
    
    return {
      folder: isImage ? "bhava/images" : "bhava/audio",
      resource_type: isImage ? "image" : "auto", // 'auto' is best for audio
      allowed_formats: isImage 
        ? ["jpg", "png", "webp", "jpeg"] 
        : ["mp3", "wav", "ogg", "m4a", "aac"],
      public_id: `${file.fieldname}-${Date.now()}`
    };
  },
});

export { cloudinary, storage };
