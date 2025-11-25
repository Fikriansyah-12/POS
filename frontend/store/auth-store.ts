"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  username: string;
  role: string;
};

type AuthResponse = {
  access_token: string;
  user: User;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      async login(payload) {
        try {
          set({ isLoading: true, error: null });

          const res = await api.post<AuthResponse>("/auth/login", payload);

          set({
            user: res.user,
            token: res.access_token,
            isLoading: false,
          });
        } catch (err: any) {
          set({
            error: err?.message ?? "Login gagal",
            isLoading: false,
          });
          throw err;
        }
      },

      logout() {
        set({
          user: null,
          token: null,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
