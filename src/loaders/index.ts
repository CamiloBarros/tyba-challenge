import { Express } from "express";
import dependencyInjectorLoader from "./dependencyInjector";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import { IModelConfig } from "@/interfaces/IModel";

export default async (expressApp: Express): Promise<void> => {
  await mongooseLoader();

  // Load dependency injector
  const models: Array<IModelConfig> = [
    { name: "userModel", instance: (await import("@/models/user")).default },
    // Add other models as needed
  ];

  dependencyInjectorLoader(models);
  expressLoader(expressApp);
};
