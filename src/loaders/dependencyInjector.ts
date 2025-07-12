import { IModelConfig } from "@/interfaces/IModel";
import { Container } from "typedi";

export default (models: Array<IModelConfig>): void => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.instance);
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Dependency injection failed: ${error.message}`);
    } else {
      throw new Error("Dependency injection failed: Unknown error");
    }
  }
};
