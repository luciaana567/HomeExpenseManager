import { api } from "../api/axios";
import { handleResponse } from "../utils/handleResponse";
import type { Result } from "../types/common";
import type {
  CategoriesSummaryFilters,
  CategoriesSummaryResponse,
} from "../types/category";
import type {
  PersonsSummaryFilters,
  PersonsSummaryResponse,
} from "../types/person";

export async function getPersonsSummary(
  filters?: PersonsSummaryFilters,
): Promise<PersonsSummaryResponse> {
  const response = await api.get<Result<PersonsSummaryResponse>>(
    "/Person/GetPersonsTotals",
    {
      params: filters,
    },
  );

  return handleResponse(response.data);
}

export async function getCategoriesSummary(
  filters?: CategoriesSummaryFilters,
): Promise<CategoriesSummaryResponse> {
  const response = await api.get<Result<CategoriesSummaryResponse>>(
    "/Category/GetCategoriesTotals",
    {
      params: filters,
    },
  );

  return handleResponse(response.data);
}
