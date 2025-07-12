import { ITransactionLog } from "@/interfaces/ITransactionLog";
import { Container, Service } from "typedi";

@Service()
export default class TransactionService {
  private transactionModel: Models.TransactionLogModel;

  constructor() {
    this.transactionModel = Container.get("transactionLogModel");
  }

  public async getHistoryByUserId(userId: string): Promise<ITransactionLog[]> {
    try {
      // Verificar que el transactionModel existe
      if (!this.transactionModel) {
        throw new Error("Transaction model not properly injected");
      }

      const transactionLogs = await this.transactionModel.find({ userId });

      if (!transactionLogs || transactionLogs.length === 0) {
        throw new Error("No transaction logs found for this user");
      }
      
      return transactionLogs;;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to retrieve transaction logs: ${error.message}`,
        );
      }
      throw new Error("Failed to retrieve transaction logs: Unknown error");
    }
  }
}
