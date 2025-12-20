import { apiClient } from '@/shared/lib/api-client';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

// 1. تسجيل الدخول
export const loginWithEmail = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // الباك إند ينتظر { email, password } وهذا متطابق مع الأنواع لدينا
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// 2. إنشاء حساب جديد
export const registerWithEmail = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  // الباك إند في PersonDto ينتظر { name, email, password }
  // الـ credentials تحتوي هذه الحقول بالفعل
  const response = await apiClient.post<AuthResponse>('/auth/create-account', credentials);
  return response.data;
};

// 3. تسجيل الخروج (اختياري حالياً لكن مفيد للمستقبل)
export const logoutUser = async () => {
  // يمكن إضافة endpoint للخروج في الباك إند مستقبلاً
  localStorage.removeItem('token');
};