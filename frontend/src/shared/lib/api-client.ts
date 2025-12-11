import axios, { AxiosError } from 'axios';

interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auto-attach token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);

    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);