import { api } from "../api/axios";
import { handleResponse, handleResponsePaged } from "../utils/handleResponse";
import type { PagedResult, Result } from "../types/common";
import type {
  CreateTransactionRequest,
  Transaction,
  TransactionFilters,
  UpdateTransactionRequest,
} from "../types/transaction";

export async function getTransactions(
  filters?: TransactionFilters,
): Promise<PagedResult<Transaction>> {
  const response = await api.get<Result<PagedResult<Transaction>>>(
    "/Transactions",
    {
      params: filters,
    },
  );

  return handleResponsePaged(response.data);
}

export async function getTransactionById(id: string): Promise<Transaction> {
  const response = await api.get<Result<Transaction>>(`/Transactions${id}`);

  return handleResponse(response.data);
}

export async function createTransaction(
  payload: CreateTransactionRequest,
): Promise<Transaction> {
  const response = await api.post<Result<Transaction>>(
    "/Transactions",
    payload,
  );

  return handleResponse(response.data);
}

export async function updateTransaction(
  id: string,
  payload: UpdateTransactionRequest,
): Promise<Transaction> {
  const response = await api.put<Result<Transaction>>(
    `/Transactions/${id}`,
    payload,
  );

  return handleResponse(response.data);
}

export async function deleteTransaction(id: string): Promise<string> {
  const response = await api.delete<Result<string>>(`/Transactions/${id}`);

  return handleResponse(response.data);
}
