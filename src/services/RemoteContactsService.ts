import { API_ROUTES } from '@/src/constants/apiRoutes';
import { IHttpClient } from '@/src/http';
import { Contact } from '@/src/models/Contact';
import { IContactsService } from './IContactsService';

/**
 * Remote implementation of IContactsService
 * Uses dependency injection to receive an HttpClient implementation
 * This allows easy swapping of HTTP libraries without changing this service
 */
export class RemoteContactsService implements IContactsService {
    constructor(private httpClient: IHttpClient) { }

    async findAll(): Promise<Contact[]> {
        try {
            const response = await this.httpClient.get<Contact[]>(API_ROUTES.CONTACTS.LIST);
            return response.data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }

    async findById(id: number): Promise<Contact | null> {
        try {
            const response = await this.httpClient.get<Contact>(API_ROUTES.CONTACTS.GET_BY_ID(id));
            return response.data;
        } catch (error: any) {
            // If contact not found, return null
            if (error.response?.status === 404) {
                return null;
            }
            console.error(`Error fetching contact ${id}:`, error);
            throw error;
        }
    }

    async create(data: Contact): Promise<void> {
        try {
            await this.httpClient.post(API_ROUTES.CONTACTS.CREATE, data);
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    }

    async update(id: number, data: Contact): Promise<Contact> {
        try {
            const response = await this.httpClient.put<Contact>(API_ROUTES.CONTACTS.UPDATE(id), data);
            return response.data;
        } catch (error) {
            console.error(`Error updating contact ${id}:`, error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.httpClient.delete(API_ROUTES.CONTACTS.DELETE(id));
        } catch (error) {
            console.error(`Error deleting contact ${id}:`, error);
            throw error;
        }
    }
}
