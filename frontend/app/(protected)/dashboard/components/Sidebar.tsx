'use client'

import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow h-screen p-4">
      <h2 className="font-bold text-xl mb-4">POS Admin</h2>
      
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/products">Products</Link>
        <Link href="/dashboard/customers">Customers</Link>
        <Link href="/dashboard/sales">Sales</Link>
        <Link href="/pos">POS Kasir</Link>
      </nav>
    </aside>
  )
}
