import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "firebase-admin.json");

let initialized = false;

// 1. Try to load from local file first
if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized from local file");
    initialized = true;
  } catch (error) {
    console.error("❌ Error initializing Firebase Admin from file:", error.message);
  }
} 

// 2. Fallback to Environment Variable (Production/Render)
if (!initialized && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized from Environment Variable");
    initialized = true;
  } catch (error) {
    console.error("❌ Error initializing Firebase Admin from ENV:", error.message);
  }
}

if (!initialized) {
  console.warn("⚠️ Firebase Admin NOT initialized. Push notifications will fail (Error 500).");
}

export default admin;
