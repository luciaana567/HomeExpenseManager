import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionForm, {
  type TransactionFormData,
} from "../../components/transactions/TransactionForm";
import TransactionsTable from "../../components/transactions/TransactionsTable";
import { useToast } from "../../hooks/useToast";
import { getCategories } from "../../services/category.service";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../../services/transaction.service";
import type { Category } from "../../types/category";
import type { PagedResult } from "../../types/common";
import { TransactionType } from "../../types/enums/transactionType";
import type {
  CreateTransactionRequest,
  Transaction,
  TransactionFilters as TransactionFiltersType,
  UpdateTransactionRequest,
} from "../../types/transaction";

const PAGE_SIZE = 10;

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getMonthStart(): string {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
}

function getMonthEnd(): string {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];
}

export default function TransactionsPage() {
  const { showToast } = useToast();
  const personId = localStorage.getItem("personId");

  const [transactions, setTransactions] = useState<PagedResult<Transaction> | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);

  const [filters, setFilters] = useState<TransactionFiltersType>({
    startDate: getMonthStart(),
    endDate: getMonthEnd(),
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    personId: personId ?? undefined,
  });

  const [formData, setFormData] = useState<TransactionFormData>({
    description: "",
    value: "",
    type: TransactionType.Expense,
    transactionDate: getToday(),
    categoryId: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  async function loadCategories() {
    try {
      const response = await getCategories({
        pageNumber: 1,
        pageSize: 1000,
      });

      setCategories(response);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar categorias.",
        "error",
      );
    }
  }

  async function loadTransactions(currentFilters: TransactionFiltersType) {
    if (!personId) {
      showToast("Não foi possível identificar a pessoa logada.", "error");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await getTransactions({
        ...currentFilters,
        personId,
        pageSize: PAGE_SIZE,
      });

      setTransactions(response);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar transações.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCategories();
  }, []);

  useEffect(() => {
    void loadTransactions(filters);
  }, [filters]);

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : name === "type" ? Number(value) : value,
      pageNumber: 1,
    }));
  }

  function clearFilters() {
    setFilters({
      startDate: getMonthStart(),
      endDate: getMonthEnd(),
      pageNumber: 1,
      pageSize: PAGE_SIZE,
      personId: personId ?? undefined,
    });
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: name === "type" ? Number(value) : value,
      };

      if (name === "type") {
        return {
          ...next,
          categoryId: "",
        };
      }

      return next;
    });

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function resetForm() {
    setEditingTransactionId(null);
    setFormData({
      description: "",
      value: "",
      type: TransactionType.Expense,
      transactionDate: getToday(),
      categoryId: "",
    });
    setFormErrors({});
  }

  function handleOpenCreate() {
    resetForm();
    setShowForm(true);
  }

  function handleCancelForm() {
    resetForm();
    setShowForm(false);
  }

  function validateForm() {
    const errors: Record<string, string> = {};

    if (!formData.description.trim()) {
      errors.description = "Informe a descrição.";
    }

    if (!formData.value.trim()) {
      errors.value = "Informe o valor.";
    } else if (Number(formData.value) <= 0) {
      errors.value = "O valor deve ser maior que zero.";
    }

    if (!formData.transactionDate) {
      errors.transactionDate = "Informe a data.";
    }

    if (!formData.categoryId) {
      errors.categoryId = "Selecione a categoria.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!personId) {
      showToast("Não foi possível identificar a pessoa logada.", "error");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const payload: CreateTransactionRequest | UpdateTransactionRequest = {
      description: formData.description.trim(),
      value: Number(formData.value),
      type: formData.type,
      transactionDate: formData.transactionDate,
      categoryId: formData.categoryId,
      personId,
    };

    try {
      setSubmitting(true);

      if (editingTransactionId) {
        await updateTransaction(editingTransactionId, payload);
        showToast("Transação atualizada com sucesso.", "success");
      } else {
        await createTransaction(payload);
        showToast("Transação cadastrada com sucesso.", "success");
      }

      resetForm();
      setShowForm(false);
      await loadTransactions(filters);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar transação.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransactionId(transaction.id);
    setFormData({
      description: transaction.description,
      value: String(transaction.value),
      type: transaction.type,
      transactionDate: transaction.transactionDate.split("T")[0],
      categoryId: transaction.categoryId,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Deseja realmente excluir esta transação?");

    if (!confirmed) return;

    try {
      await deleteTransaction(id);
      showToast("Transação excluída com sucesso.", "success");

      const hasOnlyOneItemOnPage = (transactions?.items.length ?? 0) === 1;
      const currentPage = filters.pageNumber ?? 1;

      if (hasOnlyOneItemOnPage && currentPage > 1) {
        setFilters((prev) => ({
          ...prev,
          pageNumber: currentPage - 1,
        }));
        return;
      }

      await loadTransactions(filters);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir transação.",
        "error",
      );
    }
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({
      ...prev,
      pageNumber: page,
    }));
  }

  return (
  <div className="space-y-6 pb-6">
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Transações</h1>
        <p className="mt-1 text-slate-500">
          Consulte, cadastre, edite e exclua suas transações
        </p>
      </div>      
    </div>

    {showForm ? (
      <TransactionForm
        formData={formData}
        formErrors={formErrors}
        categories={categories}
        editingTransactionId={editingTransactionId}
        submitting={submitting}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelForm}
      />
    ) : (
      <>
        <TransactionFilters
          filters={filters}
          categories={categories}
          onChange={handleFilterChange}
          onClear={clearFilters}
        />

        <TransactionsTable
          transactions={transactions}
          categories={categories}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />

        {!showForm && (
        <div className="self-start">
          <Button type="button" onClick={handleOpenCreate}  fullWidth={true}>
            + Adicionar transação
          </Button>
        </div>
      )}
      </>
    )}
  </div>
);
}