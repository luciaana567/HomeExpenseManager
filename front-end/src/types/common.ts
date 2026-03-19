export type Result<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
};

export type PagedResult<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type SelectOption<T = string> = {
  value: T;
  label: string;
};
