import { api } from "../api/axios";
import { handleResponse } from "../utils/handleResponse";
import type { Result } from "../types/common";
import type {
  CreatePersonRequest,
  Person,
  PersonFilters,
  UpdatePersonRequest,
} from "../types/person";

export async function getPersons(filters?: PersonFilters): Promise<Person[]> {
  const response = await api.get<Result<Person[]>>("/Person/GetAll", {
    params: filters,
  });

  return handleResponse(response.data);
}

export async function getPersonById(id: string): Promise<Person> {
  const response = await api.get<Result<Person>>(`/Person/GetById/${id}`);

  return handleResponse(response.data);
}

export async function createPerson(
  payload: CreatePersonRequest,
): Promise<Person> {
  const response = await api.post<Result<Person>>("/Person/Create", payload);

  return handleResponse(response.data);
}

export async function updatePerson(
  id: string,
  payload: UpdatePersonRequest,
): Promise<Person> {
  const response = await api.put<Result<Person>>(
    `/Person/Update/${id}`,
    payload,
  );

  return handleResponse(response.data);
}

export async function deletePerson(id: string): Promise<string> {
  const response = await api.delete<Result<string>>(`/Person/Delete/${id}`);

  return handleResponse(response.data);
}
