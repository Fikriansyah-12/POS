"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Search, Calendar, Download } from "lucide-react";
import { useState } from "react";
const orders = [
  {
    id: "#001234",
    customer: "Ahmad Yusuf",
    date: "2024-01-15",
    total: "Rp 450.000",
    items: 5,
    status: "Completed",
    payment: "Tunai",
  },
  {
    id: "#001235",
    customer: "Siti Nurhaliza",
    date: "2024-01-15",
    total: "Rp 275.000",
    items: 3,
    status: "Pending",
    payment: "Kartu Debit",
  },
  {
    id: "#001236",
    customer: "Budi Santoso",
    date: "2024-01-15",
    total: "Rp 890.000",
    items: 8,
    status: "Completed",
    payment: "Transfer",
  },
  {
    id: "#001237",
    customer: "Dewi Lestari",
    date: "2024-01-14",
    total: "Rp 125.000",
    items: 2,
    status: "Processing",
    payment: "E-Wallet",
  },
  {
    id: "#001238",
    customer: "Eko Prasetyo",
    date: "2024-01-14",
    total: "Rp 650.000",
    items: 6,
    status: "Completed",
    payment: "Tunai",
  },
  {
    id: "#001239",
    customer: "Fitri Handayani",
    date: "2024-01-14",
    total: "Rp 340.000",
    items: 4,
    status: "Cancelled",
    payment: "Kartu Kredit",
  },
  {
    id: "#001240",
    customer: "Gunawan Wijaya",
    date: "2024-01-13",
    total: "Rp 520.000",
    items: 7,
    status: "Completed",
    payment: "Transfer",
  },
];
const Sale = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Pesanan</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau semua transaksi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-gray-200 hover:bg-gray-700">
            <Calendar className="h-4 w-4" />
            Filter Tanggal
          </Button>
          <Button variant="outline" className="gap-2 bg-blue-300 hover:bg-blue-500">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID pesanan atau nama pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    ID Pesanan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Pelanggan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Tanggal
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Item
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Pembayaran
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((orders, index) => (
                  <tr
                    key={orders.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-semibold text-black">
                      {orders.id}
                    </td>
                    <td className="py-3 px-4 text-sm font font-medium">
                      {orders.customer}
                    </td>
                    <td className="py-3 px-4 text-sm font font-medium">
                      {/* // nanti di buat pake foormat date   */}
                      {orders.date}
                    </td>
                    <td className="py-3 px-4 text-sm font font-semibold">
                      {/* // nanti di buat pake foormat currency  */}
                      {orders.total}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {orders.items} item
                    </td>
                     <td className="py-3 px-4 text-sm font-semibold">
                      {orders.payment}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={
                          orders.status === "Completed" 
                            ? "default" 
                            : orders.status === "Cancelled"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          orders.status === "Completed"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : orders.status === "Processing"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : orders.status === "Pending"
                            ? "bg-warning/10 text-warning hover:bg-warning/20"
                            : ""
                        }
                      >
                        {orders.status}
                      </Badge>
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

export default Sale;
