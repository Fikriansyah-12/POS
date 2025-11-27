'use client'

import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from "lucide-react";
import { MetricCard } from "@/app/(protected)/dashboard/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

const salesData = [
  { name: "Sen", sales: 4000, orders: 240 },
  { name: "Sel", sales: 3000, orders: 198 },
  { name: "Rab", sales: 5000, orders: 320 },
  { name: "Kam", sales: 2780, orders: 208 },
  { name: "Jum", sales: 6890, orders: 428 },
  { name: "Sab", sales: 7390, orders: 520 },
  { name: "Min", sales: 6490, orders: 478 },
];

const recentOrders = [
  { id: "#001234", customer: "Ahmad Yusuf", total: "Rp 450.000", status: "Completed", time: "10:30" },
  { id: "#001235", customer: "Siti Nurhaliza", total: "Rp 275.000", status: "Pending", time: "10:45" },
  { id: "#001236", customer: "Budi Santoso", total: "Rp 890.000", status: "Completed", time: "11:15" },
  { id: "#001237", customer: "Dewi Lestari", total: "Rp 125.000", status: "Processing", time: "11:30" },
  { id: "#001238", customer: "Eko Prasetyo", total: "Rp 650.000", status: "Completed", time: "12:00" },
];

const Dashboard = () => {
  return (
    <div className="min-h-svh space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Ini ringkasan bisnis Anda hari ini.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Pendapatan"
          value="Rp 45.2M"
          icon={DollarSign}
          trend="+12.5% dari bulan lalu"
          trendUp={true}
        />
        <MetricCard
          title="Total Pesanan"
          value="2,543"
          icon={ShoppingCart}
          trend="+8.2% dari bulan lalu"
          trendUp={true}
        />
        <MetricCard
          title="Total Pelanggan"
          value="1,247"
          icon={Users}
          trend="+5.4% dari bulan lalu"
          trendUp={true}
        />
        <MetricCard
          title="Produk Terjual"
          value="8,432"
          icon={Package}
          trend="+18.6% dari bulan lalu"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Mingguan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tren Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Pesanan"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID Pesanan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Pelanggan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.customer}</td>
                    <td className="py-3 px-4 text-sm font-semibold">{order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Completed" 
                          ? "bg-success/10 text-success" 
                          : order.status === "Pending"
                          ? "bg-warning/10 text-warning"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{order.time}</td>
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

export default Dashboard;
