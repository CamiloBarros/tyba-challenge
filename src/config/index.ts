import { config } from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/tyba-challenge",
  apiPrefix: "/api",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
}