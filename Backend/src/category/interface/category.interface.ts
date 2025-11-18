export interface CategoryListResponse {
  success: boolean;
  message: string;
  data: { id: number; name: string; deskripsi: string }[];
  total: number;
  page: number;
  lastPage: number;
}