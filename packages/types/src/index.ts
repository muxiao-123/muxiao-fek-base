export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export interface PaginatedResponse<T = unknown> {
  list: T[];
  pagination: PaginationParams;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Recordable<T = unknown> = Record<string, T>;
export type Arrayable<T> = T | T[];
