import type { PagedResult, Result } from "../types/common";

export function handleResponse<T>(result: Result<T>): T {
  if (!result.success) {
    const message =
      result.errors?.length > 0
        ? result.errors.join(", ")
        : result.message || "Erro na requisição";

    throw new Error(message);
  }

  return result.data as T;
}

export function handleResponsePaged<T>(
  result: Result<PagedResult<T>>,
): PagedResult<T> {
  if (!result.success) {
    const message =
      result.errors?.length > 0
        ? result.errors.join(", ")
        : result.message || "Erro na requisição";

    throw new Error(message);
  }

  return result.data as PagedResult<T>;
}
