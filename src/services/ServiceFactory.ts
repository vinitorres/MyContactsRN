import { API_CONFIG } from '@/src/config/api';
import { AxiosHttpClient } from '@/src/http';
import { IContactsService } from './IContactsService';
import { RemoteContactsService } from './RemoteContactsService';

/**
 * Service Factory
 * Creates and configures service instances with their dependencies
 * This is the single place where we wire up our dependencies
 */

let contactsServiceInstance: IContactsService | null = null;

/**
 * Gets or creates a singleton instance of the contacts service
 * Uses Axios as the HTTP client by default
 */
export function getContactsService(): IContactsService {
    if (!contactsServiceInstance) {
        // Create the HTTP client with the base URL
        const httpClient = new AxiosHttpClient(API_CONFIG.getBaseUrl(), {
            timeout: API_CONFIG.timeout,
            headers: API_CONFIG.defaultHeaders,
        });

        // Create the service with the HTTP client
        contactsServiceInstance = new RemoteContactsService(httpClient);
    }

    return contactsServiceInstance;
}

/**
 * Resets the service instance (useful for testing)
 */
export function resetContactsService(): void {
    contactsServiceInstance = null;
}
