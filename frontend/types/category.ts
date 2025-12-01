import type { PaginatedResponse } from '@/types/api';

export type Category = {
  id: number;
  name: string;
  desc: string;
};

export type CategoryPayload = {
  name: string;
  desc: string;
};

export type CategoryListResponse = PaginatedResponse<Category>;
