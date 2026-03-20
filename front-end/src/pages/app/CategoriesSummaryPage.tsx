import { useEffect, useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SummaryBarChart from "../../components/charts/SummaryBarChart";
import { useToast } from "../../hooks/useToast";
import { getCategories } from "../../services/category.service";
import { getCategoriesSummary } from "../../services/summary.service";
import type {
  Category,
  CategoriesSummaryResponse,
  CategorySummaryItem,
} from "../../types/category";
import { Purpose, PurposeOptions } from "../../types/enums/purpose";

const PAGE_SIZE = 10;
const FETCH_SIZE = 1000;

type CategorySummaryWithPurpose = CategorySummaryItem & {
  purpose?: Purpose;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getPurposeLabel(purpose?: Purpose) {
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

export default function CategoriesSummaryPage() {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<CategoriesSummaryResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState<Purpose | "">("");
  const [pageNumber, setPageNumber] = useState(1);

  async function loadData() {
    try {
      setLoading(true);

      const [summaryResponse, categoriesResponse] = await Promise.all([
        getCategoriesSummary({
          description: "",
          pageNumber: 1,
          pageSize: FETCH_SIZE,
        }),
        getCategories({
          pageNumber: 1,
          pageSize: FETCH_SIZE,
        }),
      ]);

      setSummary(summaryResponse);
      setCategories(categoriesResponse);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao carregar resumo por categorias.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  const categoriesMap = useMemo(() => {
    const map = new Map<string, Category>();

    categories.forEach((category) => {
      map.set(category.id, category);
    });

    return map;
  }, [categories]);

  const enrichedItems = useMemo<CategorySummaryWithPurpose[]>(() => {
    return (summary?.categories ?? []).map((item) => {
      const category = categoriesMap.get(item.categoryId);

      return {
        ...item,
        purpose: category?.purpose,
      };
    });
  }, [summary, categoriesMap]);

  const filteredItems = useMemo(() => {
    return enrichedItems.filter((item) => {
      const matchesDescription =
        !descriptionFilter.trim() ||
        item.description
          .toLowerCase()
          .includes(descriptionFilter.trim().toLowerCase());

      const matchesPurpose =
        purposeFilter === "" ||
        item.purpose === purposeFilter ||
        item.purpose === Purpose.Both;

      return matchesDescription && matchesPurpose;
    });
  }, [enrichedItems, descriptionFilter, purposeFilter]);

  const totalIncome = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + item.totalIncome, 0);
  }, [filteredItems]);

  const totalExpense = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + item.totalExpense, 0);
  }, [filteredItems]);

  const balance = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + item.balance, 0);
  }, [filteredItems]);

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const currentPage = pageNumber > totalPages ? totalPages : pageNumber;

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    setPageNumber(1);
  }, [descriptionFilter, purposeFilter]);

  const barChartData = useMemo(() => {
    return pagedItems.map((category) => ({
      name: category.description,
      Receitas: category.totalIncome,
      Despesas: category.totalExpense,
      Saldo: category.balance,
    }));
  }, [pagedItems]);

  const pieChartData = useMemo(() => {
    return pagedItems
      .map((category) => ({
        name: category.description,
        value:
          purposeFilter === Purpose.Income
            ? category.totalIncome
            : purposeFilter === Purpose.Expense
              ? category.totalExpense
              : Math.abs(category.balance),
      }))
      .filter((item) => item.value > 0);
  }, [pagedItems, purposeFilter]);

 const pieColors = [
  "#6366f1", // roxo
  "#22c55e", // verde
  "#ef4444", // vermelho
  "#f59e0b", // amarelo
  "#06b6d4", // azul claro
  "#8b5cf6", // violeta
  "#10b981", // verde escuro
  "#f43f5e", // rosa
];

  function handleClearFilters() {
    setDescriptionFilter("");
    setPurposeFilter("");
    setPageNumber(1);
  }

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Resumo por categorias
        </h1>
        <p className="mt-2 text-slate-500">
          Consulte receitas, despesas e saldo agrupados por categoria.
        </p>
      </div>

      <Card title="Filtros" subtitle="Refine sua pesquisa">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Input
            label="Categoria"
            name="description"
            value={descriptionFilter}
            onChange={(event) => setDescriptionFilter(event.target.value)}
            placeholder="Digite o nome da categoria"
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tipo
            </label>
            <select
              name="purpose"
              value={purposeFilter}
              onChange={(event) => {
                const value = event.target.value;
                setPurposeFilter(value === "" ? "" : Number(value) as Purpose);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-slate-500"
            >
              <option value="">Todos</option>
              {PurposeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button type="button" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Receitas">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(totalIncome)}
          </p>
        </Card>

        <Card title="Despesas">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(totalExpense)}
          </p>
        </Card>

        <Card title="Saldo">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(balance)}
          </p>
        </Card>
      </div>

  
      <Card
        title="Distribuição por categoria"
        subtitle="Visualização proporcional dos valores por categoria"
      >
        {loading ? (
          <p className="text-slate-500">Carregando gráfico...</p>
        ) : pieChartData.length === 0 ? (
          <p className="text-slate-500">Nenhum dado encontrado para o gráfico.</p>
        ) : (
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card
        title="Tabela de categorias"
        subtitle="Resumo financeiro paginado por categoria"
      >
        {loading ? (
          <p className="text-slate-500">Carregando dados...</p>
        ) : pagedItems.length === 0 ? (
          <p className="text-slate-500">Nenhuma categoria encontrada.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Categoria
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                      Receitas
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                      Despesas
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                      Saldo
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pagedItems.map((category) => (
                    <tr
                      key={category.categoryId}
                      className="border-b border-slate-100"
                    >
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {category.description}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {getPurposeLabel(category.purpose)}
                      </td>

                      <td className="px-4 py-3 text-right text-sm text-slate-700">
                        {formatCurrency(category.totalIncome)}
                      </td>

                      <td className="px-4 py-3 text-right text-sm text-slate-700">
                        {formatCurrency(category.totalExpense)}
                      </td>

                      <td
                        className={`px-4 py-3 text-right text-sm font-medium ${
                          category.balance < 0
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {formatCurrency(category.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Página {currentPage} de {totalPages} • {totalItems} registro(s)
                </p>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                  >
                    Anterior
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}