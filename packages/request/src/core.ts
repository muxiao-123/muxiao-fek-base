import {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import axios from "axios";
import type {
  Interceptor,
  RequestConfig,
  RequestOptions,
  HttpInstance,
} from "./types";

export function createRequest(config: RequestConfig = {}): HttpInstance {
  const instance: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 30000,
    headers: config.headers,
  });

  const requestInterceptors: Interceptor<AxiosRequestConfig>[] = [];
  const responseInterceptors: Interceptor<AxiosResponse>[] = [];

  const http: HttpInstance = {
    async request<T>(options: RequestOptions) {
      const requestConfig: AxiosRequestConfig = {
        url: options.url,
        method: options.method || "GET",
        params: options.params,
        data: options.data,
        headers: options.headers,
        timeout: options.timeout,
      };

      let resolvedConfig = requestConfig;
      for (const interceptor of requestInterceptors) {
        if (interceptor.onFulfilled) {
          resolvedConfig = (await interceptor.onFulfilled(
            resolvedConfig,
          )) as AxiosRequestConfig;
        }
      }

      try {
        const response = await instance.request<ApiResponse<T>>(resolvedConfig);
        let resolvedResponse = response;
        for (const interceptor of responseInterceptors) {
          if (interceptor.onFulfilled) {
            resolvedResponse = (await interceptor.onFulfilled(
              resolvedResponse,
            )) as AxiosResponse<ApiResponse<T>>;
          }
        }
        return resolvedResponse.data;
      } catch (error) {
        let rejectedError = error;
        for (const interceptor of responseInterceptors) {
          if (interceptor.onRejected) {
            rejectedError =
              (await interceptor.onRejected(rejectedError)) || rejectedError;
          }
        }
        throw rejectedError;
      }
    },

    get<T>(url: string, params?: Record<string, unknown>) {
      return this.request<T>({ url, method: "GET", params });
    },

    post<T>(url: string, data?: unknown) {
      return this.request<T>({ url, method: "POST", data });
    },

    put<T>(url: string, data?: unknown) {
      return this.request<T>({ url, method: "PUT", data });
    },

    delete<T>(url: string, params?: Record<string, unknown>) {
      return this.request<T>({ url, method: "DELETE", params });
    },

    patch<T>(url: string, data?: unknown) {
      return this.request<T>({ url, method: "PATCH", data });
    },

    isHttpError(error: unknown): boolean {
      return error instanceof AxiosError;
    },
  };

  return http;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
