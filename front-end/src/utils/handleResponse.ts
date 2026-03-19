import type { Result } from "../types/common";

export function handleResponse<T>(result: Result<T>): T {
  if (!result.success) {
    throw new Error(result.message || "Erro na requisição");
  }

  return result.data as T;
}
