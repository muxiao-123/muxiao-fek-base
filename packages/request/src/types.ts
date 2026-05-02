import type { ApiResponse } from "@muxiao-fek-base/types";

export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface Interceptor<T = unknown> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: unknown) => unknown;
}

export interface HttpInstance {
  request<T = unknown>(options: RequestOptions): Promise<ApiResponse<T>>;
  get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>>;
  post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  delete<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
  isHttpError(error: unknown): boolean;
}

export type CreateRequest = (config?: RequestConfig) => HttpInstance;
