// src/shared/lib/api-client.ts
import axios, { AxiosError } from 'axios';

interface ApiError {
  messageEn?: string;
  messageAr?: string;
  message?: string;
  status?: number;
}

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor: Auto-attach token from localStorage (synced by Zustand)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response.data, // Extract data automatically
  (error: AxiosError<ApiError>) => {
    // Try to extract backend error message
    const backendMessage = error.response?.data?.messageEn 
      || error.response?.data?.message 
      || error.message;

    console.error('API Error:', backendMessage);

    // ✅ Auto-logout on 401 (matches backend behavior)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth-storage'); // Clear Zustand persist
      window.location.href = '/login';
    }

    // Attach clean error message for frontend
    error.message = backendMessage;
    return Promise.reject(error);
  }
);