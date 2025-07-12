import { Router } from "express";
import auth from "./routes/auth";
import restaurant from "./routes/restaurant";
import transaction from "./routes/transaction";

export default (): Router => {
  const app: Router = Router();

  auth(app);
  restaurant(app);
  transaction(app);
  
  return app;
};
