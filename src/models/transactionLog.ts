import mongoose from "mongoose";
import { ITransactionLog } from "@/interfaces/ITransactionLog";

const transactionLogSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true },
    action: {
      type: String,
      enum: ["signin", "signup", "logout", "consult"],
      required: true,
    },
    timestamp: { type: Date, default: Date.now, required: true },
    details: { type: String, default: "" }, // Optional field for additional information
  },
  {
    versionKey: false, // Disable versioning
  },
);

export default mongoose.model<ITransactionLog & mongoose.Document>(
  "TransactionLog",
  transactionLogSchema,
);
