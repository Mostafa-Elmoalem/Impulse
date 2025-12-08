import { apiClient } from '@/lib/api-client';
import type { LoginCredentials, AuthResponse } from '../types';

export const loginWithEmail = (data: LoginCredentials): Promise<AuthResponse> => {
  return apiClient.post('/auth/login', data);
};

export const logout = (): Promise<void> => {
  return apiClient.post('/auth/logout');
};

export const registerWithEmail = (data: LoginCredentials & { name: string }): Promise<AuthResponse> => {
  return apiClient.post('/auth/register', data);
};
