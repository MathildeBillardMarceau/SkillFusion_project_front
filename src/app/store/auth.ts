import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      user: {
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },

      login: (user, accessToken) =>
        set({
          token: accessToken,
          isAuthenticated: true,
          user,
        }),

      logout: () =>
        set({
          token: null,
          isAuthenticated: false,
          user: {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          },
        }),

      updateUser: (updatedUser: Partial<User>) =>
        set((state) => ({
          user: { ...state.user, ...updatedUser},
        })),
    }),
    {
      name: "auth-store",
    }
  )
);
