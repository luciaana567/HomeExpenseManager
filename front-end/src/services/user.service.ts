import { api } from "../api/axios";
import { handleResponse } from "../utils/handleResponse";
import type { Result } from "../types/common";
import type { CreateUserRequest, UpdateUserRequest, User } from "../types/user";

export async function createUser(payload: CreateUserRequest): Promise<User> {
  const response = await api.post<Result<User>>("/Users", payload);
  return handleResponse(response.data);
}

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<Result<User>>(`/Users/${id}`);
  return handleResponse(response.data);
}

export async function updateUser(
  id: string,
  payload: UpdateUserRequest,
): Promise<User> {
  const response = await api.put<Result<User>>(`/Users/${id}`, payload);
  return handleResponse(response.data);
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/Users/${id}`);
}
