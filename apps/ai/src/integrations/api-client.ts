export interface APIClientConfig {
  baseUrl: string;
  timeoutMs?: number;
}

export interface APIRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

export class APIClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(config: APIClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
    this.timeoutMs = config.timeoutMs ?? 10000;
  }

  async request<T>(path: string, options: APIRequestOptions = {}): Promise<T> {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, this.timeoutMs);

    try {
      const response = await fetch(
        `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
        {
          method: options.method ?? "GET",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          body:
            options.body !== undefined
              ? JSON.stringify(options.body)
              : undefined,
          signal: controller.signal,
        },
      );

      const contentType = response.headers.get("content-type") ?? "";

      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(
          `API request failed (${response.status}): ${
            typeof data === "string" ? data : JSON.stringify(data)
          }`,
        );
      }

      return data as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
      headers,
    });
  }

  post<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body,
      headers,
    });
  }

  put<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      body,
      headers,
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>(path, {
      method: "PATCH",
      body,
      headers,
    });
  }

  delete<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, {
      method: "DELETE",
      headers,
    });
  }
}
