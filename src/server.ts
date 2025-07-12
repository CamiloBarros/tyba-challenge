import express, { Express } from "express";
import config from "@/config";
import routes from "@/api";

import cors from "cors";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(config.apiPrefix, routes());

// Rutas
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "🟢 API funcionando correctamente",
  });
});

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${config.port}`);
  console.log(`📚 Health check: http://localhost:${config.port}/health`);
});

export default app;
