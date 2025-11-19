export interface ProductListResponse {
  success: boolean;
  message: string;
  data: Product[];
  total: number;
  page: number;
  lastPage: number;
}

export interface Product {
  id: number;
  name: string;
  harga_beli: number;
  harga_jual: number;
  sku: string;
  stock: number;
  satuan: string;
  is_active: boolean;
  image: string | null;
  expiredAt: Date | null;
  categoryId: number;
  supplierId: number | null;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  supplier: Supplier | null;
}

export interface Category {
  id: number;
  name: string;
  deskripsi: string;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  no_hp: string;
}
