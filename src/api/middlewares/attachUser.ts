import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    // Check if the request has an auth object
    if (!req.auth || !req.auth._id) {
      return res.status(401).json({ error: 'No authentication token found' });
    }

    const userModel = Container.get("userModel") as Models.UserModel;

    if (!userModel) {
      throw new Error("User model not found in dependency container");
    }

    const userRecord = await userModel.findById(req.auth._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }

    req.user = userRecord;
    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(new Error(`Failed to attach user: ${error.message}`));
    }
    return next(new Error("Failed to attach user: Unknown error"));
  }
};
