import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import type { Category } from "../../types/category";
import type { TransactionFilters as TransactionFiltersType } from "../../types/transaction";
import { TransactionTypeOptions } from "../../types/enums/transactionType";

type TransactionFiltersProps = {
  filters: TransactionFiltersType;
  categories: Category[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onClear: () => void;
};

export default function TransactionFilters({
  filters,
  categories,
  onChange,
  onClear,
}: TransactionFiltersProps) {
  return (
    <Card
      title="Filtros"
      subtitle=""
    >
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-2">
        <Input
          label="Data inicial"
          name="startDate"
          type="date"
          value={filters.startDate ?? ""}
          onChange={onChange}
        />

        <Input
          label="Data final"
          name="endDate"
          type="date"
          value={filters.endDate ?? ""}
          onChange={onChange}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Tipo
          </label>
          <select
            name="type"
            value={filters.type ?? ""}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
          >
            <option value="">Todos</option>
            {TransactionTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Categoria
          </label>
          <select
            name="categoryId"
            value={filters.categoryId ?? ""}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={onClear}>
          Limpar filtros
        </Button>
      </div>
    </Card>
  );
}