"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Pagination } from "@/app/components/ui/pagination";
import { MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Espresso",
    category: "Minuman",
    price: "Rp 25.000",
    stock: 150,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Minuman",
    price: "Rp 32.000",
    stock: 120,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Croissant",
    category: "Makanan",
    price: "Rp 28.000",
    stock: 45,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Sandwich",
    category: "Makanan",
    price: "Rp 45.000",
    stock: 80,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Green Tea Latte",
    category: "Minuman",
    price: "Rp 35.000",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Muffin Coklat",
    category: "Makanan",
    price: "Rp 22.000",
    stock: 95,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Americano",
    category: "Minuman",
    price: "Rp 28.000",
    stock: 180,
    status: "In Stock",
  },
  {
    id: 8,
    name: "Cheesecake",
    category: "Makanan",
    price: "Rp 42.000",
    stock: 0,
    status: "Out of Stock",
  },
];

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");
// const start = (page - 1 )*limit
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Daftar & Stok Produk
          </h1>
          <p className="text-muted-foreground">
            Daftar & stock barang yang tersedia, berikut ringkasan barang dan
            stock hari ini.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari produk atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    No
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Produk
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Kategori
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Harga
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Stok
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                       
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">
                      {product.price}
                    </td>
                    <td className="py-3 px-4 text-sm">{product.stock}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : product.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          product.status === "In Stock"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : product.status === "Low Stock"
                            ? "bg-warning/10 text-warning hover:bg-warning/20"
                            : ""
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Product;
