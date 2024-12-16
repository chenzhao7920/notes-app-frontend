import axios from 'axios';

const API_URL = 'http://localhost:5000';

export class ApiService {
  // Server-side methods
  static async serverFetch<T>(url: string, options?: RequestInit) {
    return fetch(`${API_URL}${url}`, {
      ...options,
      next: { revalidate: 30 }
    });
  }

  // Client-side methods
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
