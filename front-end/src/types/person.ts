export type Person = {
  id: string;
  name: string;
  birthday: string;
  userId?: string;
};

export type CreatePersonRequest = {
  name: string;
  birthday: string;
};

export type UpdatePersonRequest = {
  name: string;
  birthday: string;
};

export type PersonFilters = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type PersonSummaryItem = {
  personId: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type PersonsSummaryFilters = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type PersonsSummaryResponse = {
  persons: PersonSummaryItem[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
