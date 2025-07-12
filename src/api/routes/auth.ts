import { Router } from "express";

const route = Router();

export default (app: Router): void => {
  app.use("/auth", route);

  route.post("/login", (req, res) => {
    // Lógica de inicio de sesión
    res.json({ message: "Login endpoint" });
  });

  route.post("/register", (req, res) => {
    // Lógica de registro
    res.json({ message: "Register endpoint" });
  });

  route.get("/logout", (req, res) => {
    // Lógica de cierre de sesión
    res.json({ message: "Logout endpoint" });
  });
}

