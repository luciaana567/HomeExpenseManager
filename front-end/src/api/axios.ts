import axios from "axios";
import { showGlobalToast } from "../lib/toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data && data.success === false) {
      const apiErrors = data.errors;
      const apiMessage = data.message || "Erro ao processar a requisição.";

      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        apiErrors.forEach((errorMessage: string) => {
          showGlobalToast(errorMessage, "error");
        });

        return Promise.reject(new Error(apiErrors.join(", ")));
      }

      showGlobalToast(apiMessage, "error");
      return Promise.reject(new Error(apiMessage));
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const apiMessage =
        error.response.data?.message ||
        error.response.data?.title ||
        "Erro ao processar a requisição.";

      const apiErrors = error.response.data?.errors;

      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        apiErrors.forEach((errorMessage: string) => {
          showGlobalToast(errorMessage, "error");
        });

        return Promise.reject(new Error(apiErrors.join(", ")));
      }

      showGlobalToast(apiMessage, "error");
      return Promise.reject(new Error(apiMessage));
    }

    if (error.request) {
      const message = "Não foi possível conectar com o servidor.";
      showGlobalToast(message, "error");
      return Promise.reject(new Error(message));
    }

    const message = "Erro inesperado na aplicação.";
    showGlobalToast(message, "error");
    return Promise.reject(new Error(message));
  },
);
