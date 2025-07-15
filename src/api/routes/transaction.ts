import { Router, Request, Response } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';
import { Container } from 'typedi';
import TransactionService from '@/services/transaction';

const route = Router();

export default (app: Router): void => {
  app.use('/transactions', route);

  route.get(
    '/history',
    isAuth,
    attachUser,
    async (req: Request, res: Response) => {
      try {
        // obteniendo el ID del usuario desde el query param
        const userId = req.query.userId as string;
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        // const userId = req.user!._id; // Asumiendo que el ID del usuario está en req.user
        const transactionService = Container.get(TransactionService);
        const history = await transactionService.getHistoryByUserId(userId);

        return res.json({
          success: true,
          data: history,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  );
};
