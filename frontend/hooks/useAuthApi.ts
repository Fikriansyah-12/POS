'use client';

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function useAuthApi() {
  const token = useAuthStore((s) => s.token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T>(
      method: HttpMethod,
      path: string,
      body?: any,
      isFormData: boolean = false,
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        if (method === 'GET') {
          return await api.get<T>(path, token);
        }

        if (method === 'DELETE') {
          return await api.del<T>(path, token);
        }

        if (isFormData) {
          return await api.postForm<T>(path, body as FormData, token);
        }

        if (method === 'POST') {
          return await api.post<T>(path, body, token);
        }

        if (method === 'PUT') {
          return await api.put<T>(path, body, token);
        }

        // fallback kalau butuh PATCH tinggal tambahin di api.ts
        throw new Error('Method not implemented');
      } catch (err: any) {
        setError(err?.message ?? 'Request error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const get = useCallback(
    async <T>(path: string) => request<T>('GET', path),
    [request],
  );

  const post = useCallback(
    async <T>(path: string, body?: any) => request<T>('POST', path, body),
    [request],
  );

  const put = useCallback(
    async <T>(path: string, body?: any) => request<T>('PUT', path, body),
    [request],
  );

  const del = useCallback(
    async <T>(path: string) => request<T>('DELETE', path),
    [request],
  );

  const postForm = useCallback(
    async <T>(path: string, formData: FormData) =>
      request<T>('POST', path, formData, true),
    [request],
  );

  const resetError = () => setError(null);

  return {
    get,
    post,
    put,
    del,
    postForm,
    loading,
    error,
    resetError,
  };
}
