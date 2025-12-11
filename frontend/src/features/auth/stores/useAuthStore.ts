import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string, roles: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // ✅ FIXED: Now accepts token, email, and roles (matches backend response)
      login: (token: string, email: string, roles: string[]) => {
        // Decode JWT to get username (subject)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const name = payload.sub; // JWT subject contains username

        const user: User = { name, email, roles };

        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);