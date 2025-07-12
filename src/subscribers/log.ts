import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";

@EventSubscriber()
export default class LogSubscriber {
  @On(events.user.login)
  public async onLogLogin(userId: string): Promise<void> {
    try {
      const LogModel: Models.TransactionLogModel = Container.get(
        "transactionLogModel",
      );
      const newLog = new LogModel({
        userId,
        action: "signin",
        details: "User logged in",
      });
      await newLog.save();
    } catch (error) {
      console.error("Error saving log:", error);
    }
  }

  @On(events.user.register)
  public async onRegister(userId: string): Promise<void> {
    try {
      const LogModel: Models.TransactionLogModel = Container.get(
        "transactionLogModel",
      );
      const newLog = new LogModel({
        userId,
        action: "signup",
        details: "User registered",
      });
      await newLog.save();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  }

  @On(events.user.logout)
  public async onLogLogout(token: string): Promise<void> {
    try {
      const LogModel: Models.TransactionLogModel = Container.get(
        "transactionLogModel",
      );
      const newLog = new LogModel({
        userId: token,
        action: "logout",
        details: "User logged out",
      });
      await newLog.save();
    } catch (error) {
      console.error("Error saving log:", error);
    }
  }

  @On(events.restaurant.consult)
  public async onLogConsult(userId: string): Promise<void> {
    try {
      const LogModel: Models.TransactionLogModel = Container.get(
        "transactionLogModel",
      );
      const newLog = new LogModel({
        userId,
        action: "consult",
        details: "User consulted their data",
      });
      await newLog.save();
    } catch (error) {
      console.error("Error saving log:", error);
    }
  }
}
