import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import type { Category } from "../../types/category";
import {
  TransactionType,
  TransactionTypeOptions,
} from "../../types/enums/transactionType";
import { Purpose } from "../../types/enums/purpose";

export type TransactionFormData = {
  description: string;
  value: string;
  type: TransactionType;
  transactionDate: string;
  categoryId: string;
};

type TransactionFormProps = {
  formData: TransactionFormData;
  formErrors: Record<string, string>;
  categories: Category[];
  editingTransactionId: string | null;
  submitting: boolean;
  isMinor: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
};

export default function TransactionForm({
  formData,
  formErrors,
  categories,
  editingTransactionId,
  submitting,
  isMinor,
  onChange,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const availableCategories = categories.filter((category) => {
    if (formData.type === TransactionType.Income) {
      return (
        category.purpose === Purpose.Income ||
        category.purpose === Purpose.Both
      );
    }

    return (
      category.purpose === Purpose.Expense ||
      category.purpose === Purpose.Both
    );
  });

  return (
    <Card
      title={editingTransactionId ? "Editar transação" : "Nova transação"}
      subtitle="Preencha os dados da transação"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={onChange}
            error={formErrors.description}
            placeholder="Ex.: Mercado"
          />

          <Input
            label="Valor"
            name="value"
            type="number"
            step="0.01"
            min="0"
            value={formData.value}
            onChange={onChange}
            error={formErrors.value}
            placeholder="0,00"
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tipo
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
            >
              {TransactionTypeOptions.map((option) => {
                const disabled =
                  isMinor && option.value === TransactionType.Income;

                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={disabled}
                  >
                    {option.label}
                  </option>
                );
              })}
            </select>

            {formErrors.type && (
              <span className="mt-1 block text-sm text-red-500">
                {formErrors.type}
              </span>
            )}

            {isMinor && (
              <span className="mt-1 block text-sm text-amber-600">
                Menores de 18 anos só podem cadastrar despesas.
              </span>
            )}
          </div>

          <Input
            label="Data"
            name="transactionDate"
            type="date"
            value={formData.transactionDate}
            onChange={onChange}
            error={formErrors.transactionDate}
          />

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Categoria
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
            >
              <option value="">Selecione</option>
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>

            {formErrors.categoryId && (
              <span className="mt-1 block text-sm text-red-500">
                {formErrors.categoryId}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Salvando..."
              : editingTransactionId
                ? "Atualizar"
                : "Cadastrar"}
          </Button>

          <Button type="button" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}