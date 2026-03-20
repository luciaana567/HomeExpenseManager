import Button from "../ui/Button";
import Card from "../ui/Card";
import type { Category } from "../../types/category";
import type { PagedResult } from "../../types/common";
import type { Transaction } from "../../types/transaction";
import { TransactionTypeLabel } from "../../types/enums/transactionType";

type TransactionsTableProps = {
  transactions: PagedResult<Transaction> | null;
  categories: Category[];
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export default function TransactionsTable({
  transactions,
  categories,
  loading,
  onEdit,
  onDelete,
  onPageChange,
}: TransactionsTableProps) {
  const categoryMap = new Map(
    categories.map((category) => [category.id, category.description]),
  );

  return (
    <Card title="Lista de transações" subtitle="Resultados paginados">
      {loading ? (
        <p className="text-slate-500">Carregando transações...</p>
      ) : !transactions || transactions.items.length === 0 ? (
        <p className="text-slate-500">Nenhuma transação encontrada.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="px-3 py-3">Descrição</th>
                  <th className="px-3 py-3">Tipo</th>
                  <th className="px-3 py-3">Categoria</th>
                  <th className="px-3 py-3">Data</th>
                  <th className="px-3 py-3">Valor</th>
                  <th className="px-3 py-3 text-right">Ações</th>
                </tr>
              </thead>

              <tbody>
                {transactions.items.map((transaction) => (
                  <tr key={transaction.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3">{transaction.description}</td>
                    <td className="px-3 py-3">
                      {TransactionTypeLabel[transaction.type]}
                    </td>
                    <td className="px-3 py-3">
                      {categoryMap.get(transaction.categoryId) ?? "-"}
                    </td>
                    <td className="px-3 py-3">
                      {formatDate(transaction.transactionDate)}
                    </td>
                    <td className="px-3 py-3 font-medium">
                      {formatCurrency(Number(transaction.value))}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          onClick={() => onEdit(transaction)}
                        >
                          Editar
                        </Button>

                        <Button
                          type="button"
                          onClick={() => onDelete(transaction.id)}
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

          <div className="mt-4 flex flex-col gap-3 border-t pt-4 md:flex-row md:items-center md:justify-between">
            <span className="text-sm text-slate-500">
              Página {transactions.pageNumber} de {transactions.totalPages} •{" "}
              {transactions.totalItems} registro(s)
            </span>

            <div className="flex gap-2">
              <Button
                type="button"
                disabled={transactions.pageNumber <= 1}
                onClick={() => onPageChange(transactions.pageNumber - 1)}
              >
                Anterior
              </Button>

              <Button
                type="button"
                disabled={transactions.pageNumber >= transactions.totalPages}
                onClick={() => onPageChange(transactions.pageNumber + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}