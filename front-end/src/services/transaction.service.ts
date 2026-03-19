import { api } from "../api/axios";
import { handleResponse } from "../utils/handleResponse";
import type { Result } from "../types/common";
import type {
  CreateTransactionRequest,
  Transaction,
  TransactionFilters,
  UpdateTransactionRequest,
} from "../types/transaction";

export async function getTransactions(
  filters?: TransactionFilters,
): Promise<Transaction[]> {
  const response = await api.get<Result<Transaction[]>>("/Transaction/GetAll", {
    params: filters,
  });

  return handleResponse(response.data);
}

export async function getTransactionById(id: string): Promise<Transaction> {
  const response = await api.get<Result<Transaction>>(
    `/Transaction/GetById/${id}`,
  );

  return handleResponse(response.data);
}

export async function createTransaction(
  payload: CreateTransactionRequest,
): Promise<Transaction> {
  const response = await api.post<Result<Transaction>>(
    "/Transaction/Create",
    payload,
  );

  return handleResponse(response.data);
}

export async function updateTransaction(
  id: string,
  payload: UpdateTransactionRequest,
): Promise<Transaction> {
  const response = await api.put<Result<Transaction>>(
    `/Transaction/Update/${id}`,
    payload,
  );

  return handleResponse(response.data);
}

export async function deleteTransaction(id: string): Promise<string> {
  const response = await api.delete<Result<string>>(
    `/Transaction/Delete/${id}`,
  );

  return handleResponse(response.data);
}
