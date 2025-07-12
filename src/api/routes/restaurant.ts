import { Router } from 'express';

const route = Router();

export default (app: Router): void => {
  app.use('/restaurants', route);

  route.get('/', (req, res) => {
    // Lógica para obtener todos los restaurantes
    res.json({ message: 'List of restaurants' });
  });
};