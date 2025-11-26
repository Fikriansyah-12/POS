"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Sidebar() {
  const [openMaster, setOpenMaster] = useState(false);
  const [openSales, setOpenSales] = useState(false);

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <p className="border border-b-2 mb-5"></p>

      <nav className="space-y-2">
        <SidebarItem href="/dashboard" label="Overview" />

        <div>
          <button
            onClick={() => setOpenMaster(!openMaster)}
            className="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            <span className="font-medium">Master Data</span>

            {openMaster ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openMaster && (
            <div className="ml-4 mt-1 space-y-1">
              <SidebarItem href="/dashboard/products" label="Products" />
              <SidebarItem href="/dashboard/categories" label="Categories" />
              <SidebarItem href="/dashboard/customers" label="Customers" />
              <SidebarItem href="/dashboard/users" label="Users" />
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setOpenSales(!openSales)}
            className="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            <span className="font-medium">Sales</span>

            {openSales ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSales && (
            <div className="ml-4 mt-1 space-y-1">
              <SidebarItem href="/dashboard/sales" label="Sales History" />
              <SidebarItem href="/dashboard/payments" label="Payment Status" />
            </div>
          )}
        </div>

        <SidebarItem href="/pos" label="POS Kasir" className="font-semibold" />
      </nav>
    </aside>
  );
}

function SidebarItem({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md hover:bg-gray-100 text-sm ${className}`}
    >
      {label}
    </Link>
  );
}
