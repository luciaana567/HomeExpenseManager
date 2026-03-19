import type { CreatePersonRequest, Person } from "./person";

export type CreateUserRequest = {
  email: string;
  password: string;
  person: CreatePersonRequest;
};

export type User = {
  id: number;
  email?: string;
  password?: string;
  username?: string;
  person?: Person;
};

export type UpdateUserRequest = {
  id: number;
  email?: string;
  password?: string;
  username?: string;
};
