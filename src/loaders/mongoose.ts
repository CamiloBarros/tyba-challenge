import mongoose from "mongoose";
import config from "@/config";

export default async (): Promise<void> => {
  try {
    await mongoose.connect(config.databaseURL);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

