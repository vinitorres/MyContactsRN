/**
 * HTTP Client Interface
 * Abstraction layer for HTTP requests, allowing easy swap of HTTP libraries
 * (e.g., fetch, axios, ky, etc.)
 */

export interface HttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export interface HttpRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
}

export interface IHttpClient {
    /**
     * Performs a GET request
     */
    get<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

    /**
     * Performs a POST request
     */
    post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

    /**
     * Performs a PUT request
     */
    put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

    /**
     * Performs a DELETE request
     */
    delete<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

    /**
     * Performs a PATCH request
     */
    patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
