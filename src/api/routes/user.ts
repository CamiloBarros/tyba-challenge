import { Router, Request, Response } from 'express';
import attachUser from '../middlewares/attachUser'
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router): void => {
  app.use('/users', route);

  route.get('/me', isAuth, attachUser, (req: Request, res: Response) => {
    res.status(200).json({
      user: req.user,
    });
  });
}