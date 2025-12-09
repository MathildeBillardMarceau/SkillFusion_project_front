import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string
  , token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: (email, password, token) =>
        set(() => ({ token, isAuthenticated: true })),
      logout: () =>
        set(() => ({ token: null, isAuthenticated: false })),
    }),
    {
      name: 'auth-store', 
    }
  )
);