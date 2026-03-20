import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SummaryBarChart from "../../components/charts/SummaryBarChart";
import { useToast } from "../../hooks/useToast";
import { getPersonsSummary } from "../../services/summary.service";
import type {
  PersonSummaryItem,
  PersonsSummaryFilters,
  PersonsSummaryResponse,
} from "../../types/person";

const PAGE_SIZE = 10;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function PersonsSummaryPage() {
  const { showToast } = useToast();

  const [summary, setSummary] = useState<PersonsSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<PersonsSummaryFilters>({
    name: "",
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  });

  async function loadSummary(currentFilters: PersonsSummaryFilters) {
    try {
      setLoading(true);

      const response = await getPersonsSummary({
        ...currentFilters,
        pageSize: PAGE_SIZE,
      });

      setSummary(response);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao carregar resumo por pessoas.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSummary(filters);
  }, [filters]);

  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      pageNumber: 1,
    }));
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    void loadSummary(filters);
  }

  function handleClearFilters() {
    setFilters({
      name: "",
      pageNumber: 1,
      pageSize: PAGE_SIZE,
    });
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({
      ...prev,
      pageNumber: page,
    }));
  }

  const chartData = useMemo(() => {
    return (summary?.persons ?? []).map((person) => ({
      name: person.name,
      Receitas: person.totalIncome,
      Despesas: person.totalExpense,
      Saldo: person.balance,
    }));
  }, [summary]);

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resumo por pessoas</h1>
        <p className="mt-2 text-slate-500">
          Consulte receitas, despesas e saldo agrupados por pessoa.
        </p>
      </div>

      <Card title="Filtros" subtitle="Refine sua pesquisa">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 md:flex-row md:items-end"
        >
          <div className="w-full md:max-w-md">
            <Input
              id="name"
              name="name"
              label="Nome"
              placeholder="Digite o nome da pessoa"
              value={filters.name ?? ""}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit">Pesquisar</Button>
            <Button type="button" onClick={handleClearFilters}>
              Limpar
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Receitas">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(summary?.totalIncome ?? 0)}
          </p>
        </Card>

        <Card title="Despesas">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(summary?.totalExpense ?? 0)}
          </p>
        </Card>

        <Card title="Saldo">
          <p className="text-2xl font-bold text-slate-800">
            {formatCurrency(summary?.balance ?? 0)}
          </p>
        </Card>
      </div>

      <Card
        title="Gráfico por pessoa"
        subtitle="Comparativo entre receitas, despesas e saldo"
      >
        {loading ? (
          <p className="text-slate-500">Carregando gráfico...</p>
        ) : chartData.length === 0 ? (
          <p className="text-slate-500">Nenhum dado encontrado.</p>
        ) : (
          <SummaryBarChart data={chartData} />
        )}
      </Card>

      <Card
        title="Tabela de pessoas"
        subtitle="Resumo paginado por pessoa"
      >
        {loading ? (
          <p className="text-slate-500">Carregando dados...</p>
        ) : !summary || summary.persons.length === 0 ? (
          <p className="text-slate-500">Nenhuma pessoa encontrada.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Pessoa
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
                  {summary.persons.map((person: PersonSummaryItem) => (
                    <tr
                      key={person.personId}
                      className="border-b border-slate-100"
                    >
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {person.name}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">
                        {formatCurrency(person.totalIncome)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">
                        {formatCurrency(person.totalExpense)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right text-sm font-medium ${
                          person.balance < 0
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {formatCurrency(person.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {summary.totalPages > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Página {summary.pageNumber} de {summary.totalPages} •{" "}
                  {summary.totalItems} registro(s)
                </p>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={summary.pageNumber <= 1}
                    onClick={() => handlePageChange(summary.pageNumber - 1)}
                  >
                    Anterior
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    disabled={summary.pageNumber >= summary.totalPages}
                    onClick={() => handlePageChange(summary.pageNumber + 1)}
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