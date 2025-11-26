'use client'

import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
