import type { Purpose } from "./enums/purpose";

export type Category = {
  id: string;
  description?: string;
  purpose?: Purpose;
};

export type CreateCategory = {
  description: string;
  purpose: Purpose;
};

export type CategoryTotals = {
  categoryId: string;
  description: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type CategorySummaryFilters = {
  description?: string;
  pageNumber?: number;
  pageSize?: number;
};
