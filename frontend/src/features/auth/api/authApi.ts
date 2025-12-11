import { apiClient } from '@/shared/lib/api-client';
import type { LoginCredentials, AuthResponse } from '../types';

export const loginWithEmail = (data: LoginCredentials): Promise<AuthResponse> => {
  return apiClient.post('/auth/login', data);
};

export const logout = (): Promise<void> => {
  // Keeping promise resolve for frontend consistency
  return Promise.resolve();
};

// ✅ FIXED: Endpoint changed from '/auth/register' to '/auth/create-account'
// Matches Backend 'AuthController.java'
export const registerWithEmail = (data: LoginCredentials & { name: string }): Promise<AuthResponse> => {
  return apiClient.post('/auth/create-account', data);
};