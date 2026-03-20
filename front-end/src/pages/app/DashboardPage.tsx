import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">

        <h1 className="text-3xl font-bold text-slate-800">Bem-vindo!</h1>

        <div className="mt-6 flex justify-center">
          <img
            src="/bolsa-de-dinheiro.gif"
            alt="Dashboard"
            className="w-64 md:w-40 rounded-xl "
          />
        </div>

        <p className="mt-2 text-slate-500">
          Gerenciador Fianceiro.<br/>
          Selecione uma opção no menu lateral para começar.
        </p>
      </div>
      

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            <Link to="/transacoes" className="hover:underline">Transações</Link>
            </h2>
          <p className="mt-2 text-sm text-slate-500">
            Gerencie receitas e despesas.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            <Link to="/categorias" className="hover:underline">Categorias</Link>
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Organize seus lançamentos por categoria.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
             <Link to="/sumario-pessoas" className="hover:underline">Resumo de Pessoas</Link>
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Visualize totais de transações por pessoa.
          </p>
        </div>
      </div>
    </div>
  );
}