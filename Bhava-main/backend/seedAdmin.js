import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    const email = "admin123@gmail.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      
      // Ensure they have admin role in case they signed up normally
      existingAdmin.role = "admin";
      // We can also reset their password if needed, but let's just make them admin
      await existingAdmin.save();
      
      console.log("Verified admin role. You can log in with your existing password!");
    } else {
      const adminUser = new User({
        name: "Admin",
        email: email,
        password: "admin123", // Will be hashed by pre-save hook
        role: "admin",
        isVerified: true
      });
      await adminUser.save();
      console.log("Admin user created successfully!");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

seedAdmin();
