"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
const Categories = [
  {
    id: 1,
    name: "Makanan",
    desc: "Produk bahan makanan dan makanan jadi",
  },
  {
    id: 2,
    name: "Minuman",
    desc: "Berbagai macam minuman kemasan dan non-kemasan",
  },
  {
    id: 3,
    name: "Peralatan Rumah",
    desc: "Barang rumah tangga kebutuhan sehari-hari",
  },
  {
    id: 4,
    name: "Kesehatan",
    desc: "Produk obat, vitamin, dan kebutuhan kesehatan",
  },
  {
    id: 5,
    name: "Kecantikan",
    desc: "Produk perawatan kulit dan kosmetik",
  },
  {
    id: 6,
    name: "Elektronik",
    desc: "Peralatan elektronik kecil dan aksesoris",
  },
  {
    id: 7,
    name: "Pakaian",
    desc: "Produk fashion, pakaian harian, dan aksesoris",
  },
  {
    id: 8,
    name: "Kantor",
    desc: "Alat tulis kantor serta peralatan penunjang kerja",
  },
];
const Category = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterCategori = Categories.filter((Categories) =>
    Categories.name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Categori Produk
          </h1>
          <p className="text-muted-foreground">Jenis Categori Produk</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Categori
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Cari category...." />
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
                    Nama Categori
                  </th>{" "}
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Deskrisi Categori
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterCategori.map((category, index) => (
                  <tr
                    key={category.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {category.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {category.desc}
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

export default Category;
