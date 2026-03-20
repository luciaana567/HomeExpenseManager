import { useEffect, useMemo, useState } from "react";
import CategoryPieChart from "../../components/charts/CategoryPieChart";
import SummaryBarChart from "../../components/charts/SummaryBarChart";
import { getCategoriesSummary } from "../../services/summary.service";
import { getTransactions } from "../../services/transaction.service";
import type { CategoriesSummaryResponse } from "../../types/category";
import type { Transaction } from "../../types/transaction";
import { TransactionType } from "../../types/enums/transactionType";
import type { PagedResult } from "../../types/common";

export default function DashboardPage() {
  const [categoriesSummary, setCategoriesSummary] =
    useState<CategoriesSummaryResponse | null>(null);
  const [transactions, setTransactions] = useState<PagedResult<Transaction> | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const personId = localStorage.getItem("personId");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const startDate = firstDayOfMonth.toISOString().split("T")[0];
        const endDate = lastDayOfMonth.toISOString().split("T")[0];

        const [categoriesData, transactionsData] = await Promise.all([
          getCategoriesSummary({
            pageNumber: 1,
            pageSize: 100,
          }),
          getTransactions({
            startDate,
            endDate,
            pageNumber: 1,
            pageSize: 1000,
            personId: personId ? personId :undefined
          }),
        ]);

        setCategoriesSummary(categoriesData);
        setTransactions(transactionsData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao carregar dashboard.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const myTransactions = useMemo(() => {
    if (!personId || !transactions?.items) return [];

    return transactions.items;
  }, [transactions]);

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    myTransactions.forEach((transaction) => {
      const value = Number(transaction.value ?? 0);

      if (transaction.type === TransactionType.Income) {
        income += value;
        return;
      }

      if (transaction.type === TransactionType.Expense) {
        expense += value;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [myTransactions]);

  const summaryChartData = useMemo(() => {
    return [
      {
        name: "Receitas",
        value: totals.income,
      },
      {
        name: "Despesas",
        value: totals.expense,
      },
      {
        name: "Saldo",
        value: totals.balance,
      },
    ];
  }, [totals]);

  const categoryChartData = useMemo(() => {
    if (!categoriesSummary) return [];

    const totalsByCategory = new Map<string, number>();

    myTransactions.forEach((transaction) => {
      if (transaction.type !== TransactionType.Expense) return;

      const categoryId = String(transaction.categoryId);
      const value = Number(transaction.value ?? 0);

      totalsByCategory.set(
        categoryId,
        (totalsByCategory.get(categoryId) ?? 0) + value,
      );
    });

    return categoriesSummary.categories
      .map((category) => ({
        name: category.description,
        value: totalsByCategory.get(String(category.categoryId)) ?? 0,
      }))
      .filter((category) => category.value > 0);
  }, [categoriesSummary, myTransactions]);

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-4 text-slate-500">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-4 text-red-500">{error}</p>
      </div>
    );
  }

  if (!personId) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-4 text-slate-500">
          Não foi possível identificar a pessoa logada.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen bg-slate-100 p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">
          Bem-vindo{userName ? `, ${userName}` : ""}!
        </h1>

        <div className="mt-6 flex justify-center">
          <img
            src="/bolsa-de-dinheiro.gif"
            alt="Dashboard"
            className="w-64 rounded-xl md:w-40"
          />
        </div>

        <p className="mt-2 text-slate-500">
          Gerenciador Financeiro.
          <br />
          Dados referentes a {monthLabel}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Receitas</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totals.income)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Despesas</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totals.expense)}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Saldo</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totals.balance)}
          </h2>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Resumo do mês
            </h2>
            <p className="text-sm text-slate-500">
              Receitas, despesas e saldo da pessoa logada
            </p>
          </div>

          <SummaryBarChart data={summaryChartData} />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Despesas por categoria
            </h2>
            <p className="text-sm text-slate-500">
              Distribuição das despesas do mês atual
            </p>
          </div>

          <CategoryPieChart data={categoryChartData} />
        </div>
      </div>
    </div>
  );
}