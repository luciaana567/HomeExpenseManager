import { api } from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";
import type { Result } from "../types/common";
import type { CreateUserRequest } from "../types/user";

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/Authenticator/Login", data);
  return response.data;
}

export async function registerUser(payload: CreateUserRequest) {
  const response = await api.post<Result<unknown>>("/Users", payload);
  return response.data;
}
