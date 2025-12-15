import { apiClient } from '@/shared/api/apiClient';
import { LoginCredentials, User, AuthResponse } from '../types';

// 1. تسجيل الدخول
export const loginWithEmail = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// 2. إنشاء حساب جديد
export const registerWithEmail = async (data: User & { password: string }): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/create-account', data);
  return response.data;
};
export const logoutUser = () => {
  // حالياً الباك إند stateless (JWT) فلا نحتاج لطلب، 
  // لكن يمكن إضافة منطق هنا مستقبلاً (مثل إبطال التوكن)
  localStorage.removeItem('token');
};
