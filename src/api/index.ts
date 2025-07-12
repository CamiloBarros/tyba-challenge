import { Router } from "express";
import auth from "./routes/auth";
import users from "./routes/user";
import restaurant from "./routes/restaurant";
import transaction from "./routes/transaction";

export default (): Router => {
  const app: Router = Router();

  auth(app);
  users(app);
  restaurant(app);
  transaction(app);
  
  return app;
};
