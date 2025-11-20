export interface PaymentListResponse {
  success: boolean;
  message: string;
  data: { id: number; nameMetode: string; keterangan: string }[];
  total: number;
  page: number;
  lastPage: number;
}