// src/features/auth/types/index.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

// ✅ FIXED: Matches backend 'TokenDto.java' (token, roles)
// The backend does not return a full user object, so we decode the token for the name.
export interface AuthResponse {
  token: string;
  roles: string[];
}

export interface User {
  id?: string; // Optional as backend doesn't always send ID in auth context
  email: string;
  name: string;
  roles?: string[];
}