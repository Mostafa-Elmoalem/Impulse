import { apiClient } from '@/shared/api/apiClient';

// تعريف شكل البيانات اللي راجعة من اللوجين
interface AuthResponse {
  token: string;
  roles: string[];
}

// 1. تسجيل الدخول
export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// 2. إنشاء حساب جديد
export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await apiClient.post<AuthResponse>('/auth/create-account', data);
  return response.data;
};