import { Platform } from 'react-native';

/**
 * API Configuration
 * Centralized configuration for API settings
 * Uses environment variables from .env file
 */

/**
 * Gets the base URL from environment variables or falls back to platform-specific defaults
 */
const getBaseUrl = (): string => {
    // Try to get from environment variable first
    const envBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

    if (envBaseUrl) {
        console.log(`[API Config] Using base URL from .env: ${envBaseUrl}`);
        return envBaseUrl;
    }

    // Fallback to platform-specific defaults
    console.log('[API Config] No .env found, using platform-specific defaults');
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000';
    }
    return 'http://localhost:3000';
};

/**
 * Gets the timeout from environment variables or uses default
 */
const getTimeout = (): number => {
    const envTimeout = process.env.EXPO_PUBLIC_API_TIMEOUT;
    return envTimeout ? parseInt(envTimeout, 10) : 10000;
};

export const API_CONFIG = {
    /**
     * Gets the base URL based on environment variables or platform
     * Priority: .env file > Platform-specific defaults
     */
    getBaseUrl,

    /**
     * Default timeout for HTTP requests (in milliseconds)
     */
    timeout: getTimeout(),

    /**
     * Default headers for all requests
     */
    defaultHeaders: {
        'Content-Type': 'application/json',
    },
} as const;
