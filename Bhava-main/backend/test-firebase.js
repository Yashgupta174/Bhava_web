import admin from "./config/firebase.js";

async function testFirebase() {
  try {
    if (admin.apps.length > 0) {
      console.log("✅ Firebase Admin is initialized!");
      console.log("Project ID:", admin.app().options.credential.projectId || "Known via cert");
      process.exit(0);
    } else {
      console.error("❌ Firebase Admin failed to initialize.");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error during Firebase test:", error);
    process.exit(1);
  }
}

testFirebase();
