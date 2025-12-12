import type { LoginCredentials, AuthResponse } from '../types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to create a fake JWT token that works with your existing AuthStore decoder
const createMockToken = (email: string) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ sub: email, roles: ['USER'] })); // 'sub' maps to user name in your store
  const signature = "mock-signature";
  return `${header}.${payload}.${signature}`;
};

export const loginWithEmail = async (data: LoginCredentials): Promise<AuthResponse> => {
  await delay(800); // Simulate API loading

  // Mock Validation
  if (!data.email.includes('@')) {
    throw { response: { data: { messageEn: 'Invalid email format' } } };
  }

  // Simulate successful login for ANY valid email/password
  return {
    token: createMockToken(data.email),
    roles: ['USER']
  };
};

export const logout = (): Promise<void> => {
  return Promise.resolve();
};

export const registerWithEmail = async (data: LoginCredentials & { name: string }): Promise<AuthResponse> => {
  await delay(1000);
  
  return {
    token: createMockToken(data.email),
    roles: ['USER']
  };
};