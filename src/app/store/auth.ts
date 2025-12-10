import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {email: string, password: string, firstName: string, lastName: string};
  login: ( user: {email: string, password: string
  , firstName: string, lastName: string}, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: {email: "", password: "", firstName: "", lastName: ""},
      login: (user, accessToken) =>
        set(() => ({ token: accessToken, isAuthenticated: true, user })),
      logout: () =>
        set(() => ({ token: null, isAuthenticated: false, user: {email: "", password: "", firstName: "", lastName: ""} })),
    }),
    {
      name: 'auth-store', 
    }
  )
);