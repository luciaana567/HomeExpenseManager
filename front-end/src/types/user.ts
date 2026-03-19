import type { CreatePerson, Person } from "./person";

export type CreateUser = {
  email: string;
  password: string;
  person: CreatePerson;
};

export type User = {
  id: number;
  email?: string;
  password?: string;
  username?: string;
  person?: Person;
};

export type UpdateUser = {
  id: number;
  email?: string;
  password?: string;
  username?: string;
};
