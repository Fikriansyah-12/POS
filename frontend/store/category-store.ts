'use client';

import { create } from 'zustand';
import { api } from '@/lib/api';
import { useAuthStore } from './auth-store';
import type { Category, CategoryPayload } from '@/types/category';
import type { PaginatedResponse, ApiResponse } from '@/types/api';

type CategoryState = {
  items: Category[];
  page: number;
  lastPage: number;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetch: (params?: { page?: number; limit?: number; search?: string }) => Promise<void>;
  create: (payload: CategoryPayload) => Promise<void>;
  update: (id: number, payload: CategoryPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

export const useCategoryStore = create<CategoryState>()((set, get) => ({
  items: [],
  page: 1,
  lastPage: 1,
  total: 0,
  isLoading: false,
  error: null,

  async fetch(params) {
    try {
      set({ isLoading: true, error: null });

      const token = useAuthStore.getState().token;

      const searchParams = new URLSearchParams();
      const currentPage = params?.page ?? get().page;

      searchParams.set('page', String(currentPage));
      if (params?.limit) searchParams.set('limit', String(params.limit));
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/category${query ? `?${query}` : ''}`;

      const res = await api.get<PaginatedResponse<Category>>(path, token);
      set({
        items: res.data,
        page: res.page,
        lastPage: res.lastPage,
        total: res.total,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err?.message ?? 'Gagal mengambil kategori',
        isLoading: false,
      });
      throw err;
    }
    console.log('test');
    
  },

  async create(payload) {
    try {
      set({ isLoading: true, error: null });

      const token = useAuthStore.getState().token;

      await api.post<ApiResponse<Category>>('/category', payload, token);

      // await get().fetch();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Gagal membuat kategori',
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  async update(id, payload) {
    try {
      set({ isLoading: true, error: null });

      const token = useAuthStore.getState().token;

      await api.put<ApiResponse<Category>>(`/category/${id}`, payload, token);

      await get().fetch();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Gagal mengubah kategori',
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  async remove(id) {
    try {
      set({ isLoading: true, error: null });

      const token = useAuthStore.getState().token;

      await api.del<ApiResponse<null>>(`/category/${id}`, token);

      // await get().fetch();
    } catch (err: any) {
      set({
        error: err?.message ?? 'Gagal menghapus kategori',
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
