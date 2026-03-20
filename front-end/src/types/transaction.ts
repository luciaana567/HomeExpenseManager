import type { TransactionType } from "./enums/transactionType";

export type Transaction = {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  transactionDate: string;
  categoryId: string;
  personId: string;
};

export type CreateTransactionRequest = {
  description: string;
  value: number;
  type: TransactionType;
  transactionDate: string;
  categoryId: string;
  personId: string;
};

export type UpdateTransactionRequest = {
  description: string;
  value: number;
  type: TransactionType;
  transactionDate: string;
  categoryId: string;
  personId: string;
};

export type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  categoryId?: string;
  pageNumber?: number;
  pageSize?: number;
  personId?: string;
};
