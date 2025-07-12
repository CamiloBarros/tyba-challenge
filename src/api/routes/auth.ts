import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "@/services/auth";
import { IUserInputDTO } from "@/interfaces/IUser";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router): void => {
  app.use("/auth", route);

  route.post("/login", (req, res) => {
    // Lógica de inicio de sesión
    res.json({ message: "Login endpoint" });
  });

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
        const { user, token } = await authServiceInstance.register(req.body as IUserInputDTO);
        return res.status(201).json({ user, token });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return next(error);
        }

        return next(new Error("An unexpected error occurred"));
      }
    },
  );

  route.get("/logout", (req, res) => {
    // Lógica de cierre de sesión
    res.json({ message: "Logout endpoint" });
  });
};
