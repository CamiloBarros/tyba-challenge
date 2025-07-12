import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "@/services/auth";
import { IUserInputDTO } from "@/interfaces/IUser";
import { celebrate, Joi } from "celebrate";
import isAuth, { getTokenFromHeader } from "../middlewares/isAuth";

const route = Router();

export default (app: Router): void => {
  app.use("/auth", route);

  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.login(
          email,
          password,
        );

        return res.status(200).json({ user, token });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return next(error);
        }

        return next(new Error("An unexpected error occurred"));
      }
    },
  );

  route.post(
    "/register",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.register(
          req.body as IUserInputDTO,
        );
        return res.status(201).json({ user, token });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return next(error);
        }

        return next(new Error("An unexpected error occurred"));
      }
    },
  );

  route.get(
    "/logout",
    isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = getTokenFromHeader(req);

        if (!token) {
          return res.status(400).json({ error: "Token is required" });
        }

        const authServiceInstance = Container.get(AuthService);
        await authServiceInstance.logout(token);

        return res.status(204).send();
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === "Token has been invalidated") {
            return res.status(401).json({ error: error.message });
          }
          return next(error);
        }
      }
    },
  );
};
