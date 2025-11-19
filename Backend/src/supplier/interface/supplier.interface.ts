export interface SupplierResponse{
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        no_hp: string;
    }[];
    total: number;
    page: number;
    lastPage: number;
}