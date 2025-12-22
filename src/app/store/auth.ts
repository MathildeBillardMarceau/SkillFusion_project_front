import { create } from "zustand";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  login: (user, accessToken) =>
    set({
      accessToken,
      user,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
    }),

  updateUser: (updatedUser) =>
    set((state) =>
      state.user
        ? { user: { ...state.user, ...updatedUser } }
        : {}
    ),
}));
