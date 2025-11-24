export interface PaymentResponse {
  data: {
    id: number;
    nameMetode: string;
    Keterangan: string; 
  }[];
  total: number;
  page: number;
  lastPage: number;
  success: boolean;
  message: string;
}
