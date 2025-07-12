import { Document, Model } from "mongoose";
import { IUser } from "@/interfaces/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser & Document;
      auth?: {
        _id: string;
        name: string;
        exp: number;
      };
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type BlacklistedTokenModel = Model<Document & IBlacklistToken>;
  }
}