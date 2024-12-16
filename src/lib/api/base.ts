import axios from 'axios';

const API_URL = 'http://localhost:5000';

export class ApiService {
  // Server-side methods with caching
  static async serverFetch<T>(url: string, options?: RequestInit) {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      next: {
        revalidate: 30, // Cache for 30 seconds
        tags: ['notes'] // For manual revalidation
      }
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response.json() as Promise<T>;
  }

  // Client-side methods for mutations
  static client = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean;
  httpCode: number;
  message: string;
  data: T;
  timestamp: string;
}
