import { api } from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/Auth/Login", data);
  return response.data;
}
