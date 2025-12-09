import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (email: string, password: string) =>
        set(() => ({ isAuthenticated: true })),
      logout: () =>
        set(() => ({ isAuthenticated: false })),
    }),
    {
      name: 'auth-store', 
    }
  )
);