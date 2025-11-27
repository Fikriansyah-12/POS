"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const paymentMethods = [
  {
    id: 1,
    name_metode: "Cash",
    keterangan: "Pembayaran Tunai",
  },
  {
    id: 2,
    name_metode: "Transfer",
    keterangan: "Pembayaran Non Tunai",
  },
  {
    id: 3,
    name_metode: "Qris",
    keterangan: "Pembayaran Menggunakan Qris",
  },
];

const PaymentMethod = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterPayment = paymentMethods.filter((paymentMethods) =>
    paymentMethods.name_metode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Metode Pembayaran
          </h1>
          <p className="text-muted-foreground">
            Jenis metode pembayaran yang akan digunakan oleh pembeli
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Metode Payment
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari metode pembayaran..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
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
                    Metode Pembayaran
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterPayment.map((pay, index) => (
                  <tr
                    key={pay.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {pay.name_metode}
                    </td>{" "}
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {pay.keterangan}
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

export default PaymentMethod;
