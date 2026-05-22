import mongoose from 'mongoose';

// JWT secret (hardcoded as requested — move to env var in production)
export const JWT_SECRET = "DetuDragu105";

// MongoDB connection
export const dbUsername = "rutu_shah_user";
export const dbPassword = "Detu105";
mongoose
    .connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.zwa3ewd.mongodb.net/brainly`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

