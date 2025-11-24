export interface PaymentResponse {
  data: {
    id: number;
    nameMetode: string;
    Keterangan: string; // <- camelCase
  }[];
  total: number;
  page: number;
  lastPage: number;
  success: boolean;
  message: string;
}
