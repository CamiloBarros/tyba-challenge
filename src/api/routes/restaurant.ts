import { Request, Response, Router } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';
import { Container } from 'typedi';
import RestaurantService from '@/services/restaurant';

const route = Router();

export default (app: Router): void => {
  app.use('/restaurants', route);

  route.get(
    '/:city',
    isAuth,
    attachUser,
    async (req: Request, res: Response) => {
      const { city } = req.params;
      if (!city) {
        return res.status(400).json({ error: 'City is required' });
      }

      try {
        const restaurantService = Container.get(RestaurantService);

        const restaurants = await restaurantService.getRestaurantsByCity(
          city,
          req.user?.id
        );

        return res.json({
          success: true,
          data: restaurants,
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
