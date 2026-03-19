import type { TransactionType } from "./auth";

export type Transaction = {
  id: string;
  description?: string;
  value?: number;
  type?: TransactionType;
  transactionDate?: Date;
  categoryId?: string;
  personId?: string;
};

export type CreateTransaction = {
  description: string;
  value: number;
  type: TransactionType;
  transactionDate: Date;
  categoryId: string;
  personId: string;
};

export type UpdateTransaction = {
  id: string;
  description?: string;
  value?: number;
  type?: TransactionType;
  transactionDate?: Date;
  categoryId: string;
  personId: string;
};

export type TransactionFilter = {
  startDate?: Date;
  endDate?: Date;
  TtansactionType?: TransactionType;
  categoryId?: string;
  personId?: string;
  pageNumber?: number;
  pageSize?: number;
};
