import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import CategoryFilters from "../../components/categories/CategoryFilters";
import CategoryForm, {
  type CategoryFormData,
} from "../../components/categories/CategoryForm";
import CategoriesTable from "../../components/categories/CategoriesTable";
import { useToast } from "../../hooks/useToast";
import {
  createCategory,
  deleteCategory,
  getFilterCategories,
  updateCategory,
} from "../../services/category.service";
import type { Category, CategoryFilters as CategoryFiltersType } from "../../types/category";
import type { PagedResult } from "../../types/common";
import { Purpose } from "../../types/enums/purpose";

const PAGE_SIZE = 5;

export default function CategoriesPage() {
  const { showToast } = useToast();

  const [categories, setCategories] = useState<PagedResult<Category> | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [filters, setFilters] = useState<CategoryFiltersType>({
    description: "",
    purpose: undefined,
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  });

  const [formData, setFormData] = useState<CategoryFormData>({
    id:"",
    description: "",
    purpose: Purpose.Expense,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  async function loadCategories(currentFilters: CategoryFiltersType) {
    try {
      setLoading(true);

      const response = await getFilterCategories({
        ...currentFilters,
        pageSize: PAGE_SIZE,
      });

      setCategories(response);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar categorias.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCategories(filters);
  }, [filters]);

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : name === "purpose" ? Number(value) : value,
      pageNumber: 1,
    }));
  }

  function clearFilters() {
    setFilters({
      description: "",
      purpose: undefined,
      pageNumber: 1,
      pageSize: PAGE_SIZE,
    });
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "purpose" ? Number(value) : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function resetForm() {
    setEditingCategoryId(null);
    setFormData({
      id:"",
      description: "",
      purpose: Purpose.Expense,
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

    if (formData.purpose === undefined || formData.purpose === null) {
      errors.purpose = "Selecione a finalidade.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {      
      id:editingCategoryId,
      description: formData.description.trim(),
      purpose: formData.purpose,
    };

    try {
      setSubmitting(true);

      if (editingCategoryId) {
        await updateCategory(editingCategoryId, payload);
        showToast("Categoria atualizada com sucesso.", "success");
      } else {
        await createCategory(payload);
        showToast("Categoria cadastrada com sucesso.", "success");
      }

      resetForm();
      setShowForm(false);
      await loadCategories(filters);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar categoria.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(category: Category) {
    setEditingCategoryId(category.id);
    setFormData({
      description: category.description,
      purpose: category.purpose,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Deseja realmente excluir esta categoria?");

    if (!confirmed) return;

    try {
      await deleteCategory(id);
      showToast("Categoria excluída com sucesso.", "success");

      const hasOnlyOneItemOnPage = (categories?.items.length ?? 0) === 1;
      const currentPage = filters.pageNumber ?? 1;

      if (hasOnlyOneItemOnPage && currentPage > 1) {
        setFilters((prev) => ({
          ...prev,
          pageNumber: currentPage - 1,
        }));
        return;
      }

      await loadCategories(filters);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir categoria.",
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
          <h1 className="text-2xl font-bold text-slate-800">Categorias</h1>
          <p className="mt-1 text-slate-500">
            Consulte, cadastre, edite e exclua categorias
          </p>
        </div>        
      </div>

      {showForm ? (
        <CategoryForm
          formData={formData}
          formErrors={formErrors}
          editingCategoryId={editingCategoryId}
          submitting={submitting}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          <CategoryFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />

          <CategoriesTable
            categories={categories}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!showForm && (
        <div className="self-start">
          <Button type="button" onClick={handleOpenCreate} fullWidth={true}>
            + Adicionar categoria
          </Button>
        </div>
      )}
    </div>
  );
}