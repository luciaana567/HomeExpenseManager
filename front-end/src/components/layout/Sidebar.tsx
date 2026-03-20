import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Início", path: "/" },
  { label: "Transações", path: "/transacoes" },
  { label: "Dados da pessoa", path: "/perfil" },
  { label: "Categorias", path: "/categorias" },
  { label: "Sumário de pessoas", path: "/sumario-pessoas" },
  { label: "Sumário de categorias", path: "/sumario-categorias" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="w-54 h-full bg-slate-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-xl font-bold">Home Expense</h2>
        <p className="text-sm text-slate-400 mt-1">Gerenciador financeiro</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}