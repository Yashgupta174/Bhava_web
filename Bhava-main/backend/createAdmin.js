import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        const adminData = {
            name: "admin",
            email: "admin123@gmail.com",
            password: "admin123",
            role: "admin",
            isVerified: true
        };

        const existingUser = await User.findOne({ email: adminData.email });

        if (existingUser) {
            console.log("User already exists. Updating to Admin...");
            existingUser.role = "admin";
            existingUser.password = adminData.password; // This will be hashed by pre-save hook
            await existingUser.save();
            console.log("Admin account updated successfully!");
        } else {
            console.log("Creating new Admin account...");
            await User.create(adminData);
            console.log("Admin account created successfully!");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error creating admin:", err.message);
        process.exit(1);
    }
};

createAdmin();
