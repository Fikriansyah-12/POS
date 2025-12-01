"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Plus, Search, Trash2, Pencil } from "lucide-react";
import { useCategoryStore } from "@/store/category-store";

const Category = () => {
  const {
  items,
  page,
  lastPage,
  total,
  isLoading,
  error,
  fetch,
  create,
  update,
  remove,
} = useCategoryStore();


  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // pertama kali load
  useEffect(() => {
    fetch({ page: 1, limit: 10 }).catch(() => {});
  }, [fetch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetch({ page: 1, limit: 10, search: value }).catch(() => {});
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name.trim()) return;

  const payload = { name, desc };

  if (editingId) {
    await update(editingId, payload);
  } else {
    await create(payload);
  }

  await fetch({ page, limit: 10, search: searchQuery }).catch(() => {});

  setName("");
  setDesc("");
  setEditingId(null);
};


  const handleEdit = (id: number) => {
    const cat = items.find((c) => c.id === id);
    if (!cat) return;
    setEditingId(id);
    setName(cat.name);
    setDesc(cat.desc ?? "");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus kategori ini?")) return;
    await remove(id);
  await fetch({ page, limit: 10, search: searchQuery }).catch(() => {});
  };

  const handleGoToPage = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    fetch({ page: newPage, limit: 10, search: searchQuery }).catch(() => {});
  };

  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Categori Produk
          </h1>
          <p className="text-muted-foreground">
            Jenis kategori produk (total: {total})
          </p>
        </div>
      </div>

      {/* FORM TAMBAH / EDIT */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-lg">
            {editingId ? "Edit Kategori" : "Tambah Kategori"}
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Nama kategori"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:w-1/3"
            />
            <Input
              placeholder="Deskripsi kategori"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="md:w-1/2"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                <Plus className="h-4 w-4 mr-1" />
                {editingId ? "Simpan" : "Tambah"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setDesc("");
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Cari category...."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-2">
              {error}
            </p>
          )}
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
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Deskripsi Categori
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 px-4 text-center text-sm text-muted-foreground"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {!isLoading && items.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 px-4 text-center text-sm text-muted-foreground"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  items.map((category, index) => (
                    <tr
                      key={category.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {(page - 1) * 10 + index + 1}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {category.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {
                          category.desc
                        }
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(category.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* pagination simple */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>
              Page {page} / {lastPage}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGoToPage(page - 1)}
                disabled={page <= 1 || isLoading}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGoToPage(page + 1)}
                disabled={page >= lastPage || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
