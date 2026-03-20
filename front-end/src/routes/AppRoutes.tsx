import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/app/DashboardPage";
import TransactionsPage from "../pages/app/TransactionsPage";
import ProfilePage from "../pages/app/ProfilePage";
import CategoriesPage from "../pages/app/CategoriesPage";
import PersonsSummaryPage from "../pages/app/PersonsSummaryPage";
import CategoriesSummaryPage from "../pages/app/CategoriesSummaryPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transacoes" element={<TransactionsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route
              path="/sumario-pessoas"
              element={<PersonsSummaryPage />}
            />
            <Route
              path="/sumario-categorias"
              element={<CategoriesSummaryPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}