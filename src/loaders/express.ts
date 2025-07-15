import express, { Request, Response, NextFunction } from 'express';
import routes from '@/api';
import config from '@/config';
import cors from './cors';
import limiter from './limiter';

export default (app: express.Application): void => {
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  app.head('/health', (req, res) => {
    res.status(200).send();
  });

  app.use(cors);
  app.use(limiter);
  app.use(express.json());
  app.use(config.apiPrefix, routes());

  // Handle 404 errors
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404).json({ message: error.message });
    next(error);
  });

  // Handle 401 errors express-jwt
  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    // Type guard para verificar si es un Error con propiedad name
    if (
      err &&
      typeof err === 'object' &&
      'name' in err &&
      err.name === 'UnauthorizedError'
    ) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next(err);
  });
};
