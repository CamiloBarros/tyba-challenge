import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '🟢 API funcionando correctamente',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/health`);
});

export default app;
