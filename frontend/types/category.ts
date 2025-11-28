import type { PaginatedResponse } from '@/types/api';

export type Category = {
  id: number;
  name: string;
  deskripsi: string;
};

export type CategoryPayload = {
  name: string;
  deskripsi: string;
};

export type CategoryListResponse = PaginatedResponse<Category>;
