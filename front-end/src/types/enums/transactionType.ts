export const TransactionType = {
  Expense: 1,
  Income: 2,
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionTypeLabel: Record<TransactionType, string> = {
  [TransactionType.Income]: "Receita",
  [TransactionType.Expense]: "Despesa",
};

export const TransactionTypeOptions = [
  { value: TransactionType.Income, label: "Receita" },
  { value: TransactionType.Expense, label: "Despesa" },
];
