import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import type { CategoryFilters as CategoryFiltersType } from "../../types/category";
import { PurposeOptions } from "../../types/enums/purpose";

type CategoryFiltersProps = {
  filters: CategoryFiltersType;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onClear: () => void;
};

export default function CategoryFilters({
  filters,
  onChange,
  onClear,
}: CategoryFiltersProps) {
  return (
    <Card title="Filtros" subtitle="">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Descrição"
          name="description"
          value={filters.description ?? ""}
          onChange={onChange}
          placeholder="Buscar por descrição"
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Finalidade
          </label>

          <select
            name="purpose"
            value={filters.purpose ?? ""}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-slate-500"
          >
            <option value="">Todas</option>
            {PurposeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Button type="button" onClick={onClear} size= "md">
          Limpar filtros
        </Button>
      </div>
    </Card>
  );
}