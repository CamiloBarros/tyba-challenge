import "reflect-metadata"; // Import reflect-metadata for decorators
import config from "@/config";
import express, { Express } from "express";
import loaders from "@/loaders";

function startServer(): void {
  console.log("Starting server...");
  
  const app: Express = express();
  loaders(app);

  // Iniciar servidor
  app
    .listen(config.port, () => {
      console.log(
        `🚀 Servidor ejecutándose en http://localhost:${config.port}`,
      );
      console.log(`📚 Health check: http://localhost:${config.port}/health`);
    })
    .on("error", (error: Error) => {
      console.error("Error al iniciar el servidor:", error);
      process.exit(1); // Salir del proceso en caso de error
    });
}

startServer();
