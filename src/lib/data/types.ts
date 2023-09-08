export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  currentCategory?: string;
};