export interface ITransactionLog {
  _id: string;
  userId: string;
  action: 'signin' | 'signup' | 'logout' | 'consult';
  timestamp: Date;
  details?: string; // Optional field for additional information
}