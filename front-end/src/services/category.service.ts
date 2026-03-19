import { api } from "../api/axios";
import { handleResponse } from "../utils/handleResponse";
import type { Result } from "../types/common";
import type {
  Category,
  CategoryFilters,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category";

export async function getCategories(
  filters?: CategoryFilters,
): Promise<Category[]> {
  const response = await api.get<Result<Category[]>>("/Category/GetAll", {
    params: filters,
  });

  return handleResponse(response.data);
}

export async function getCategoryById(id: string): Promise<Category> {
  const response = await api.get<Result<Category>>(`/Category/GetById/${id}`);

  return handleResponse(response.data);
}

export async function createCategory(
  payload: CreateCategoryRequest,
): Promise<Category> {
  const response = await api.post<Result<Category>>(
    "/Category/Create",
    payload,
  );

  return handleResponse(response.data);
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryRequest,
): Promise<Category> {
  const response = await api.put<Result<Category>>(
    `/Category/Update/${id}`,
    payload,
  );

  return handleResponse(response.data);
}

export async function deleteCategory(id: string): Promise<string> {
  const response = await api.delete<Result<string>>(`/Category/Delete/${id}`);

  return handleResponse(response.data);
}
