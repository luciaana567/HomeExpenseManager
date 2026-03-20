import type { Purpose } from "./enums/purpose";

export type Category = {
  id: string;
  description: string;
  userId?: string;
  purpose: Purpose;
};

export type CreateCategoryRequest = {
  description: string;
  purpose: Purpose;
};

export type UpdateCategoryRequest = {
  id: string;
  description: string;
  purpose: Purpose;
};

export type CategoryFilters = {
  description?: string;
  purpose?: Purpose;
  pageNumber?: number;
  pageSize?: number;
};

export type CategorySummaryItem = {
  categoryId: string;
  description: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type CategoriesSummaryFilters = {
  description?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type CategoriesSummaryResponse = {
  categories: CategorySummaryItem[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
