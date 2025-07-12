import { IBlacklistToken } from "@/interfaces/IBlacklistToken";
import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    expireAfterSeconds: 60 * 60 * 24, // Expira en 24 horas
  },
  expiredAt: {
    type: Date,
    default: (): Date => new Date(Date.now() + 60 * 60 * 24 * 1000), // Expira en 24 horas
    expires: 60 * 60 * 24, // Expira en 24 horas
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBlacklistToken & mongoose.Document>('BlacklistedToken', blacklistedTokenSchema);