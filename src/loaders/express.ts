import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "@/api";
import config from "@/config";

export default (app: express.Application): void => {
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.head("/health", (req, res) => {
    res.status(200).send();
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.apiPrefix, routes());

  // Handle 404 errors
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404).json({ message: error.message });
    next(error);
  });

  // Handle 401 errors express-jwt
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(err);
  });

  // Handle other errors
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  });
};
