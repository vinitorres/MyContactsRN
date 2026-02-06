import { HttpRequestConfig, HttpResponse, IHttpClient } from './IHttpClient';

/**
 * Fetch implementation of IHttpClient
 * This is an alternative implementation using the native Fetch API
 * To use this instead of Axios, simply change the ServiceFactory to use FetchHttpClient
 */
export class FetchHttpClient implements IHttpClient {
    constructor(private baseURL: string) { }

    private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
        };
    }

    private buildUrl(url: string, params?: Record<string, any>): string {
        const fullUrl = `${this.baseURL}${url}`;
        if (!params) return fullUrl;

        const searchParams = new URLSearchParams(params);
        return `${fullUrl}?${searchParams.toString()}`;
    }

    async get<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        console.log(`[HTTP] GET ${url}`);
        const fullUrl = this.buildUrl(url, config?.params);

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
        });

        return this.handleResponse<T>(response);
    }

    async post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        console.log(`[HTTP] POST ${url}`);
        const fullUrl = this.buildUrl(url, config?.params);

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        console.log(`[HTTP] PUT ${url}`);
        const fullUrl = this.buildUrl(url, config?.params);

        const response = await fetch(fullUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        console.log(`[HTTP] DELETE ${url}`);
        const fullUrl = this.buildUrl(url, config?.params);

        const response = await fetch(fullUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
        });

        return this.handleResponse<T>(response);
    }

    async patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        console.log(`[HTTP] PATCH ${url}`);
        const fullUrl = this.buildUrl(url, config?.params);

        const response = await fetch(fullUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }
}
