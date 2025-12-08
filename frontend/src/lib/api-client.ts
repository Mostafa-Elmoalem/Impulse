import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const message = (error.response?.data as Record<string, any>)?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default apiClient;
