import { Request, Response, Router } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';

const route = Router();

export default (app: Router): void => {
  app.use('/restaurants', route);

  route.get('/', isAuth, attachUser, (req: Request, res: Response ) => {
    // Lógica para obtener todos los restaurantes
    res.json({ message: 'List of restaurants' });
  });
};