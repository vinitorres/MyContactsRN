import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpRequestConfig, HttpResponse, IHttpClient } from './IHttpClient';

/**
 * Axios implementation of IHttpClient
 * This implementation can be easily swapped with another HTTP library
 * by creating a new class that implements IHttpClient
 */
export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, defaultConfig?: AxiosRequestConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            ...defaultConfig,
        });

        // Request interceptor (can be used for logging, auth tokens, etc.)
        this.axiosInstance.interceptors.request.use(
            (config) => {
                console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('[HTTP] Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor (can be used for error handling, logging, etc.)
        this.axiosInstance.interceptors.response.use(
            (response) => {
                console.log(`[HTTP] ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('[HTTP] Response error:', error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Converts Axios response to our standard HttpResponse format
     */
    private mapResponse<T>(axiosResponse: AxiosResponse<T>): HttpResponse<T> {
        return {
            data: axiosResponse.data,
            status: axiosResponse.status,
            statusText: axiosResponse.statusText,
            headers: axiosResponse.headers as Record<string, string>,
        };
    }

    /**
     * Converts our HttpRequestConfig to Axios config
     */
    private mapConfig(config?: HttpRequestConfig): AxiosRequestConfig {
        if (!config) return {};

        return {
            headers: config.headers,
            params: config.params,
            timeout: config.timeout,
        };
    }

    async get<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.get<T>(url, this.mapConfig(config));
        return this.mapResponse(response);
    }

    async post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.post<T>(url, data, this.mapConfig(config));
        return this.mapResponse(response);
    }

    async put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.put<T>(url, data, this.mapConfig(config));
        return this.mapResponse(response);
    }

    async delete<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.delete<T>(url, this.mapConfig(config));
        return this.mapResponse(response);
    }

    async patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        const response = await this.axiosInstance.patch<T>(url, data, this.mapConfig(config));
        return this.mapResponse(response);
    }
}
