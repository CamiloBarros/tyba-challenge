import { Router } from "express";

const route = Router();

export default (app: Router): void => {
  app.use("/transactions", route);

  route.get("/history", (req, res) => {
    // Lógica para obtener el historial de transacciones
    res.json({ message: "Transaction history endpoint" });
  });
};
