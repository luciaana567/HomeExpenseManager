export const Purpose = {
  Income: 0,
  Expense: 1,
  Both: 3,
} as const;

export type Purpose = (typeof Purpose)[keyof typeof Purpose];

export const PurposeLabel: Record<Purpose, string> = {
  [Purpose.Income]: "Receita",
  [Purpose.Expense]: "Despesa",
  [Purpose.Both]: "Ambons",
};

export const PurposeOptions = [
  { value: Purpose.Income, label: "Receita" },
  { value: Purpose.Expense, label: "Despesa" },
  { value: Purpose.Both, label: "Ambos" },
];
