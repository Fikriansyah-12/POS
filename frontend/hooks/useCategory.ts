"use client"

import { useCallback, useEffect, useState } from "react";
import { useAuthApi } from "./useAuthApi";
import { Category } from "@/types/category";
import { PaginatedResponse } from "@/types/api";

type UseCateoryOption= {
  page?: number;
  limit?: number;
  search?: string;
}

export function useCategory(initialOptions: UseCateoryOption ={}){
  const {get, loading, error} = useAuthApi()

  const [category, setCategory] = useState<Category[]>([])
  const [page, setPage] = useState(initialOptions.page ?? 1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchCategory = useCallback(
    async (overrideOptions?: UseCateoryOption) => {
      const opt = {
        page,
        limit: initialOptions.limit,
        search: initialOptions.search,
        ...overrideOptions,
      };
      const params = new URLSearchParams();
      if (opt.page) params.set('page', String(opt.page));
      if (opt.limit) params.set('limit', String(opt.limit));
      if (opt.search) params.set('search', opt.search);

      const q = params.toString();
      const path = `/category${q ? `?${q}` : ''}`;

      const res = await get<PaginatedResponse<Category>>(path);

      setCategory(res.data);
      setTotal(res.total);
      setPage(res.page);
      setLastPage(res.lastPage);

      return res;
    },
    [get, page, initialOptions.limit, initialOptions.search],
  )
  useEffect(() => {
    fetchCategory().catch(() => {});
  }, [fetchCategory]);

  return {
    category,
    page,
    lastPage,
    total,
    loading,
    error,
    refetch: () => fetchCategory(),
    goToPage: (newPage: number) => fetchCategory({ page: newPage }),
  };
}