export type Person = {
  id: string;
  name?: string;
  birthday?: Date;
  age?: number;
};

export type CreatePerson = {
  name: string;
  Birthday: Date;
};

export type PersonTotals = {
  personId: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type PersonSummaryFilters = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
};
