import axios from "axios";

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
  (response) => response,
  (error) => {
    if (error.response) {
      const apiMessage =
        error.response.data?.message ||
        error.response.data?.title ||
        "Erro ao processar a requisição.";

      const apiErrors = error.response.data?.errors;

      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        return Promise.reject(new Error(apiErrors.join(", ")));
      }

      return Promise.reject(new Error(apiMessage));
    }

    if (error.request) {
      return Promise.reject(
        new Error("Não foi possível conectar com o servidor."),
      );
    }

    return Promise.reject(new Error("Erro inesperado na aplicação."));
  },
);
