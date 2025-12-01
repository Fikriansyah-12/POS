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
import { MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Supplier {
  id: number;
  name: string;
  email: string;
  no_hp: string;
  category: string;
}

const supplier = [
  {
    id: 1,
    name: "Fikriansyah",
    category: "Food",
    email: "fk@mail.com",
    no_hp: "08778387366474",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Fikriansyah",
    category: "Water",
    email: "fk@mail.com",
    no_hp: "08778387366474",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Fikriansyah",
    email: "fk@mail.com",
    category: "Snack",
    no_hp: "08778387366474",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Fikriansyah",
    email: "fk@mail.com",
    category: "Alcohol",
    no_hp: "08778387366474",
    status: "Non-Aktif",
  },
];

const Supplier = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const start = (page - 1 )*limit
  const filteredSuppier = supplier.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Supplier Produk
          </h1>
          <p className="text-muted-foreground">
            Jenis Supplier Produk ( total: 10 )
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
                placeholder="Cari Nama Supplier"
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
                    Name Supplier
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Categori
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    No Telp
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
                {filteredSuppier.map((supplier, index) => (
                  <tr
                    key={supplier.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{supplier.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm ">{supplier.category}</td>
                    <td className="py-3 px-4 text-sm font-semibold">
                      {supplier.email}
                    </td>
                    <td className="py-3 px-4 text-sm">{supplier.no_hp}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          supplier.status === "Aktif"
                            ? "default"
                            : supplier.status === "Non-Aktif"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          supplier.status === "Aktif"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : supplier.status === "Non-Aktif"
                            ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            : ""
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 grid grid-cols-2">
                      <Button className="bg-blue-500 hover:bg-blue-600" variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-white" />
                      </Button>
                      <Button className=" bg-red-500 hover:bg-red-600" variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
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

export default Supplier;
