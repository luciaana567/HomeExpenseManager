export type PagedResponse<T> = {
  items?: T[];
  persons?: T[];
  categories?: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
