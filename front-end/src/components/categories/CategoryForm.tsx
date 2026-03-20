import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import { Purpose, PurposeOptions } from "../../types/enums/purpose";

export type CategoryFormData = {
  id:string;
  description: string;
  purpose: Purpose;
};

type CategoryFormProps = {
  formData: CategoryFormData;
  formErrors: Record<string, string>;
  editingCategoryId: string | null;
  submitting: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
};

export default function CategoryForm({
  formData,
  formErrors,
  editingCategoryId,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  return (
    <Card
      title={editingCategoryId ? "Editar categoria" : "Nova categoria"}
      subtitle="Preencha os dados da categoria"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={onChange}
            error={formErrors.description}
            placeholder="Ex.: Alimentação"
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Finalidade
            </label>

            <select
              name="purpose"
              value={formData.purpose}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-slate-500"
            >
              {PurposeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {formErrors.purpose && (
              <span className="mt-1 block text-sm text-red-600">
                {formErrors.purpose}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Salvando..."
              : editingCategoryId
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