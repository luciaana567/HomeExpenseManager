import Card from "../ui/Card";
import Button from "../ui/Button";
import type { Category } from "../../types/category";
import type { PagedResult } from "../../types/common";
import { Purpose } from "../../types/enums/purpose";

type CategoriesTableProps = {
  categories: PagedResult<Category> | null;
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
};

function getPurposeLabel(purpose: Purpose) {
  switch (purpose) {
    case Purpose.Income:
      return "Receita";
    case Purpose.Expense:
      return "Despesa";
    case Purpose.Both:
      return "Ambos";
    default:
      return "-";
  }
}

export default function CategoriesTable({
  categories,
  loading,
  onEdit,
  onDelete,
  onPageChange,
}: CategoriesTableProps) {
  const items = categories?.items ?? [];
  const currentPage = categories?.pageNumber ?? 1;
  const totalPages = categories?.totalPages ?? 1;

  return (
    <Card title="Lista de categorias" subtitle="Categorias cadastradas">
      {loading ? (
        <p className="text-slate-500">Carregando categorias...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">Nenhuma categoria encontrada.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Descrição
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Finalidade
                  </th>
                  <th className="px-15 py-3 text-sm font-semibold text-slate-700 text-right">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((category) => (
                  <tr key={category.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {category.description}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-700">
                      {getPurposeLabel(category.purpose)}
                    </td>

                    <td className="px-1 py-2">
                      <div className="flex justify-end gap-2">
                        <Button type="button" onClick={() => onEdit(category)}
                          className="px-2 py-1 text-xs">
                          Editar
                        </Button>

                        <Button
                          type="button"
                          onClick={() => onDelete(category.id)}
                          className="px-2 py-1 text-xs"
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex flex-col gap-3 border-t pt-4 md:flex-row md:items-center md:justify-between">

              <span className="text-sm text-slate-500">
                Página {currentPage} de {totalPages}
              </span>
              
               <div className="flex gap-2">
                <Button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  Anterior
                </Button>              

                <Button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  Próxima
                </Button>
               </div>
              
            </div>
          )}
        </>
      )}
    </Card>
  );
}