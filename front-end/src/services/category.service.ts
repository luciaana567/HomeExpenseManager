import { api } from "../api/axios";
import { handleResponse, handleResponsePaged } from "../utils/handleResponse";
import type { PagedResult, Result } from "../types/common";
import type {
  Category,
  CategoryFilters,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category";

export async function getFilterCategories(
  filters?: CategoryFilters,
): Promise<PagedResult<Category>> {
  const response = await api.get<Result<PagedResult<Category>>>(
    "/Categories/search",
    {
      params: filters,
    },
  );

  return handleResponsePaged(response.data);
}

export async function getCategories(
  filters?: CategoryFilters,
): Promise<Category[]> {
  const response = await api.get<Result<Category[]>>("/Categories", {
    params: filters,
  });

  return handleResponse(response.data);
}

export async function getCategoryById(id: string): Promise<Category> {
  const response = await api.get<Result<Category>>(`/Categories/${id}`);

  return handleResponse(response.data);
}

export async function createCategory(
  payload: CreateCategoryRequest,
): Promise<Category> {
  const response = await api.post<Result<Category>>("/Categories", payload);

  return handleResponse(response.data);
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryRequest,
): Promise<Category> {
  const response = await api.put<Result<Category>>(
    `/Categories/${id}`,
    payload,
  );

  return handleResponse(response.data);
}

export async function deleteCategory(id: string): Promise<string> {
  const response = await api.delete<Result<string>>(`/Categories/${id}`);

  return handleResponse(response.data);
}
