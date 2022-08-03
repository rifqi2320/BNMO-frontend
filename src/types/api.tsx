import { Transaction, User } from "./models";

// Requests
export type RegisterReq = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginReq = {
  username: string;
  password: string;
};

// Response
export type Res<T> = {
  isError: boolean;
  message: string;
  data: T | null;
};

export type LoginRes = {
  token: string;
  user: User;
};

export type RegisterRes = {
  user: {
    id: string;
    username: string;
  };
};

export type SelfDataRes = {
  user: User;
};

export type TransactionsRes = {
  transactions: Transaction[];
};

export type TransactionRes = {
  transaction: Transaction;
};

export type CurrenciesRes = {
  currencies: string[];
};

export type UsersRes = {
  users: User[];
};

export type VerifyRes = {
  user: User;
};

export type ApproveRequestRes = {
  transactionApproved: Transaction;
};

export type RejectRequestRes = {
  deletedTransaction: Transaction;
};
