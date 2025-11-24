export interface CustomerResponse{
    data:{
      id: number;
      name:string;
      email: string;
      noHp:string;
    }[];
    total: number;
    page: number;
    lastPage: number;
    success: boolean;
    message: string;
}