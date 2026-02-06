/**
 * API Routes Constants
 * Centralized location for all API endpoints
 */

export const API_ROUTES = {
    CONTACTS: {
        LIST: '/contacts',
        CREATE: '/contacts',
        GET_BY_ID: (id: number) => `/contacts/${id}`,
        UPDATE: (id: number) => `/contacts/${id}`,
        DELETE: (id: number) => `/contacts/${id}`,
    },
} as const;

